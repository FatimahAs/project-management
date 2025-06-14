import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AdminNav from "../../components/Admin/AdminNav";
import { useNavigate } from "react-router";
import AdminSideBar from "../../components/Admin/AdminSideBar";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFull, setShowFull] = useState(false);

  const toggleShow = () => setShowFull(!showFull);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/projects")
      .then((res) => res.json())
      .then(setProjects);

    fetch("https://683ffc315b39a8039a565e4a.mockapi.io/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  const updateProjectStatus = async (id, status) => {
    await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, status } : proj))
    );
  };

  const saveComment = async (id) => {
    const comment = comments[id];
    if (!comment) return;

    await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/projects/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    });

    Swal.fire("Success", "Reason Saved successfully   ", "success");
  };

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

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
    setSidebarOpen(false);
  };

  const handleDeleteIdea = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure you want to delete this idea?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      await fetch(
        `https://683ffc315b39a8039a565e4a.mockapi.io/projects/${id}`,
        {
          method: "DELETE",
        }
      );

      setProjects((prev) => prev.filter((project) => project.id !== id));

      Swal.fire(
        "Deleted!",
        "The idea has been deleted successfully.",
        "success"
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6 overflow-auto">
          <div className="max-w-5xl mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-6 text-[#062940]">
              Student Idea
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {projects.map((p) => (
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

                  <div className="flex flex-wrap gap-2 mb-2">
                    <button
                      onClick={() => handleEdit(p.id)}
                      className="bg-[#efc90d] text-white px-3 py-1 rounded-xl text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => updateProjectStatus(p.id, "accepted")}
                      className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm"
                    >
                      Accepted
                    </button>
                    <button
                      onClick={() => updateProjectStatus(p.id, "rejected")}
                      className="bg-[#48605a] text-white px-3 py-1 rounded-xl text-sm"
                    >
                      Rejected
                    </button>
                    <button
                      onClick={() => handleDeleteIdea(p.id)}
                      className="bg-[#f54d4d] text-white px-3 py-1 rounded-xl text-sm"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="flex flex-col gap-2">
                    <textarea
                      className="border rounded-xl p-2 text-sm w-full"
                      rows="2"
                      placeholder="Add Reason"
                      value={comments[p.id] || ""}
                      onChange={(e) =>
                        setComments((prev) => ({
                          ...prev,
                          [p.id]: e.target.value,
                        }))
                      }
                    />

                    <p
                      className={`${showFull ? "" : "line-clamp-2"} break-all`}
                    >
                      {p.comment}
                    </p>

                    {p.comment && p.comment.length > 100 && (
                      <button
                        onClick={toggleShow}
                        className="text-[#198805] mt-1 text-sm hover:bg-[#f5f6f5] px-4 py-1 rounded-xl bg-[#eefcec] self-center cursor-pointer"
                      >
                        {showFull ? "Less " : "More "}
                      </button>
                    )}
                    <button
                      onClick={() => saveComment(p.id)}
                      className="bg-[#198805] text-white px-4 py-1 rounded-xl text-sm self-start"
                    >
                      Save Reason
                    </button>
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
