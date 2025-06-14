import { useEffect, useState } from "react";

import StudentSideBar from "../../components/Student/StudentSideBar";
import StudentNav from "../../components/Student/StudentNav";

export default function Accepted() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const toggleShow = () => setShowFull(!showFull);

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/projects")
      .then((res) => res.json())
      .then(setProjects);

    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const getStudentName = (userId) => {
    const student = users.find((u) => u.id === userId);
    return student?.name || " Unknown ";
  };

  const getTeacherName = (userId) => {
    const user = users.find((u) => u.id === userId);

    if (!user) return "Unknown";

    if (user.role === "teacher") {
      return user.name;
    }

    if (user.role === "student") {
      const teacher = users.find(
        (u) => u.id === user.teacherId && u.role === "teacher"
      );
      return teacher?.name || " Unknown ";
    }

    return "Unknown";
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <StudentNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6 overflow-auto">
          <div className="max-w-5xl mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-6 text-[#062940]">
              Accepted Idea
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {projects
                .filter((p) => p.status === "accepted")
                .map((p) => (
                  <div
                    key={p.id}
                    className="border rounded-2xl p-4 mb-4 shadow-md bg-white"
                  >
                    <h2 className="text-xl font-semibold text-[#3687ba]">
                      {p.title}
                    </h2>
                    <p className="text-gray-700 mb-2">{p.description}</p>
                    <p className="text-sm text-gray-500 mb-1">
                      Status:{" "}
                      <span
                        className={
                          p.status === "accepted"
                            ? "text-green-500"
                            : p.status === "rejected"
                            ? "text-red-500"
                            : "text-yellow-500"
                        }
                      >
                        {p.status === "accepted"
                          ? "Accepted"
                          : p.status === "rejected"
                          ? "Rejected"
                          : "Pending"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                      Student :
                      <span className="font-medium">
                        {getStudentName(p.userId)}
                      </span>
                    </p>

                    <p className="text-sm text-gray-500 mb-2">
                      Teacher :
                      <span className="font-medium">
                        {getTeacherName(p.userId)}
                      </span>
                    </p>

                    <div className="flex flex-col gap-2">
                      <p
                        className={`${
                          showFull ? "" : "line-clamp-2"
                        } break-all text-sm text-gray-500 mb-2`}
                      >
                        Reason:
                        <span className="font-medium"> {p.comment} </span>
                      </p>

                      {p.comment && p.comment.length > 100 && (
                        <button
                          onClick={toggleShow}
                          className="text-[#198805] mt-1 text-sm hover:bg-[#f5f6f5] px-4 py-1 rounded-xl bg-[#eefcec] self-center cursor-pointer"
                        >
                          {showFull ? "Less " : "More "}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
