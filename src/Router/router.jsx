import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import AdminDashboard from "../Pages/AdminDashboard";
import AddTeacher from "../Pages/AddTeacher";
import AddStudent from "../Pages/AddStudent";
import EditTeacher from "../Pages/EditTeacher";
import EditStudent from "../Pages/EditStudent";
import ProjectsPage from "../Pages/ProjectsPage";
import StudentPage from "../Pages/Students/StudentPage";
import StudentDashboard from "../Pages/Students/StudentDashboard";
import TeacherDashboard from "../Pages/Teachers/TeacherDashboard";
import Home from "../Pages/Home";
import AdminRoute from "./AdminRoute";
import TeacherRoute from "./TeacherRoute";

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

      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "addteacher", element: <AddTeacher /> },
      { path: "addstudent", element: <AddStudent /> },
      { path: "/editteacher/:id", element: <EditTeacher /> },
      { path: "/editstudent/:id", element: <EditStudent /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "studentpage", element: <StudentPage /> },
      { path: "student", element: <StudentDashboard /> },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
