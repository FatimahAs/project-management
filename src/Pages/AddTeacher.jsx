import { useState } from "react";
import { useNavigate } from "react-router";

export default function AddTeacher() {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("يرجى إدخال اسم المعلم");

    await fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, role: "teacher" }),
    });

    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">إضافة معلم</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="اسم المعلم"
          className="w-full border px-4 py-2 rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white px-4 py-2 rounded-xl"
        >
          إضافة
        </button>
      </form>
    </div>
  );
}
