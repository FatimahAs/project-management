import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});

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

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">عرض الأفكار</h1>
      {projects.map((p) => (
        <div
          key={p.id}
          className="border rounded-2xl p-4 mb-4 shadow-md bg-white"
        >
          <h2 className="text-xl font-semibold text-blue-600">{p.title}</h2>
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
            <span className="font-medium">{getStudentName(p.studentId)}</span>
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
  );
}
