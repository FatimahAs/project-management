// components/StudentList.jsx
import { useEffect, useState } from "react";

export default function StudentList({ user }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    let url = "https://683ffc315b39a8039a565e4a.mockapi.io/students";
    if (user.role === "teacher") {
      url += `?teacherId=${user.id}`;
    }
    fetch(url)
      .then(res => res.json())
      .then(setStudents);
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">الطلاب</h2>
      <ul className="space-y-2">
        {students.map(s => (
          <li key={s.id} className="border p-2 rounded">{s.name}</li>
        ))}
      </ul>
    </div>
  );
}
