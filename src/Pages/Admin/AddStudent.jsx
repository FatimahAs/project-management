import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AdminNav from "../../components/Admin/AdminNav";
import AdminSideBar from "../../components/Admin/AdminSideBar";

export default function AddStudent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
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

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <AdminNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
