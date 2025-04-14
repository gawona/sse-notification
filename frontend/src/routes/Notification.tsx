import { useEffect, useState } from "react";
import { listOfNotification, readNotification } from "../api/notification";
import { useNotificationStore } from "../store/notificationStore";

interface Notification {
  id: number;
  message: string;
  createdAt: string;
  isRead: boolean;
}

const Notification = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const setNotifications = useNotificationStore((state) => state.setNotifications);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const setIndicator = useNotificationStore((state) => state.setIndicator);
  const [activeTab, setActiveTab] = useState<"all" | "unread">("all");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await listOfNotification();
        setNotifications(res.data);

        const hasUnread = res.data.some((noti: Notification) => !noti.isRead);
        setIndicator(hasUnread);
      } catch (error) {
        console.error("알림 목록을 불러오는 데 실패했습니다.", error);
      }
    };

    fetchNotifications();
  }, [setNotifications, setIndicator]);

  const handleRead = async (id: number) => {
    try {
      await readNotification(id);
      markAsRead(id);
      
      const hasUnread = notifications.some((n) => n.id !== id && !n.isRead);
      setIndicator(hasUnread);
    } catch (err) {
      console.error("알림 읽음 처리 실패", err);
    }
  };

  const filteredNotifications =
    activeTab === "all"
      ? notifications
      : notifications.filter((noti) => !noti.isRead);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="flex justify-between items-center mt-6 mb-4">
        <h2 className="text-xl font-bold">🔔 알림 목록</h2>
        <p className="text-xs text-gray-500">총 {filteredNotifications.length}건</p>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          className={`px-3 py-1 text-sm rounded-full border ${
            activeTab === "all"
              ? "bg-black text-white border-black"
              : "text-gray-600 border-gray-300"
          }`}
          onClick={() => setActiveTab("all")}
        >
          전체 보기
        </button>
        <button
          className={`px-3 py-1 text-sm rounded-full border ${
            activeTab === "unread"
              ? "bg-black text-white border-black"
              : "text-gray-600 border-gray-300"
          }`}
          onClick={() => setActiveTab("unread")}
        >
          읽지 않은 알림
        </button>
      </div>

      {filteredNotifications.length === 0 ? (
        <p className="text-sm text-gray-400">알림이 없습니다.</p>
      ) : (
        <ul className="space-y-3">
          {filteredNotifications.map((noti) => (
            <li
              key={noti.id}
              onClick={() => handleRead(noti.id)}
              className={`border rounded-xl p-4 shadow-sm transition-shadow duration-200 cursor-pointer flex justify-between items-start ${
                noti.isRead
                  ? "bg-gray-100 text-gray-500 border-gray-200"
                  : "bg-white hover:shadow-md border-gray-300"
              }`}
            >
              <div>
                <p className="text-sm">{noti.message}</p>
                <p className="text-xs mt-1">{new Date(noti.createdAt).toLocaleString()}</p>
              </div>
              {noti.isRead && (
                <span className="text-[10px] text-gray-400 ml-2 mt-1 whitespace-nowrap">
                  읽음
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
