import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import StudentNav from "../../components/Student/StudentNav";
import StudentSideBar from "../../components/Student/StudentSideBar";

const USERS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/users";
const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";
const TEAMS_API = "https://68382fb12c55e01d184c5076.mockapi.io/teams";
const MESSAGES_API = "https://68382fb12c55e01d184c5076.mockapi.io/messages";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      axios.get(`${PROJECTS_API}?userId=${storedUser.id}`).then((res) => {
        setProjects(res.data);
      });

      axios.get(`${USERS_API}/${storedUser.teacherId}`).then((res) => {
        setTeacher(res.data);
      });

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

      axios.get(`${MESSAGES_API}?teamId=${storedUser.teamId}`).then((res) => {
        setMessages(res.data);
      });

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

  const pending = projects.filter((p) => p.status === "pending").length;
  const accepted = projects.filter((p) => p.status === "accepted").length;
  const rejected = projects.filter((p) => p.status === "rejected").length;

  const chartData = [
    { name: "Pending", value: pending },
    { name: "Accepted", value: accepted },
    { name: "Rejected", value: rejected },
  ];

  const fetchData = () => {
    if (!user) return;

    axios.get(`${PROJECTS_API}?userId=${user.id}`).then((res) => {
      setProjects(res.data);
    });

    axios.get(`${MESSAGES_API}?teamId=${user.teamId}`).then((res) => {
      setMessages(res.data);
    });
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchData();
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <StudentNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow p-6 col-span-1">
              <h2 className="text-xl font-semibold mb-4">Status Idea</h2>
              <div className="flex flex-col gap-4 justify-center items-center ">
                <PieChart width={400} height={300}>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    <Cell fill="#facc15" />
                    <Cell fill="#4ade80" />
                    <Cell fill="#f87171" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6 col-span-1">
              <h2 className="text-xl font-semibold mb-4">
                Supervising Teacher
              </h2>
              {teacher ? (
                <div className="text-gray-700">
                  <p className="font-medium">{teacher.name}</p>
                  <p className="text-sm text-gray-500">{teacher.email}</p>
                </div>
              ) : (
                <p className="text-gray-400">Loading...</p>
              )}
            </div>

            <div className="bg-white rounded-2xl shadow p-6 col-span-1 lg:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Team Members</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {teamMembers.map((member) => (
                  <div key={member.id} className="border rounded-xl p-4">
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-gray-500">{member.email}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Team Chat</h2>
              <div className="max-h-60 overflow-y-auto mb-4 space-y-3 pr-2">
                {messages.map((msg, i) => {
                  const sender = allUsers.find((u) => u.id === msg.senderId);
                  return (
                    <div
                      key={i}
                      className={`p-3 rounded-xl max-w-xs break-words ${
                        msg.senderId === user.id
                          ? "bg-yellow-200 self-end ml-auto text-right"
                          : "bg-gray-100 mr-auto text-left"
                      }`}
                    >
                      <p className="text-sm font-bold">
                        {sender?.name || "Unknown User"}
                      </p>
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <textarea
                  className="flex-1 border rounded-xl px-4 py-2 resize-none h-12"
                  placeholder="Write message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-yellow-500 text-white rounded-xl px-6 py-2 cursor-pointer"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
