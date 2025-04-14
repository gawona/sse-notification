import { create } from 'zustand';

interface Notification {
  id: number;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface NotificationStore {
  indicator: boolean;
  notifications: Notification[];
  setIndicator: (value: boolean) => void;
  setNotifications: (list: Notification[]) => void;
  addNotification: (noti: Notification) => void;
  markAsRead: (id: number) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  indicator: false,
  notifications: [],
  setIndicator: (value) => set({ indicator: value }),
  setNotifications: (list) => set({ notifications: list }),
  addNotification: (noti) => {
    set((state) => ({
      notifications: [noti, ...state.notifications],
      indicator: true,
    }))
    console.log("새 알림 저장 : ", noti)
  },
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((noti) =>
        noti.id === id ? { ...noti, isRead: true } : noti
      ),
    })),
}));
