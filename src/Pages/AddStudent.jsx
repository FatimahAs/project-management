import { useEffect, useState } from "react";
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
import Swal from "sweetalert2";

export default function AddStudent() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => setTeachers(data.filter((u) => u.role === "teacher")));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Enter Student Name",
        confirmButtonText: "Ok",
      });
    }

    if (!email.includes("@tuwaiq")) {
      return Swal.fire({
        icon: "warning",
        title: "Email must include @tuwaiq",
        confirmButtonText: "Ok",
      });
    }

    try {
      const response = await fetch(
        "https://683ffc315b39a8039a565e4a.mockapi.io/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            teacherId,
            password,
            role: "student",
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Student added successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/admin");
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

        <main className="p-6 overflow-auto">
          <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Add Students </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder=" Student Name"
                className="w-full border px-4 py-2 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Student Email"
                className="w-full border px-4 py-2 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="password"
                className="w-full border px-4 py-2 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <select
                className="w-full border px-4 py-2 rounded-xl"
                value={teacherId}
                onChange={(e) => setTeacherId(e.target.value)}
              >
                <option value=""> Choose Teacher</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full bg-[#076452] text-white px-4 py-2 rounded-xl"
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
