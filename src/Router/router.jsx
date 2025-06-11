import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "../Pages/Home";
import StudentList from "../Pages/StudentList";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import AdminDashboard from "../Pages/AdminDashboard";
import AddTeacher from "../Pages/AddTeacher";
import AddStudent from "../Pages/AddStudent";
import EditTeacher from "../Pages/EditTeacher";
import EditStudent from "../Pages/EditStudent";
import ProjectsPage from "../Pages/ProjectsPage";

function Layout() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "signup", element: <Signup /> },
      { path: "signin", element: <Signin /> },
      { path: "studentlist", element: <StudentList /> },
      { path: "admin", element: <AdminDashboard /> },
      { path: "addteacher", element: <AddTeacher /> },
      { path: "addstudent", element: <AddStudent /> },
      { path: "/editteacher/:id", element: <EditTeacher /> },
      { path: "/editstudent/:id", element: <EditStudent /> },
      { path: "projects", element: <ProjectsPage /> },
    ],
  },
]);

function Router() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Router;
