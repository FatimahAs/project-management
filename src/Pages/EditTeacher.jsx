import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditTeacher() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`)
      .then((res) => res.json())
      .then((data) => setName(data.name));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("يرجى إدخال اسم المعلم");

    await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    navigate("/");
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">تعديل المعلم</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          placeholder="اسم المعلم"
          className="w-full border px-4 py-2 rounded-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
