import { EventSourcePolyfill } from 'event-source-polyfill';
import AppRouter from './AppRouter';
import { useNotificationStore } from './store/notificationStore';
import { useEffect, useRef } from 'react';
import { useUserStore } from './store/userStore';

function App() {
  const { role, accessToken } = useUserStore();
  const setIndicator = useNotificationStore((state) => state.setIndicator);
  const addNotification = useNotificationStore((state) => state.addNotification);

  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);
  const reconnectTimerRef = useRef<NodeJS.Timeout | null>(null);

  const connectSSE = (token: string, role: string) => {
    if (!token || role !== 'ROLE_ADMIN') return;

    eventSourceRef.current?.close();

    const eventSource = new EventSourcePolyfill('http://localhost:8080/sse/subscribe', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    eventSource.onopen = () => {
      console.log('SSE 연결됨');
    };

    eventSource.addEventListener('connect', (event: any) => {
      console.log('서버 연결 이벤트 수신:', event.data);
    });

    eventSource.addEventListener('heartbeat', () => {
      console.log('heartbeat 수신');
    });

    eventSource.onmessage = (event: any) => {
      console.log('알림 수신:', event.data);

      const newNotification = {
        id: Date.now(),
        message: event.data,
        createdAt: new Date().toISOString(),
        isRead: false,
      };

      addNotification(newNotification);
      setIndicator(true);
    };

    eventSource.onerror = (error: any) => {
      console.warn('SSE 오류 발생:', error);
      eventSource.close();

      if (!reconnectTimerRef.current) {
        reconnectTimerRef.current = setTimeout(() => {
          reconnectTimerRef.current = null;
          console.log('SSE 재연결 시도...');
          connectSSE(token, role);
        }, 3000);
      }
    };

    eventSourceRef.current = eventSource;
  };

  useEffect(() => {
    if (!accessToken || !role) return;

    connectSSE(accessToken, role);

    return () => {
      eventSourceRef.current?.close();
      if (reconnectTimerRef.current) clearTimeout(reconnectTimerRef.current);
    };
  }, [accessToken, role]);

  return <AppRouter />;
}

export default App;
