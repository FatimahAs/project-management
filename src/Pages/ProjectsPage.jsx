import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";
import {
  House,
  Lightbulb,
  UserPlus,
  UserRoundPlus,
  LogOut,
  ShieldUser,
  Bell,
  Logs,
} from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/projects")
      .then((res) => res.json())
      .then(setProjects);

    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const updateProjectStatus = async (id, status) => {
    await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, status } : proj))
    );
  };

  const saveComment = async (id) => {
    const comment = comments[id];
    if (!comment) return;

    await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    alert("تم حفظ السبب");
  };

  const getStudentName = (studentId) => {
    const student = users.find((u) => u.id === studentId);
    return student?.username || "مستخدم غير معروف";
  };

  const handleAddUser = (role) => {
    navigate(`/add${role}`);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/signin");

        Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 rounded-tr-xl rounded-br-xl w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="inline-flex items-center gap-3 mb-8">
            <ShieldUser color="#076452" />
            <h2 className="text-2xl font-bold text-[#076452]"> Admin</h2>
          </div>
          <hr className="h-[2px] bg-gray-300 shadow-sm my-4 rounded-full " />
          <nav className="flex flex-col gap-4 text-gray-700 flex-grow">
            <Link
              to="/admin"
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              <button>
                <div className="inline-flex items-center gap-3">
                  <House color="#030303" size={"16px"} />
                  <h3>Home</h3>
                </div>
              </button>
            </Link>
            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />
            <Link
              to="/projects"
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              <div className="inline-flex items-center gap-3">
                <Lightbulb color="#030303" size={"16px"} />
                <h3>Idea</h3>
              </div>
            </Link>
            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />
            <div className="inline-flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-gray-200">
              <UserPlus color="#030303" size={"16px"} />
              <button onClick={() => handleAddUser("student")}>
                Add Students
              </button>
            </div>
            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />

            <div className="inline-flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-gray-200">
              <UserRoundPlus color="#030303" size={"16px"} />
              <button onClick={() => handleAddUser("teacher")}>
                Add Teachers
              </button>
            </div>
            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />
            <div className="inline-flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-red-200 text-red-600">
              <LogOut color="#e53e3e" size={"16px"} />
              <button onClick={handleLogout}>Sign out</button>
            </div>
          </nav>
          <div className="mt-auto text-xs text-gray-400">
            © 2025 Management Idea
          </div>
        </div>
      </div>

      {/* Overlay when sidebar open on small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white text-[#333] p-4 shadow-sm flex justify-between items-center relative rounded-full">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none md:hidden"
            aria-label="Toggle menu"
          >
            {/* أيقونة الهامبرغر */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {sidebarOpen ? (
                <Logs color="#076452" />
              ) : (
                <Logs color="#076452" />
              )}
            </svg>
          </button>
          <div className="inline-flex items-center gap-3">
            <h2 className="text-2xl font-bold text-[#076452]"> Admin</h2>
          </div>
          <div className="relative">
            <Bell color="#076452" />
          </div>{" "}
          {/* حافظة مكان */}
        </header>

        {/* محتوى الصفحة */}
        <main className="p-6 overflow-auto">
          <div className="max-w-5xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">عرض الأفكار</h1>
            {projects.map((p) => (
              <div
                key={p.id}
                className="border rounded-2xl p-4 mb-4 shadow-md bg-white"
              >
                <h2 className="text-xl font-semibold text-blue-600">
                  {p.title}
                </h2>
                <p className="text-gray-700 mb-2">{p.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                  الحالة:{" "}
                  <span
                    className={
                      p.status === "accepted"
                        ? "text-green-500"
                        : p.status === "rejected"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }
                  >
                    {p.status === "accepted"
                      ? "مقبولة"
                      : p.status === "rejected"
                      ? "مرفوضة"
                      : "معلّقة"}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  الطالب:{" "}
                  <span className="font-medium">
                    {getStudentName(p.studentId)}
                  </span>
                </p>

                <div className="flex flex-wrap gap-2 mb-2">
                  <button
                    onClick={() => updateProjectStatus(p.id, "accepted")}
                    className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm"
                  >
                    قبول
                  </button>
                  <button
                    onClick={() => updateProjectStatus(p.id, "rejected")}
                    className="bg-red-500 text-white px-3 py-1 rounded-xl text-sm"
                  >
                    رفض
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  <textarea
                    className="border rounded-xl p-2 text-sm w-full"
                    rows="2"
                    placeholder="أضف تعليق أو سبب القرار..."
                    value={comments[p.id] || ""}
                    onChange={(e) =>
                      setComments({ ...comments, [p.id]: e.target.value })
                    }
                  />
                  <button
                    onClick={() => saveComment(p.id)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-xl text-sm self-start"
                  >
                    حفظ السبب
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
