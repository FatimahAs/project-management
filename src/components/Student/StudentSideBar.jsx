import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { House, Lightbulb, LogOut, User, Check } from "lucide-react";

export default function StudentSideBar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("user");
        navigate("/signin");

        Swal.fire(
          "Logged out!",
          "You have been successfully logged out.",
          "success"
        );
      }
    });
  };

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 z-30 rounded-tr-xl rounded-br-xl w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:inset-auto`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="inline-flex items-center gap-3 mb-8">
            <User color="#076452" />
            <h2 className="text-2xl font-bold text-[#076452]"> Student</h2>
          </div>
          <hr className="h-[2px] bg-gray-300 shadow-sm my-4 rounded-full " />
          <nav className="flex flex-col gap-4 text-gray-700 flex-grow">
            <Link
              to="/student"
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              <button>
                <div className="inline-flex items-center gap-3">
                  <House color="#030303" size={"16px"} />
                  <h3>Home</h3>
                </div>
              </button>
            </Link>
            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />
            <Link
              to="/accepted"
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              <div className="inline-flex items-center gap-3">
                <Check color="#1c7c09" size={"16px"} />
                <h3>Accepted Idea</h3>
              </div>
            </Link>

            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />
            <Link
              to="/create"
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              <div className="inline-flex items-center gap-3">
                <Lightbulb color="#030303" size={"16px"} />
                <h3>Create Idea</h3>
              </div>
            </Link>
            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />
            <Link
              to="/all"
              className="text-left px-3 py-2 rounded hover:bg-gray-200"
            >
              <div className="inline-flex items-center gap-3">
                <Lightbulb color="#030303" size={"16px"} />
                <h3>All Idea</h3>
              </div>
            </Link>
            <hr className="h-[1px] bg-gray-300 shadow-sm my-4" />

            <div className="inline-flex items-center gap-3 text-left px-3 py-2 rounded hover:bg-red-200 text-red-600">
              <LogOut color="#e53e3e" size={"16px"} />
              <button onClick={handleLogout}>Sign out</button>
            </div>
          </nav>
          <div className="mt-auto text-xs text-gray-400">
            © 2025 Management Idea
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
}
