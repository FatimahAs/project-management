import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import AdminSideBar from "../../components/Admin/AdminSideBar";
import AdminNav from "../../components/Admin/AdminNav";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.filter((u) => u.role === "student"));
        setTeachers(data.filter((u) => u.role === "teacher"));
      });

    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/projects")
      .then((res) => res.json())
      .then(setProjects);
  }, []);

  const accepted = projects.filter((p) => p.status === "accepted");
  const rejected = projects.filter((p) => p.status === "rejected");
  const pending = projects.filter((p) => p.status === "pending");

  const handleEditUser = (user) => {
    if (user.role === "teacher") {
      navigate(`/editteacher/${user.id}`);
    } else {
      navigate(`/editstudent/${user.id}`);
    }
  };

  const handleDeleteUser = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
        method: "DELETE",
      });

      setStudents((prev) => prev.filter((u) => u.id !== id));
      setTeachers((prev) => prev.filter((u) => u.id !== id));

      Swal.fire(
        "Deleted!",
        "The user has been deleted successfully.",
        "success"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col">
        <AdminNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="p-6 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 text-green-800 p-4 rounded-2xl shadow text-center">
              <div className="flex flex-col justify-center items-center gap-3">
                <img src="/student.png" className="w-10" />
                <h3 className="text-xl font-bold">Students</h3>
                <p className="text-3xl">{students.length}</p>
              </div>
            </div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl shadow text-center">
              <div className="flex flex-col justify-center items-center gap-3">
                <img src="/teacher.png" className="w-10" />
                <h3 className="text-xl font-bold">Teachers</h3>
                <p className="text-3xl">{teachers.length}</p>
              </div>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-2xl shadow text-center">
              <div className="flex flex-col justify-center items-center gap-3">
                <img src="/light-bulb.png" className="w-10" />
                <h3 className="text-xl font-bold">Idea</h3>
                <p className="text-3xl">{projects.length}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {" "}
                Teachers And Students
              </h2>
              <div className="flex flex-col gap-4 justify-center items-center">
                <PieChart width={300} height={300}>
                  <Pie
                    data={[
                      {
                        name: `Students (${students.length})`,
                        value: students.length,
                      },
                      {
                        name: `Teachers (${teachers.length})`,
                        value: teachers.length,
                      },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    <Cell fill="#4ade80" />
                    <Cell fill="#60a5fa" />
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">General Statistics</h2>
              <div className="flex justify-center">
                <BarChart
                  width={500}
                  height={300}
                  data={[
                    { name: "Students", value: students.length },
                    { name: "Teachers", value: teachers.length },
                    { name: "Accepted Ideas", value: accepted.length },
                  ]}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#" radius={[8, 8, 0, 0]}>
                    <Cell fill="#CAE8BD" />
                    <Cell fill="#80CBC4" />
                    <Cell fill="#859F3D" />
                  </Bar>
                </BarChart>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4 "> Idea Status</h2>
              <div className="flex flex-col gap-4 justify-center items-center ">
                <PieChart width={400} height={300}>
                  <Pie
                    data={[
                      {
                        name: `Accepted (${accepted.length})`,
                        value: accepted.length,
                      },
                      {
                        name: `Rejected (${rejected.length})`,
                        value: rejected.length,
                      },
                      {
                        name: `Pending (${pending.length})`,
                        value: pending.length,
                      },
                    ]}
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
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">
              Teachers and Students
            </h2>

            <div className="flex flex-wrap gap-4 mb-4">
              <input
                type="text"
                placeholder="Searching ..."
                className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-80"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-indigo-500 text-white border-none  px-4 py-2 rounded-xl hover:bg-indigo-300 cursor-pointer "
              >
                {showAll ? "Show Teacher and Student  " : "  Show All Student"}
              </button>
            </div>

            {showAll ? (
              <>
                <table className="min-w-full table-auto border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">Student Name </th>
                      <th className="p-2 border">Teacher</th>
                      <th className="p-2 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students
                      .filter(
                        (s) =>
                          s.name.toLowerCase().includes(search.toLowerCase()) ||
                          teachers
                            .find((t) => t.id === s.teacherId)
                            ?.name.toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((s) => {
                        const teacher = teachers.find(
                          (t) => t.id === s.teacherId
                        );
                        return (
                          <tr key={s.id}>
                            <td className="p-2 border">{s.name}</td>
                            <td className="p-2 border">
                              {teacher?.name || " No Teacher"}
                            </td>
                            <td className="p-2 border">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditUser(s)}
                                  className="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-100 hover:text-yellow-600 cursor-pointer"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(s.id)}
                                  className="border-1 border-red-500 text-red-500 px-2 py-1 rounded text-xs hover:bg-red-100 hover:text-red-600 cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    {students.filter(
                      (s) =>
                        s.name.toLowerCase().includes(search.toLowerCase()) ||
                        teachers
                          .find((t) => t.id === s.teacherId)
                          ?.name.toLowerCase()
                          .includes(search.toLowerCase())
                    ).length === 0 && (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center text-gray-400 p-2"
                        >
                          No Results
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                {teachers
                  .filter((t) =>
                    t.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((teacher) => {
                    const teacherStudents = students.filter(
                      (s) =>
                        s.teacherId === teacher.id &&
                        s.name.toLowerCase().includes(search.toLowerCase())
                    );

                    return (
                      <div key={teacher.id} className="mb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-[#076452]">
                            {teacher.name}
                          </h3>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleEditUser(teacher)}
                              className="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-100 hover:text-yellow-600 cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteUser(teacher.id)}
                              className="border-1 border-red-500 text-red-500 px-2 py-1 rounded text-xs cursor-pointer hover:bg-red-100 hover:text-red-600 "
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="overflow-auto mt-2">
                          <table className="min-w-full table-auto border border-gray-200 text-sm">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2 border"> Student Name</th>
                                <th className="p-2 border">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {teacherStudents.map((s) => (
                                <tr key={s.id}>
                                  <td className="p-2 border">{s.name}</td>
                                  <td className="p-2 border">
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => handleEditUser(s)}
                                        className="bg-yellow-400 text-white px-2 py-1 rounded text-xs hover:bg-yellow-100 hover:text-yellow-600 cursor-pointer"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() => handleDeleteUser(s.id)}
                                        className="border-1 border-red-500 text-red-500 px-2 py-1 rounded text-xs cursor-pointer hover:bg-red-100 hover:text-red-600"
                                      >
                                        Delete
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                              {teacherStudents.length === 0 && (
                                <tr>
                                  <td
                                    colSpan="2"
                                    className="text-center text-gray-400 p-2"
                                  >
                                    No Students
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
