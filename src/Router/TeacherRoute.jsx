import { Navigate } from "react-router";
import { useEffect, useState } from "react";

export default function TeacherRoute({ children }) {
  const [isTeacher, setIsTeacher] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === "teacher@teacher.com") {
      setIsTeacher(true);
    } else {
      setIsTeacher(false);
    }
  }, []);

  if (isTeacher === null) return null;

  return isTeacher ? children : <Navigate to="/signin" />;
}
