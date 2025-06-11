//import TeacherList from "./TeacherList";
//import StudentList from "./StudentList";

//export default function AdminDashboard({ user }) {
//  return (
//    <div className="p-6">
//      <h1 className="text-2xl font-bold mb-4">لوحة تحكم المدير</h1>
//      <TeacherList />
//      <StudentList user={user} />
//    </div>
//  );
//}

// AdminDashboard.jsx
// import { useEffect, useState } from 'react';

// export default function AdminDashboard({ user }) {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [search, setSearch] = useState('');

//   const API = 'https://683ffc315b39a8039a565e4a.mockapi.io'; // Replace with your actual MockAPI base URL
// 	const APIP = 'https://68382fb12c55e01d184c5076.mockapi.io';
//   useEffect(() => {
//     fetch(`${API}/users`).then(res => res.json()).then(data => {
//       setStudents(data.filter(u => u.role === 'student'));
//       setTeachers(data.filter(u => u.role === 'teacher'));
//     });
//     fetch(`${APIP}/projects`).then(res => res.json()).then(setProjects);
//   }, []);

//   const updateProjectStatus = async (id, status, reason = '') => {
//     await fetch(`${APIP}/projects/${id}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status, rejectionReason: reason })
//     });
//     setProjects(projects.map(p => p.id === id ? { ...p, status, rejectionReason: reason } : p));
//   };

//   const deleteProject = async (id) => {
//     await fetch(`${APIP}/projects/${id}`, { method: 'DELETE' });
//     setProjects(projects.filter(p => p.id !== id));
//   };

//   const deleteUser = async (id) => {
//     await fetch(`${API}/users/${id}`, { method: 'DELETE' });
//     setStudents(students.filter(s => s.id !== id));
//     setTeachers(teachers.filter(t => t.id !== id));
//   };

//   const assignTeacherToStudent = async (studentId, teacherId) => {
//     await fetch(`${API}/users/${studentId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ teacherId })
//     });
//   };

//   const handleAddUser = async (e) => {
//     e.preventDefault();
//     const form = e.target;
//     const newUser = {
//       username: form.username.value,
//       role: form.role.value,
//       password: form.password.value,
//     };
//     const res = await fetch(`${API}/users`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newUser),
//     });
//     const data = await res.json();
//     if (data.role === 'student') setStudents([...students, data]);
//     else setTeachers([...teachers, data]);
//     form.reset();
//   };

//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold">لوحة تحكم الأدمن</h1>
//         <button onClick={() => user(null)} className="bg-gray-800 text-white px-4 py-2 rounded">تسجيل خروج</button>
//       </div>

//       {/* البحث عن الطلاب */}
//       <div>
//         <input
//           type="text"
//           placeholder="ابحث عن اسم طالب"
//           className="border-b border-gray-400 py-1 px-2 w-full"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <ul>
//           {students.filter(s => s.username.includes(search)).map(s => (
//             <li key={s.id} className="py-1 border-b">{s.username}</li>
//           ))}
//         </ul>
//       </div>

//       {/* إدارة الأفكار */}
//       <div>
//         <h2 className="text-xl font-semibold">أفكار الطلاب</h2>
//         <ul className="space-y-2 grid grid-cols-3 gap-4">
//           {projects.map(p => (
//             <li key={p.id} className=" border p-2 rounded">
//               <h3 className="font-bold">{p.title}</h3>
//               <p>{p.description}</p>
//               <p className="text-sm text-gray-500">status: {p.status}</p>
//               {p.status === 'pending' && (
//                 <div className="space-x-2 mt-2">
//                   <button onClick={() => updateProjectStatus(p.id, 'accepted')} className="bg-green-500 text-white px-3 py-1 rounded">قبول</button>
//                   <button onClick={() => {
//                     const reason = prompt('سبب الرفض:');
//                     if (reason) updateProjectStatus(p.id, 'rejected', reason);
//                   }} className="bg-red-500 text-white px-3 py-1 rounded">رفض</button>
//                 </div>
//               )}
//               {p.status === 'rejected' && (
//                 <div className="mt-2 space-x-2">
//                   <p className="text-red-600 text-sm">سبب الرفض: {p.rejectionReason}</p>
//                   <button onClick={() => deleteProject(p.id)} className="bg-red-600 text-white px-3 py-1 rounded">حذف الفكرة</button>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* إدارة المستخدمين */}
//       <div>
//         <h2 className="text-xl font-semibold">إدارة المستخدمين</h2>
//         <form onSubmit={handleAddUser} className="flex space-x-2 mt-2">
//           <input name="username" placeholder="اسم المستخدم" className="border px-2 py-1" required />
//           <input name="password" placeholder="كلمة المرور" className="border px-2 py-1" required />
//           <select name="role" className="border px-2 py-1">
//             <option value="student">طالب</option>
//             <option value="teacher">معلم</option>
//           </select>
//           <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">إضافة</button>
//         </form>

