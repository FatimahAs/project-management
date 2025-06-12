import React, { useEffect, useState } from "react";
import axios from "axios";

const USERS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/users";
const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";
const MESSAGES_API = "https://68382fb12c55e01d184c5076.mockapi.io/messages";

export default function TeacherDashboard() {
  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setTeacher(storedUser);

      // جلب الطلاب التابعين للمعلم
      axios.get(`${USERS_API}?teacherId=${storedUser.id}`).then((res) => {
        setStudents(res.data);
      });

      // جلب المشاريع لأفكار الطلاب تحت المعلم
      axios.get(`${PROJECTS_API}`).then((res) => {
        // فلتر المشاريع حسب الطلاب تحت المعلم
        const allProjects = res.data;
        axios.get(`${USERS_API}?teacherId=${storedUser.id}`).then((stuRes) => {
          const studentIds = stuRes.data.map((s) => s.id);
          const filteredProjects = allProjects.filter((p) =>
            studentIds.includes(p.userId)
          );
          setProjects(filteredProjects);
        });
      });

      // جلب الرسائل الخاصة بفريق المعلم (نفترض أن فريق المعلم هو teamId الموجود في المعلم)
      if (storedUser.teamId) {
        axios.get(`${MESSAGES_API}?teamId=${storedUser.teamId}`).then((res) => {
          setMessages(res.data);
        });
      }
    }
  }, []);

  const handleUpdateStatus = async (projectId) => {
    if (!statusUpdate) {
      alert("الرجاء اختيار حالة جديدة");
      return;
    }
    try {
      const project = projects.find((p) => p.id === projectId);
      if (!project) return;

      await axios.put(`${PROJECTS_API}/${projectId}`, {
        ...project,
        status: statusUpdate,
        reason: reason || "",
        updatedAt: new Date().toISOString(),
      });

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                status: statusUpdate,
                reason,
                updatedAt: new Date().toISOString(),
              }
            : p
        )
      );

      setSelectedProjectId(null);
      setStatusUpdate("");
      setReason("");
    } catch (error) {
      alert("حدث خطأ أثناء تحديث حالة المشروع");
      console.error(error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !teacher) return;

    const msg = {
      teamId: teacher.teamId,
      senderId: teacher.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };
    try {
      await axios.post(MESSAGES_API, msg);
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الرسالة");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen p-4 gap-4 bg-gray-50">
      {/* Projects Section */}
      <section className="flex-1 bg-white rounded shadow p-4 overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">أفكار الطلاب</h2>
        {projects.length === 0 && <p>لا توجد أفكار لعرضها.</p>}

        <table className="w-full text-right table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">اسم الطالب</th>
              <th className="border border-gray-300 p-2">عنوان الفكرة</th>
              <th className="border border-gray-300 p-2">الحالة</th>
              <th className="border border-gray-300 p-2">سبب الرفض/التعليق</th>
              <th className="border border-gray-300 p-2">تعديل الحالة</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((proj) => {
              const student = students.find((s) => s.id === proj.userId);
              return (
                <tr key={proj.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {student?.name || "غير معروف"}
                  </td>
                  <td className="border border-gray-300 p-2">{proj.title}</td>
                  <td className="border border-gray-300 p-2 capitalize">
                    {proj.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {proj.reason || "-"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {selectedProjectId === proj.id ? (
                      <>
                        <select
                          className="border rounded p-1 mr-2"
                          value={statusUpdate}
                          onChange={(e) => setStatusUpdate(e.target.value)}
                        >
                          <option value="">اختر الحالة</option>
                          <option value="accepted">مقبولة</option>
                          <option value="rejected">مرفوضة</option>
                          <option value="pending">معلقة</option>
                        </select>
                        <input
                          type="text"
                          placeholder="سبب التعديل (اختياري)"
                          className="border rounded p-1 mr-2"
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                        <button
                          onClick={() => handleUpdateStatus(proj.id)}
                          className="bg-green-500 text-white rounded px-3 py-1"
                        >
                          حفظ
                        </button>
                        <button
                          onClick={() => setSelectedProjectId(null)}
                          className="mr-2 px-3 py-1 rounded border"
                        >
                          إلغاء
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setSelectedProjectId(proj.id)}
                        className="bg-yellow-400 rounded px-3 py-1"
                      >
                        تعديل
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* Students List */}
      <section className="w-80 bg-white rounded shadow p-4 overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">الطلاب التابعون</h2>
        {students.length === 0 && <p>لا يوجد طلاب.</p>}
        <ul className="space-y-2 text-right">
          {students.map((student) => (
            <li key={student.id} className="border-b border-gray-200 pb-2">
              <p className="font-semibold">{student.name}</p>
              <p className="text-sm text-gray-600">{student.email}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Chat Section */}
      <section className="flex-1 bg-white rounded shadow p-4 flex flex-col max-h-[90vh]">
        <h2 className="text-xl font-bold mb-4">دردشة الفريق</h2>
        <div className="flex-1 overflow-y-auto mb-4 space-y-2 p-2 border rounded">
          {messages.map((msg, i) => {
            const sender =
              students.find((s) => s.id === msg.senderId) ||
              (teacher && teacher.id === msg.senderId ? teacher : null);
            return (
              <div
                key={i}
                className={`p-2 rounded-xl max-w-xs break-words ${
                  msg.senderId === teacher?.id
                    ? "bg-yellow-200 self-end ml-auto text-right"
                    : "bg-gray-100 mr-auto text-left"
                }`}
              >
                <p className="text-sm font-bold">
                  {sender?.name || "مستخدم مجهول"}
                </p>
                <p className="text-sm">{msg.text}</p>
                <p className="text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2"
            placeholder="اكتب رسالة..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white rounded px-4 py-2"
          >
            إرسال
          </button>
        </div>
      </section>
    </div>
  );
}
