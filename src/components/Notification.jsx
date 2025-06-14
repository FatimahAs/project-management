import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import axios from "axios";

const MESSAGES_API = "https://68382fb12c55e01d184c5076.mockapi.io/messages";
const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";

export default function Notification({
  userId,
  messages,
  projects,
  refreshData,
}) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const unreadMessages = messages?.filter(
      (msg) => msg.senderId !== userId && !msg.readBy?.includes(userId)
    );

    const statusUpdates = projects?.filter(
      (p) => p.status !== "pending" && !p.readBy?.includes(userId)
    );

    const allNotifications = [];

    unreadMessages?.forEach((msg) =>
      allNotifications.push({
        id: msg.id,
        type: "message",
        text: `New Message : "${msg.text}..."`,
        time: msg.timestamp,
      })
    );

    statusUpdates?.forEach((p) =>
      allNotifications.push({
        id: p.id,
        type: "status",
        text: `تم تغيير حالة المشروع "${p.title}" إلى ${p.status}`,
        time: p.updatedAt || p.timestamp,
      })
    );

    setNotifications(allNotifications);
    setUnreadCount(allNotifications.length);
  }, [messages, projects, userId]);

  const markAllAsRead = async () => {
    try {
      const unreadMessages = messages.filter(
        (msg) => msg.senderId !== userId && !msg.readBy?.includes(userId)
      );

      const updateMsgRequests = unreadMessages.map((msg) => {
        const newReadBy = msg.readBy ? [...msg.readBy, userId] : [userId];
        return axios.put(`${MESSAGES_API}/${msg.id}`, {
          ...msg,
          readBy: newReadBy,
        });
      });

      const unreadProjects = projects.filter(
        (p) => p.status !== "pending" && !p.readBy?.includes(userId)
      );

      const updateProjRequests = unreadProjects.map((p) => {
        const newReadBy = p.readBy ? [...p.readBy, userId] : [userId];
        return axios.put(`${PROJECTS_API}/${p.id}`, {
          ...p,
          readBy: newReadBy,
        });
      });

      await Promise.all([...updateMsgRequests, ...updateProjRequests]);

      refreshData();

      setUnreadCount(0);
    } catch (error) {
      console.error("حدث خطأ أثناء تحديث حالة الإشعارات:", error);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (!showDropdown) {
      markAllAsRead();
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="relative">
        <Bell color="#076452" className="w-6 h-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow z-50 max-h-64 overflow-y-auto">
          {notifications.length === 0 ? (
            <p className="p-4 text-sm text-gray-500">لا توجد إشعارات حالياً.</p>
          ) : (
            notifications.map((notif, i) => (
              <div
                key={i}
                className="border-b px-4 py-2 text-sm hover:bg-gray-100"
              >
                <span className="block font-medium">
                  {notif.type === "message" ? "📩 رسالة" : "📌 تحديث"}
                </span>
                <span>{notif.text}</span>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(notif.time).toLocaleString()}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
