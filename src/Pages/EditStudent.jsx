import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditStudent() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
        setTeacherId(data.teacherId || "");
      });

    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => setTeachers(data.filter((u) => u.role === "teacher")));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("يرجى إدخال اسم الطالب");

    await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, teacherId }),
    });

    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">تعديل الطالب</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
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
          className="w-full bg-yellow-500 text-white px-4 py-2 rounded-xl"
        >
          حفظ التعديلات
        </button>
      </form>
    </div>
  );
}