//         <div className="mt-4 ">
//           <h3 className="font-semibold">الطلاب</h3>
//           <ul className='grid grid-cols-3 gap-4'>
//             {students.map(s => (
//               <li key={s.id} className="flex justify-between items-center py-1 border-b">
//                 {s.username}
//                 <div className="flex space-x-2">
//                   <select onChange={(e) => assignTeacherToStudent(s.id, e.target.value)} className="border px-2 py-1">
//                     <option value="">اختر معلم</option>
//                     {teachers.map(t => <option key={t.id} value={t.id}>{t.username}</option>)}
//                   </select>
//                   <button onClick={() => deleteUser(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           <h3 className="font-semibold mt-4">المعلمون</h3>
//           <ul className='grid grid-cols-3 gap-4' >
//             {teachers.map(t => (
//               <li key={t.id} className="flex justify-between items-center py-1 border-b">
//                 {t.username}
//                 <button onClick={() => deleteUser(t.id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15"];

// export default function AdminDashboard() {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [projects, setProjects] = useState([]);

//   useEffect(() => {
//     fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setStudents(data.filter((u) => u.role === "student"));
//         setTeachers(data.filter((u) => u.role === "teacher"));
//       });

//     fetch("https://68382fb12c55e01d184c5076.mockapi.io/projects")
//       .then((res) => res.json())
//       .then(setProjects);
//   }, []);

//   const accepted = projects.filter((p) => p.status === "accepted");
//   const rejected = projects.filter((p) => p.status === "rejected");
//   const pending = projects.filter((p) => p.status === "pending");

//   const chartData = [
//     { name: "طلاب", value: students.length },
//     { name: "أفكار", value: projects.length },
//     { name: "مقبولة", value: accepted.length },
//     { name: "مرفوضة", value: rejected.length },
//     { name: "معلقه", value: pending.length },
//   ];

//   const handleAddUser = (role) => {
//     // فتح نموذج أو توجيه لصفحة إضافة مستخدم
//     window.location.href = `/add-${role}`;
//   };

//   const handleEditUser = (user) => {
//     window.location.href = `/edit-user/${user.id}`;
//   };

//   const handleDeleteUser = async (id) => {
//     if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
//       await fetch(`https://682199f9259dad2655afc0f9.mockapi.io/users/${id}`, {
//         method: "DELETE",
//       });
//       setStudents((prev) => prev.filter((u) => u.id !== id));
//       setTeachers((prev) => prev.filter((u) => u.id !== id));
//     }
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold mb-6">لوحة تحكم المشرف</h1>

