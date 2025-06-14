import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

import StudentNav from "../../components/Student/StudentNav";
import StudentSideBar from "../../components/Student/StudentSideBar";
const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";

export default function EditStudentProject() {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [comment, setComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title || "");
        setDescription(data.description || "");
        setComment(data.comment || "");
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      return Swal.fire({
        icon: "warning",
        title: "Add Deatails",
        confirmButtonText: "Ok",
      });
    }

    try {
      const response = await fetch(
        `https://683ffc315b39a8039a565e4a.mockapi.io/projects/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title,
            description,
            comment,
          }),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Idea updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        setTimeout(() => {
          navigate("/all");
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "An error occurred during update",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to connect to the server",
        text: error.message,
        confirmButtonText: "Ok",
      });
    }
  };

  const fetchData = () => {
    if (!user) return;

    axios.get(`${PROJECTS_API}?userId=${user.id}`).then((res) => {
      setProjects(res.data);
    });
  };
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchData();
    }
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <StudentSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col">
        <StudentNav sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="p-6 overflow-auto">
          <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4"> Edit Idea</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder=" Title"
                className="w-full border px-4 py-2 rounded-xl"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Edit description"
                className="w-full border px-4 py-2 rounded-xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder=" Comment"
                className="w-full border px-4 py-2 rounded-xl overflow-hidden text-ellipsis whitespace-nowrap"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button
                type="submit"
                className="w-full bg-yellow-500 text-white px-4 py-2 rounded-xl cursor-pointer"
              >
                Save Edit{" "}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
