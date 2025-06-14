import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AdminNav from "../../components/Admin/AdminNav";

export default function EditStudent() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name || "");
        setEmail(data.email || "");
        setPassword(data.password || "");
        setTeacherId(data.teacherId || "");
        setTeamMembers(data.teamMembers || []);
      });
  }, [id]);

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data.filter((u) => u.role === "teacher"));

        setStudents(
          data.filter(
            (u) =>
              u.role === "student" &&
              u.id !== id &&
              (u.teacherId === teacherId || !u.teacherId)
          )
        );
      });
  }, [teacherId, id]);

  const handleTeamChange = (memberId) => {
    setTeamMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Add Student Name",
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
        `https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            teacherId,
            teamMembers,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Student updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/admin");
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during update",
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
          <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4"> Edit Student</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Student Name "
                className="w-full border px-4 py-2 rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Edit email"
                className="w-full border px-4 py-2 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                placeholder="Edit password"
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
                    {t.username || t.name}
                  </option>
                ))}
              </select>

              <div>
                <label className="block font-medium mb-2"> Team</label>
                {students.length === 0 ? (
                  <p className="text-red-500">
                    There are no students for this teacher.{" "}
                  </p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-xl p-2">
                    {students.map((student) => (
                      <label
                        key={student.id}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="checkbox"
                          checked={teamMembers.includes(student.id)}
                          onChange={() => handleTeamChange(student.id)}
                        />
                        <span>{student.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {teamMembers.length > 0 && (
                <div className="bg-gray-100 border rounded-xl p-3">
                  <p className="mb-2 font-semibold">Team Members:</p>
                  <div className="flex flex-wrap gap-2">
                    {students
                      .filter((s) => teamMembers.includes(s.id))
                      .map((student) => (
                        <span
                          key={student.id}
                          className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
                        >
                          {student.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-xl"
              >
                Save Edit{" "}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
