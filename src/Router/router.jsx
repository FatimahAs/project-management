import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import AdminDashboard from "../Pages/Admin/AdminDashboard";
import AddTeacher from "../Pages/Admin/AddTeacher";
import AddStudent from "../Pages/Admin/AddStudent";
import EditTeacher from "../Pages/Admin/EditTeacher";
import EditStudent from "../Pages/Admin/EditStudent";
import ProjectsPage from "../Pages/Admin/ProjectsPage";
import StudentDashboard from "../Pages/Students/StudentDashboard";
import TeacherDashboard from "../Pages/Teachers/TeacherDashboard";
import Home from "../Pages/Home";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";
import StudentRoute from "./StudentRoute";
import CreateIdea from "../Pages/Students/CreateIdea";
import EditProject from "../Pages/Admin/EditProject";
import AllProjects from "../Pages/Students/AllProjects";
import EditStudentProject from "../Pages/Students/EditStudentProject";
import AllStudentProjects from "../Pages/Teachers/AllStudentProjects";
import EditTeacherProject from "../Pages/Teachers/EditTeacherProject";
import Accepted from "../Pages/Students/Accepted";
import Accept from "../Pages/Teachers/Accept";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "teacher",
        element: (
          <TeacherRoute>
            <TeacherDashboard />
          </TeacherRoute>
        ),
      },
      {
        path: "student",
        element: (
          <StudentRoute>
            <StudentDashboard />
          </StudentRoute>
        ),
      },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "addteacher", element: <AddTeacher /> },
      { path: "addstudent", element: <AddStudent /> },
      { path: "/editteacher/:id", element: <EditTeacher /> },
      { path: "/editstudent/:id", element: <EditStudent /> },
      { path: "/edit/:id", element: <EditProject /> },
      { path: "/editidea/:id", element: <EditStudentProject /> },
      { path: "/editstudentidea/:id", element: <EditTeacherProject /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "create", element: <CreateIdea /> },
      { path: "all", element: <AllProjects /> },
      { path: "accepted", element: <Accepted /> },
      { path: "accept", element: <Accept /> },
      { path: "allstudent", element: <AllStudentProjects /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
