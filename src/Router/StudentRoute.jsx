import { Navigate } from "react-router";

const StudentRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !user.email.includes("@tuwaiq")) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default StudentRoute;
