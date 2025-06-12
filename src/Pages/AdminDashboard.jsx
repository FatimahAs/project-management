import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Link, useNavigate } from "react-router";

const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#333"];

export default function AdminDashboard() {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const handleAddUser = (role) => {
    navigate(`/add${role}`);
    setSidebarOpen(false); // غلق السايدبار عند التنقل في الجوال
  };

  const handleEditUser = (user) => {
    if (user.role === "teacher") {
      navigate(`/editteacher/${user.id}`);
    } else {
      navigate(`/editstudent/${user.id}`);
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
        method: "DELETE",
      });
      setStudents((prev) => prev.filter((u) => u.id !== id));
      setTeachers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold mb-8">لوحة المشرف</h2>
          <nav className="flex flex-col gap-4 text-gray-700 flex-grow">
            <button
              onClick={() => navigate("/")}
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              الرئيسية
            </button>
            <Link to="/projects">
              <button className="block text-blue-600 hover:underline px-4 py-2">
                عرض الأفكار
              </button>
            </Link>
            <button
              onClick={() => handleAddUser("student")}
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              إضافة طالب
            </button>
            <button
              onClick={() => handleAddUser("teacher")}
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              إضافة معلم
            </button>
            <button
              onClick={handleLogout}
              className="text-left px-3 py-2 rounded hover:bg-red-200 text-red-600"
            >
              تسجيل خروج
            </button>
          </nav>
          <div className="mt-auto text-xs text-gray-400">
            © 2025 نظام الإدارة
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
        <header className="flex items-center justify-between bg-white shadow px-4 py-3 md:hidden">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-700 focus:outline-none"
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
          <h1 className="text-xl font-bold">لوحة تحكم المشرف</h1>
          <div></div> {/* حافظة مكان */}
        </header>

        {/* محتوى الصفحة */}
        <main className="p-6 overflow-auto">
          {/* بطاقات الأرقام */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-green-100 text-green-800 p-4 rounded-2xl shadow text-center">
              <h3 className="text-xl font-bold">الطلاب</h3>
              <p className="text-3xl">{students.length}</p>
            </div>
            <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl shadow text-center">
              <h3 className="text-xl font-bold">المعلمين</h3>
              <p className="text-3xl">{teachers.length}</p>
            </div>
            <div className="bg-yellow-100 text-yellow-800 p-4 rounded-2xl shadow text-center">
              <h3 className="text-xl font-bold">الأفكار</h3>
              <p className="text-3xl">{projects.length}</p>
            </div>
          </div>

          {/* الرسوم البيانية في صفين */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* توزيع المستخدمين */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">توزيع المستخدمين</h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={[
                    {
                      name: `طلاب (${students.length})`,
                      value: students.length,
                    },
                    {
                      name: `معلمين (${teachers.length})`,
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

            {/* حالة الأفكار */}
            <div className="bg-white rounded-2xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">حالة الأفكار</h2>
              <PieChart width={300} height={300}>
                <Pie
                  data={[
                    {
                      name: `مقبولة (${accepted.length})`,
                      value: accepted.length,
                    },
                    {
                      name: `مرفوضة (${rejected.length})`,
                      value: rejected.length,
                    },
                    {
                      name: `معلقة (${pending.length})`,
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

          {/* جدول المعلمين وطلابهم */}
          <div className="bg-white rounded-2xl shadow p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">المعلمين وطلابهم</h2>

            <div className="flex flex-wrap gap-4 mb-4">
              <input
                type="text"
                placeholder="ابحث عن معلم أو طالب"
                className="border border-gray-300 rounded-xl px-4 py-2 w-full md:w-80"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-xl"
              >
                {showAll ? "عرض حسب المعلمين" : "عرض جميع الطلاب"}
              </button>
            </div>

            {showAll ? (
              <>
                <table className="min-w-full table-auto border border-gray-200 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 border">اسم الطالب</th>
                      <th className="p-2 border">المعلم</th>
                      <th className="p-2 border">إجراءات</th>
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
                              {teacher?.name || "بدون معلم"}
                            </td>
                            <td className="p-2 border">
                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEditUser(s)}
                                  className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
                                >
                                  تعديل
                                </button>
                                <button
                                  onClick={() => handleDeleteUser(s.id)}
                                  className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                >
                                  حذف
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
                          لا يوجد نتائج مطابقة
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
                          <h3 className="font-bold text-lg text-blue-600">
                            {teacher.name}
                          </h3>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleEditUser(teacher)}
                              className="bg-yellow-400 text-white px-2 py-1 rounded text-sm"
                            >
                              تعديل
                            </button>
                            <button
                              onClick={() => handleDeleteUser(teacher.id)}
                              className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                            >
                              حذف
                            </button>
                          </div>
                        </div>

                        <div className="overflow-auto mt-2">
                          <table className="min-w-full table-auto border border-gray-200 text-sm">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2 border">اسم الطالب</th>
                                <th className="p-2 border">إجراءات</th>
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
                                        className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
                                      >
                                        تعديل
                                      </button>
                                      <button
                                        onClick={() => handleDeleteUser(s.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                                      >
                                        حذف
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
                                    لا يوجد طلاب
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
