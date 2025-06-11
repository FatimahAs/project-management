import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function AddStudent() {
  const [username, setUsername] = useState("");
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
    if (!username.trim()) return alert("يرجى إدخال اسم الطالب");

    await fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, teacherId, role: "student" }),
    });

    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">إضافة طالب</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="اسم الطالب"
          className="w-full border px-4 py-2 rounded-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select
          className="w-full border px-4 py-2 rounded-xl"
          value={teacherId}
          onChange={(e) => setTeacherId(e.target.value)}
        >
          <option value="">اختر المعلم</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.username}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          إضافة
        </button>
      </form>
    </div>
  );
}
