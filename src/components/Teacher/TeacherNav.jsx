import { useEffect, useState, useRef } from "react";
import { Logs } from "lucide-react";
import Notification from "../Notification";
import axios from "axios";

const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";
const MESSAGES_API = "https://68382fb12c55e01d184c5076.mockapi.io/messages";

export default function TeacherNav({ sidebarOpen, setSidebarOpen }) {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const notificationsRef = useRef();

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
    <header className="bg-white text-[#333] p-4 shadow-sm flex justify-between items-center relative rounded-full">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-gray-700 focus:outline-none md:hidden"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {sidebarOpen ? <Logs color="#076452" /> : <Logs color="#076452" />}
        </svg>
      </button>
      <div className="inline-flex items-center gap-3">
        <img src="hello.png" className="w-10" />
        <h5 className="text-xl font-bold text-[#076452]">Hi {user?.name}</h5>
      </div>
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
  );
}
