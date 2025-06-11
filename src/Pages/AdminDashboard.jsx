
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
import { useEffect, useState } from 'react';

export default function AdminDashboard({ user }) {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');

  const API = 'https://683ffc315b39a8039a565e4a.mockapi.io'; // Replace with your actual MockAPI base URL
	const APIP = 'https://68382fb12c55e01d184c5076.mockapi.io';
  useEffect(() => {
    fetch(`${API}/users`).then(res => res.json()).then(data => {
      setStudents(data.filter(u => u.role === 'student'));
      setTeachers(data.filter(u => u.role === 'teacher'));
    });
    fetch(`${APIP}/projects`).then(res => res.json()).then(setProjects);
  }, []);

  const updateProjectStatus = async (id, status, reason = '') => {
    await fetch(`${APIP}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, rejectionReason: reason })
    });
    setProjects(projects.map(p => p.id === id ? { ...p, status, rejectionReason: reason } : p));
  };

  const deleteProject = async (id) => {
    await fetch(`${APIP}/projects/${id}`, { method: 'DELETE' });
    setProjects(projects.filter(p => p.id !== id));
  };

  const deleteUser = async (id) => {
    await fetch(`${API}/users/${id}`, { method: 'DELETE' });
    setStudents(students.filter(s => s.id !== id));
    setTeachers(teachers.filter(t => t.id !== id));
  };

  const assignTeacherToStudent = async (studentId, teacherId) => {
    await fetch(`${API}/users/${studentId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ teacherId })
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      username: form.username.value,
      role: form.role.value,
      password: form.password.value,
    };
    const res = await fetch(`${API}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const data = await res.json();
    if (data.role === 'student') setStudents([...students, data]);
    else setTeachers([...teachers, data]);
    form.reset();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">لوحة تحكم الأدمن</h1>
        <button onClick={() => user(null)} className="bg-gray-800 text-white px-4 py-2 rounded">تسجيل خروج</button>
      </div>

      {/* البحث عن الطلاب */}
      <div>
        <input
          type="text"
          placeholder="ابحث عن اسم طالب"
          className="border-b border-gray-400 py-1 px-2 w-full"
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul>
          {students.filter(s => s.username.includes(search)).map(s => (
            <li key={s.id} className="py-1 border-b">{s.username}</li>
          ))}
        </ul>
      </div>

      {/* إدارة الأفكار */}
      <div>
        <h2 className="text-xl font-semibold">أفكار الطلاب</h2>
        <ul className="space-y-2 grid grid-cols-3 gap-4">
          {projects.map(p => (
            <li key={p.id} className=" border p-2 rounded">
              <h3 className="font-bold">{p.title}</h3>
              <p>{p.description}</p>
              <p className="text-sm text-gray-500">status: {p.status}</p>
              {p.status === 'pending' && (
                <div className="space-x-2 mt-2">
                  <button onClick={() => updateProjectStatus(p.id, 'accepted')} className="bg-green-500 text-white px-3 py-1 rounded">قبول</button>
                  <button onClick={() => {
                    const reason = prompt('سبب الرفض:');
                    if (reason) updateProjectStatus(p.id, 'rejected', reason);
                  }} className="bg-red-500 text-white px-3 py-1 rounded">رفض</button>
                </div>
              )}
              {p.status === 'rejected' && (
                <div className="mt-2 space-x-2">
                  <p className="text-red-600 text-sm">سبب الرفض: {p.rejectionReason}</p>
                  <button onClick={() => deleteProject(p.id)} className="bg-red-600 text-white px-3 py-1 rounded">حذف الفكرة</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* إدارة المستخدمين */}
      <div>
        <h2 className="text-xl font-semibold">إدارة المستخدمين</h2>
        <form onSubmit={handleAddUser} className="flex space-x-2 mt-2">
          <input name="username" placeholder="اسم المستخدم" className="border px-2 py-1" required />
          <input name="password" placeholder="كلمة المرور" className="border px-2 py-1" required />
          <select name="role" className="border px-2 py-1">
            <option value="student">طالب</option>
            <option value="teacher">معلم</option>
          </select>
          <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">إضافة</button>
        </form>

        <div className="mt-4 ">
          <h3 className="font-semibold">الطلاب</h3>
          <ul className='grid grid-cols-3 gap-4'>
            {students.map(s => (
              <li key={s.id} className="flex justify-between items-center py-1 border-b">
                {s.username}
                <div className="flex space-x-2">
                  <select onChange={(e) => assignTeacherToStudent(s.id, e.target.value)} className="border px-2 py-1">
                    <option value="">اختر معلم</option>
                    {teachers.map(t => <option key={t.id} value={t.id}>{t.username}</option>)}
                  </select>
                  <button onClick={() => deleteUser(s.id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="font-semibold mt-4">المعلمون</h3>
          <ul className='grid grid-cols-3 gap-4' >
            {teachers.map(t => (
              <li key={t.id} className="flex justify-between items-center py-1 border-b">
                {t.username}
                <button onClick={() => deleteUser(t.id)} className="bg-red-500 text-white px-2 py-1 rounded">حذف</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

