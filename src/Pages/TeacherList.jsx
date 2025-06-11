// components/TeacherList.jsx
import { useEffect, useState } from "react";

export default function TeacherList() {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users?role=teacher")
      .then(res => res.json())
      .then(setTeachers);
  }, []);

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">قائمة المدرسين</h2>
      <ul className="space-y-2">
        {teachers.map(t => (
          <li key={t.id} className="border p-2 rounded">{t.username}</li>
        ))}
      </ul>
    </div>
  );
}
