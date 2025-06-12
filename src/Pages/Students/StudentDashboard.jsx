import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link, useNavigate } from "react-router";
import Notification from "./Notification";

const USERS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/users";
const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";
const TEAMS_API = "https://68382fb12c55e01d184c5076.mockapi.io/teams";
const MESSAGES_API = "https://68382fb12c55e01d184c5076.mockapi.io/messages";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const navigate = useNavigate();
  const notificationsRef = useRef();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      // جلب المشاريع
      axios.get(`${PROJECTS_API}?userId=${storedUser.id}`).then((res) => {
        setProjects(res.data);
      });

      // جلب المعلم
      axios.get(`${USERS_API}/${storedUser.teacherId}`).then((res) => {
        setTeacher(res.data);
      });

      // جلب أعضاء الفريق
      axios.get(`${TEAMS_API}/${storedUser.teamId}`).then(async (res) => {
        const teamData = res.data;
        if (teamData.memberIds) {
          const memberRequests = teamData.memberIds.map((id) =>
            axios.get(`${USERS_API}/${id}`)
          );
          const memberResponses = await Promise.all(memberRequests);
          const members = memberResponses.map((res) => res.data);
          setTeamMembers(members);
        }
      });

      // جلب الرسائل
      axios.get(`${MESSAGES_API}?teamId=${storedUser.teamId}`).then((res) => {
        setMessages(res.data);
      });

      // جلب كل المستخدمين (لإظهار أسماء المرسلين)
      axios.get(USERS_API).then((res) => {
        setAllUsers(res.data);
      });
    }
  }, []);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    const msg = {
      teamId: user.teamId,
      senderId: user.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    await axios.post(MESSAGES_API, msg);
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const total = projects.length;
  const pending = projects.filter((p) => p.status === "pending").length;
  const accepted = projects.filter((p) => p.status === "accepted").length;
  const rejected = projects.filter((p) => p.status === "rejected").length;

  const chartData = [
    { name: "الكل", value: total },
    { name: "معلقة", value: pending },
    { name: "مقبولة", value: accepted },
    { name: "مرفوضة", value: rejected },
  ];

  const fetchData = () => {
    if (!user) return;

    axios.get(`${PROJECTS_API}?userId=${user.id}`).then((res) => {
      setProjects(res.data);
    });

    axios.get(`${MESSAGES_API}?teamId=${user.teamId}`).then((res) => {
      setMessages(res.data);
    });
    // باقي البيانات مثل الفريق والمعلم لو حابب تحدثها أيضاً
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchData();
    }
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-white w-64 p-6 shadow-lg ${
          sidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">لوحة الطالب</h2>
        <nav className="space-y-4">
          <Link
            to="/student/dashboard"
            className="block text-gray-700 hover:text-blue-500"
          >
            الرئيسية
          </Link>
          <Link
            to="/student/projects"
            className="block text-gray-700 hover:text-blue-500"
          >
            أفكاري
          </Link>
          <Link
            to="/student/team"
            className="block text-gray-700 hover:text-blue-500"
          >
            فريقي
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              navigate("/signin");
            }}
            className="text-red-500"
          >
            تسجيل الخروج
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#f5f5f5] text-[#333] p-4 shadow-md flex justify-between items-center relative">
          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
          <h1 className="text-xl font-bold">مرحبًا {user?.name}</h1>

          {/* أيقونة الإشعارات */}
          <div className="relative" ref={notificationsRef}>
            {user && (
              <Notification
                userId={user.id}
                messages={messages}
                projects={projects}
                refreshData={fetchData}
              />
            )}
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">حالة الأفكار</h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  <Cell fill="#4ade80" />
                  <Cell fill="#f87171" />
                  <Cell fill="#facc15" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-semibold mb-2">المعلم المسؤول</h2>
              {teacher ? (
                <p>
                  {teacher.name} - {teacher.email}
                </p>
              ) : (
                <p>جاري التحميل...</p>
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">أعضاء الفريق</h2>
              <div className="grid md:grid-cols-3 gap-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded p-3">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Chat Section */}
        <div className="bg-white border-t shadow-inner p-4 sticky bottom-0 w-full">
          <h2 className="text-md font-bold mb-2">دردشة الفريق</h2>
          <div className="max-h-48 overflow-y-auto mb-3 space-y-2 pr-2">
            {messages.map((msg, i) => {
              const sender = allUsers.find((u) => u.id === msg.senderId);
              return (
                <div
                  key={i}
                  className={`p-2 rounded-xl max-w-xs break-words ${
                    msg.senderId === user.id
                      ? "bg-yellow-200 self-end ml-auto text-right"
                      : "bg-gray-100 mr-auto text-left"
                  }`}
                >
                  <p className="text-sm font-bold">
                    {sender?.name || "مستخدم مجهول"}
                  </p>
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <textarea
              className="flex-1 border rounded-xl px-4 py-2 resize-none h-10"
              placeholder="اكتب رسالة..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button
              onClick={handleSendMessage}
              className="bg-yellow-500 text-white rounded-xl px-4 py-2"
            >
              إرسال
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
