// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router";

// export default function EditStudent() {
//   const { id } = useParams();
//   const [name, setName] = useState("");
//   const [teacherId, setTeacherId] = useState("");
//   const [teamMembers, setTeamMembers] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [students, setStudents] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // جلب بيانات الطالب
//     fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`)
//       .then((res) => res.json())
//       .then((data) => {
//         setName(data.name || data.name || "");
//         setTeacherId(data.teacherId || "");
//         setTeamMembers(data.teamMembers || []);
//       });

//     // جلب كل المستخدمين لتصفية المعلمين والطلاب
//     fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setTeachers(data.filter((u) => u.role === "teacher"));
//         setStudents(data.filter((u) => u.role === "student" && u.id !== id));
//       });
//   }, [id]);

//   const handleTeamChange = (memberId) => {
//     setTeamMembers((prev) =>
//       prev.includes(memberId)
//         ? prev.filter((id) => id !== memberId)
//         : [...prev, memberId]
//     );
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!name.trim()) return alert("يرجى إدخال اسم الطالب");

//     await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, teacherId, teamMembers }),
//     });

//     navigate("/");
//   };

//   return (
//     <div className="p-6 max-w-xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">تعديل الطالب</h1>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <input
//           type="text"
//           placeholder="اسم الطالب"
//           className="w-full border px-4 py-2 rounded-xl"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <select
//           className="w-full border px-4 py-2 rounded-xl"
//           value={teacherId}
//           onChange={(e) => setTeacherId(e.target.value)}
//         >
//           <option value="">اختر المعلم</option>
//           {teachers.map((t) => (
//             <option key={t.id} value={t.id}>
//               {t.name || t.name}
//             </option>
//           ))}
//         </select>

//         <div>
//           <label className="block font-medium mb-2">أعضاء الفريق:</label>
//           <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-xl p-2">
//             {students.map((student) => (
//               <label key={student.id} className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={teamMembers.includes(student.id)}
//                   onChange={() => handleTeamChange(student.id)}
//                 />
//                 <span>{student.name || student.name}</span>
//               </label>
//             ))}
//           </div>
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-yellow-500 text-white px-4 py-2 rounded-xl"
//         >
//           حفظ التعديلات
//         </button>
//       </form>
//     </div>
//   );
// }
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function EditStudent() {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [teamMembers, setTeamMembers] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username || data.name || "");
        setTeacherId(data.teacherId || "");
        setTeamMembers(data.teamMembers || []);
      });

    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => {
        setTeachers(data.filter((u) => u.role === "teacher"));
        setStudents(data.filter((u) => u.role === "student" && u.id !== id));
      });
  }, [id]);

  const handleTeamChange = (memberId) => {
    setTeamMembers((prev) =>
      prev.includes(memberId)
        ? prev.filter((id) => id !== memberId)
        : [...prev, memberId]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!username.trim()) return alert("يرجى إدخال اسم الطالب");

    await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, teacherId, teamMembers }),
    });

    navigate("/");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
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
              {t.username || t.name}
            </option>
          ))}
        </select>

        <div>
          <label className="block font-medium mb-2">أعضاء الفريق:</label>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-xl p-2">
            {students.map((student) => (
              <label key={student.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={teamMembers.includes(student.id)}
                  onChange={() => handleTeamChange(student.id)}
                />
                <span>{student.username || student.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* عرض أسماء أعضاء الفريق المختارين */}
        {teamMembers.length > 0 && (
          <div className="bg-gray-100 border rounded-xl p-3">
            <p className="mb-2 font-semibold">الطلاب المختارون:</p>
            <div className="flex flex-wrap gap-2">
              {teamMembers.map((memberId) => {
                const student = students.find((s) => s.id === memberId);
                return (
                  <span
                    key={memberId}
                    className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {student?.username || student?.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}

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