//       <div className="flex flex-wrap gap-4 mb-6">
//         <button
//           onClick={() => handleAddUser("student")}
//           className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow"
//         >
//           + إضافة طالب
//         </button>
//         <button
//           onClick={() => handleAddUser("teacher")}
//           className="bg-green-500 text-white px-4 py-2 rounded-xl shadow"
//         >
//           + إضافة معلم
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">إحصائيات عامة</h2>
//           <PieChart width={300} height={300}>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//               label
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6 overflow-auto">
//           <h2 className="text-xl font-semibold mb-4">المعلمين وطلابهم</h2>
//           {teachers.map((teacher) => {
//             const teacherStudents = students.filter(
//               (s) => s.teacherId === teacher.id
//             );
//             return (
//               <div key={teacher.id} className="mb-6">
//                 <h3 className="font-bold text-lg text-blue-600">
//                   {teacher.username}
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-1">
//                   <button
//                     onClick={() => handleEditUser(teacher)}
//                     className="bg-yellow-400 text-white px-2 py-1 rounded text-sm"
//                   >
//                     تعديل
//                   </button>
//                   <button
//                     onClick={() => handleDeleteUser(teacher.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded text-sm"
//                   >
//                     حذف
//                   </button>
//                 </div>
//                 <ul className="list-disc list-inside ml-4 text-gray-700 mt-2">
//                   {teacherStudents.map((s) => (
//                     <li
//                       key={s.id}
//                       className="flex justify-between items-center"
//                     >
//                       <span>{s.username}</span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEditUser(s)}
//                           className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
//                         >
//                           تعديل
//                         </button>
//                         <button
//                           onClick={() => handleDeleteUser(s.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs"
//                         >
//                           حذف
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                   {teacherStudents.length === 0 && (
//                     <li className="text-gray-400">لا يوجد طلاب</li>
//                   )}
//                 </ul>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }
// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { useNavigate } from "react-router";

// const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#333"];

// export default function AdminDashboard() {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showAll, setShowAll] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setStudents(data.filter((u) => u.role === "student"));
//         setTeachers(data.filter((u) => u.role === "teacher"));
//       });

//     fetch("https://68382fb12c55e01d184c5076.mockapi.io/projects")
//       .then((res) => res.json())
//       .then(setProjects);
//   }, []);

//   const accepted = projects.filter((p) => p.status === "accepted");
//   const rejected = projects.filter((p) => p.status === "rejected");
//   const pending = projects.filter((p) => p.status === "pending");

//   const chartData = [
//     { name: "طلاب", value: students.length },
//     { name: "أفكار", value: projects.length },
//     { name: "مقبولة", value: accepted.length },
//     { name: "مرفوضة", value: rejected.length },
//     { name: "معلقه", value: pending.length },
//   ];

//   const handleAddUser = (role) => {
//     navigate(`/add-${role}`);
//   };

//   const handleEditUser = (user) => {
//     navigate(`/edit-user/${user.id}`);
//   };

//   const handleDeleteUser = async (id) => {
//     if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
//       await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
//         method: "DELETE",
//       });
//       setStudents((prev) => prev.filter((u) => u.id !== id));
//       setTeachers((prev) => prev.filter((u) => u.id !== id));
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/signin");
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">لوحة تحكم المشرف</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-gray-700 text-white px-4 py-2 rounded-xl"
//         >
//           تسجيل خروج
//         </button>
//       </div>

//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           type="text"
//           placeholder="ابحث عن اسم طالب"
//           className="border border-gray-300 rounded-xl px-4 py-2 w-60"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <button
//           onClick={() => handleAddUser("student")}
//           className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow"
//         >
//           + إضافة طالب
//         </button>
//         <button
//           onClick={() => handleAddUser("teacher")}
//           className="bg-green-500 text-white px-4 py-2 rounded-xl shadow"
//         >
//           + إضافة معلم
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">إحصائيات عامة</h2>
//           <PieChart width={300} height={300}>
//             <Pie
//               data={chartData}
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//               label
//             >
//               {chartData.map((entry, index) => (
//                 <Cell
//                   key={`cell-${index}`}
//                   fill={COLORS[index % COLORS.length]}
//                 />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>

//         <div className="bg-white rounded-2xl shadow p-6 overflow-auto">
//           <h2 className="text-xl font-semibold mb-4">المعلمين وطلابهم</h2>
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="bg-indigo-500 text-white px-4 py-2 rounded-xl mb-4"
//           >
//             {showAll ? "عرض الطلاب لكل معلم" : "عرض جميع الطلاب دفعة واحدة"}
//           </button>

//           {showAll ? (
//             <ul className="list-disc list-inside ml-4 text-gray-700">
//               {students
//                 .filter((s) => s.username.includes(search))
//                 .map((s) => {
//                   const teacher = teachers.find((t) => t.id === s.teacherId);
//                   return (
//                     <li
//                       key={s.id}
//                       className="flex justify-between items-center"
//                     >
//                       <span>
//                         {s.username} -{" "}
//                         <span className="text-sm text-gray-500">
//                           {teacher?.username || "بدون معلم"}
//                         </span>
//                       </span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEditUser(s)}
//                           className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
//                         >
//                           تعديل
//                         </button>
//                         <button
//                           onClick={() => handleDeleteUser(s.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs"
//                         >
//                           حذف
//                         </button>
//                       </div>
//                     </li>
//                   );
//                 })}
//               {students.filter((s) => s.username.includes(search)).length ===
//                 0 && <li className="text-gray-400">لا يوجد طلاب</li>}
//             </ul>
//           ) : (
//             teachers.map((teacher) => {
//               const teacherStudents = students.filter(
//                 (s) => s.teacherId === teacher.id && s.username.includes(search)
//               );
//               return (
//                 <div key={teacher.id} className="mb-6">
//                   <h3 className="font-bold text-lg text-blue-600">
//                     {teacher.username}
//                   </h3>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     <button
//                       onClick={() => handleEditUser(teacher)}
//                       className="bg-yellow-400 text-white px-2 py-1 rounded text-sm"
//                     >
//                       تعديل
//                     </button>
//                     <button
//                       onClick={() => handleDeleteUser(teacher.id)}
//                       className="bg-red-500 text-white px-2 py-1 rounded text-sm"
//                     >
//                       حذف
//                     </button>
//                   </div>
//                   <ul className="list-disc list-inside ml-4 text-gray-700 mt-2">
//                     {teacherStudents.map((s) => (
//                       <li
//                         key={s.id}
//                         className="flex justify-between items-center"
//                       >
//                         <span>{s.username}</span>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => handleEditUser(s)}
//                             className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
//                           >
//                             تعديل
//                           </button>
//                           <button
//                             onClick={() => handleDeleteUser(s.id)}
//                             className="bg-red-500 text-white px-2 py-1 rounded text-xs"
//                           >
//                             حذف
//                           </button>
//                         </div>
//                       </li>
//                     ))}
//                     {teacherStudents.length === 0 && (
//                       <li className="text-gray-400">لا يوجد طلاب</li>
//                     )}
//                   </ul>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { useNavigate } from "react-router";

// const COLORS = ["#4ade80", "#f87171", "#60a5fa", "#facc15", "#333"];

// export default function AdminDashboard() {
//   const [students, setStudents] = useState([]);
//   const [teachers, setTeachers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [search, setSearch] = useState("");
//   const [showAll, setShowAll] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setStudents(data.filter((u) => u.role === "student"));
//         setTeachers(data.filter((u) => u.role === "teacher"));
//       });

//     fetch("https://68382fb12c55e01d184c5076.mockapi.io/projects")
//       .then((res) => res.json())
//       .then(setProjects);
//   }, []);

//   const accepted = projects.filter((p) => p.status === "accepted");
//   const rejected = projects.filter((p) => p.status === "rejected");
//   const pending = projects.filter((p) => p.status === "pending");

//   const handleAddUser = (role) => {
//     navigate(`/add-${role}`);
//   };

//   const handleEditUser = (user) => {
//     navigate(`/edit-user/${user.id}`);
//   };

//   const handleDeleteUser = async (id) => {
//     if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
//       await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users/${id}`, {
//         method: "DELETE",
//       });
//       setStudents((prev) => prev.filter((u) => u.id !== id));
//       setTeachers((prev) => prev.filter((u) => u.id !== id));
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/signin");
//   };

//   return (
//     <div className="p-6 max-w-7xl mx-auto">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold">لوحة تحكم المشرف</h1>
//         <button
//           onClick={handleLogout}
//           className="bg-gray-700 text-white px-4 py-2 rounded-xl"
//         >
//           تسجيل خروج
//         </button>
//       </div>

//       {/* بطاقات الأرقام */}
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
//         <div className="bg-green-100 text-green-800 p-4 rounded-2xl shadow text-center">
//           <h3 className="text-xl font-bold">الطلاب</h3>
//           <p className="text-3xl">{students.length}</p>
//         </div>
//         <div className="bg-blue-100 text-blue-800 p-4 rounded-2xl shadow text-center">
//           <h3 className="text-xl font-bold">المعلمين</h3>
//           <p className="text-3xl">{teachers.length}</p>
//         </div>
//         <div className="bg-yellow-100 text-yellow-800 p-4 rounded-2xl shadow text-center">
//           <h3 className="text-xl font-bold">الأفكار</h3>
//           <p className="text-3xl">{projects.length}</p>
//         </div>
//       </div>

//       {/* الرسوم البيانية في صفين */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         {/* توزيع المستخدمين */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">توزيع المستخدمين</h2>
//           <PieChart width={300} height={300}>
//             <Pie
//               data={[
//                 { name: `طلاب (${students.length})`, value: students.length },
//                 { name: `معلمين (${teachers.length})`, value: teachers.length },
//               ]}
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//               label
//             >
//               <Cell fill="#4ade80" />
//               <Cell fill="#60a5fa" />
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>

//         {/* حالة الأفكار */}
//         <div className="bg-white rounded-2xl shadow p-6">
//           <h2 className="text-xl font-semibold mb-4">حالة الأفكار</h2>
//           <PieChart width={300} height={300}>
//             <Pie
//               data={[
//                 { name: `مقبولة (${accepted.length})`, value: accepted.length },
//                 { name: `مرفوضة (${rejected.length})`, value: rejected.length },
//                 { name: `معلقة (${pending.length})`, value: pending.length },
//               ]}
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               fill="#8884d8"
//               dataKey="value"
//               label
//             >
//               <Cell fill="#4ade80" />
//               <Cell fill="#f87171" />
//               <Cell fill="#facc15" />
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </div>
//       </div>

//       {/* قسم المعلمين وطلابهم */}
//       <div className="bg-white rounded-2xl shadow p-6 overflow-auto">
//         <h2 className="text-xl font-semibold mb-4">المعلمين وطلابهم</h2>
//         <div className="flex flex-wrap gap-4 mb-6">
//           <input
//             type="text"
//             placeholder="ابحث عن اسم طالب"
//             className="border border-gray-300 rounded-xl px-4 py-2 w-60"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button
//             onClick={() => handleAddUser("student")}
//             className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow"
//           >
//             + إضافة طالب
//           </button>
//           <button
//             onClick={() => handleAddUser("teacher")}
//             className="bg-green-500 text-white px-4 py-2 rounded-xl shadow"
//           >
//             + إضافة معلم
//           </button>
//           <button
//             onClick={() => setShowAll(!showAll)}
//             className="bg-indigo-500 text-white px-4 py-2 rounded-xl"
//           >
//             {showAll ? "عرض الطلاب لكل معلم" : "عرض جميع الطلاب دفعة واحدة"}
//           </button>
//         </div>

//         {showAll ? (
//           <ul className="list-disc list-inside ml-4 text-gray-700">
//             {students
//               .filter((s) => s.username.includes(search))
//               .map((s) => {
//                 const teacher = teachers.find((t) => t.id === s.teacherId);
//                 return (
//                   <li key={s.id} className="flex justify-between items-center">
//                     <span>
//                       {s.username} -{" "}
//                       <span className="text-sm text-gray-500">
//                         {teacher?.username || "بدون معلم"}
//                       </span>
//                     </span>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEditUser(s)}
//                         className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
//                       >
//                         تعديل
//                       </button>
//                       <button
//                         onClick={() => handleDeleteUser(s.id)}
//                         className="bg-red-500 text-white px-2 py-1 rounded text-xs"
//                       >
//                         حذف
//                       </button>
//                     </div>
//                   </li>
//                 );
//               })}
//             {students.filter((s) => s.username.includes(search)).length ===
//               0 && <li className="text-gray-400">لا يوجد طلاب</li>}
//           </ul>
//         ) : (
//           teachers.map((teacher) => {
//             const teacherStudents = students.filter(
//               (s) => s.teacherId === teacher.id && s.username.includes(search)
//             );
//             return (
//               <div key={teacher.id} className="mb-6">
//                 <h3 className="font-bold text-lg text-blue-600">
//                   {teacher.username}
//                 </h3>
//                 <div className="flex flex-wrap gap-2 mt-1">
//                   <button
//                     onClick={() => handleEditUser(teacher)}
//                     className="bg-yellow-400 text-white px-2 py-1 rounded text-sm"
//                   >
//                     تعديل
//                   </button>
//                   <button
//                     onClick={() => handleDeleteUser(teacher.id)}
//                     className="bg-red-500 text-white px-2 py-1 rounded text-sm"
//                   >
//                     حذف
//                   </button>
//                 </div>
//                 <ul className="list-disc list-inside ml-4 text-gray-700 mt-2">
//                   {teacherStudents.map((s) => (
//                     <li
//                       key={s.id}
//                       className="flex justify-between items-center"
//                     >
//                       <span>{s.username}</span>
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleEditUser(s)}
//                           className="bg-yellow-400 text-white px-2 py-1 rounded text-xs"
//                         >
//                           تعديل
//                         </button>
//                         <button
//                           onClick={() => handleDeleteUser(s.id)}
//                           className="bg-red-500 text-white px-2 py-1 rounded text-xs"
//                         >
//                           حذف
//                         </button>
//                       </div>
//                     </li>
//                   ))}
//                   {teacherStudents.length === 0 && (
//                     <li className="text-gray-400">لا يوجد طلاب</li>
//                   )}
//                 </ul>
//               </div>
//             );
//           })
//         )}
//       </div>
//     </div>
//   );
// }

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

    fetch("https://68382fb12c55e01d184c5076.mockapi.io/projects")
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

          {/* قسم المعلمين وطلابهم */}
          {/* <div className="bg-white rounded-2xl shadow p-6 overflow-auto">
            <h2 className="text-xl font-semibold mb-4">المعلمين وطلابهم</h2>
            <div className="flex flex-wrap gap-4 mb-6">
              <input
                type="text"
                placeholder="ابحث عن اسم طالب"
                className="border border-gray-300 rounded-xl px-4 py-2 w-60"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                onClick={() => handleAddUser("student")}
                className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow"
              >
                + إضافة طالب
              </button>
              <button
                onClick={() => handleAddUser("teacher")}
                className="bg-green-500 text-white px-4 py-2 rounded-xl shadow"
              >
                + إضافة معلم
              </button>
              <button
                onClick={() => setShowAll(!showAll)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-xl"
              >
                {showAll ? "عرض الطلاب لكل معلم" : "عرض جميع الطلاب دفعة واحدة"}
              </button>
            </div>

            {showAll ? (
              <ul className="list-disc list-inside ml-4 text-gray-700">
                {students
                  .filter((s) => s.username.includes(search))
                  .map((s) => {
                    const teacher = teachers.find((t) => t.id === s.teacherId);
                    return (
                      <li
                        key={s.id}
                        className="flex justify-between items-center"
                      >
                        <span>
                          {s.username} -{" "}
                          <span className="text-sm text-gray-500">
                            {teacher?.username || "بدون معلم"}
                          </span>
                        </span>
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
                      </li>
                    );
                  })}
                {students.filter((s) => s.username.includes(search)).length ===
                  0 && <li className="text-gray-400">لا يوجد طلاب</li>}
              </ul>
            ) : (
              teachers.map((teacher) => {
                const teacherStudents = students.filter(
                  (s) =>
                    s.teacherId === teacher.id && s.username.includes(search)
                );
                return (
                  <div key={teacher.id} className="mb-6">
                    <h3 className="font-bold text-lg text-blue-600">
                      {teacher.username}
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
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
                    <ul className="list-disc list-inside ml-4 text-gray-700 mt-2">
                      {teacherStudents.map((s) => (
                        <li
                          key={s.id}
                          className="flex justify-between items-center"
                        >
                          <span>{s.username}</span>
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
                        </li>
                      ))}
                      {teacherStudents.length === 0 && (
                        <li className="text-gray-400">لا يوجد طلاب</li>
                      )}
                    </ul>
                  </div>
                );
              })
            )}
          </div> */}
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
                          s.username
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                          teachers
                            .find((t) => t.id === s.teacherId)
                            ?.username.toLowerCase()
                            .includes(search.toLowerCase())
                      )
                      .map((s) => {
                        const teacher = teachers.find(
                          (t) => t.id === s.teacherId
                        );
                        return (
                          <tr key={s.id}>
                            <td className="p-2 border">{s.username}</td>
                            <td className="p-2 border">
                              {teacher?.username || "بدون معلم"}
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
                        s.username
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        teachers
                          .find((t) => t.id === s.teacherId)
                          ?.username.toLowerCase()
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
                    t.username.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((teacher) => {
                    const teacherStudents = students.filter(
                      (s) =>
                        s.teacherId === teacher.id &&
                        s.username.toLowerCase().includes(search.toLowerCase())
                    );

                    return (
                      <div key={teacher.id} className="mb-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-lg text-blue-600">
                            {teacher.username}
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
                                  <td className="p-2 border">{s.username}</td>
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
