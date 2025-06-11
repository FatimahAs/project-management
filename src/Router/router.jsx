import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "../Pages/Home";
import StudentList from "../Pages/StudentList";
import Signin from "../Pages/Signin";
import Signup from "../Pages/Signup";
import AdminDashboard from "../Pages/AdminDashboard";






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
       { path: "admin", element: <AdminDashboard /> }
    ],
  },
]);

function Router() {
  return (
    <><RouterProvider router={router}/></>
  );
}

export default Router;