import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import axios from "axios";
import StudentNav from "../../components/Student/StudentNav";
import StudentSideBar from "../../components/Student/StudentSideBar";

const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";
const MESSAGES_API = "https://68382fb12c55e01d184c5076.mockapi.io/messages";
const NOTIFI_API = "https://684c7925ed2578be881ee859.mockapi.io/notifications";

export default function CreateIdea() {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [projects, setProjects] = useState([]);
  const [description, setDescription] = useState("");
  const [messages, setMessages] = useState([]);
  const [setTeachers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => setTeachers(data.filter((u) => u.role === "teacher")));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const teacherId = user.teacherId;
    try {
      const response = await fetch(PROJECTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          teacherId: teacherId,
          userId: user.id,
          teamId: user.teamId,
          status: "pending",
          createdAt: new Date().toISOString(),
        }),
      });

      const newProject = await response.json();

      if (response.ok) {
        await axios.post(NOTIFI_API, {
          senderId: user.id,
          receiverRole: "teacher",
          receiverId: teacherId,
          text: `📩 New idea "${title}" submitted by ${user.name}.`,
          timestamp: new Date().toISOString(),
          projectId: newProject.id,
          type: "notification",
        });

        await axios.post(NOTIFI_API, {
          senderId: user.id,
          receiverRole: "admin",
          text: `📩 A new idea titled "${title}" has been submitted by ${user.name}.`,
          timestamp: new Date().toISOString(),
          projectId: newProject.id,
          type: "notification",
        });

        Swal.fire({
          icon: "success",
          title: "Idea sent successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/student");
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred while adding",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to connect to the server",
        text: error.message,
        confirmButtonText: "Ok",
      });
    }
  };

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

        <main className="p-6 overflow-auto">
          <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Idea </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full border px-4 py-2 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="descripe your idea"
                className="w-full border px-4 py-2 rounded-xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-[#076452] text-white px-4 py-2 rounded-xl cursor-pointer"
              >
                Add
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
