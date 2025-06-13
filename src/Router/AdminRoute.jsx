import { Navigate } from "react-router";
import { useEffect, useState } from "react";

export default function AdminRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === "admin@admin.com" && user.password === "12345") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) return null;

  return isAdmin ? children : <Navigate to="/signin" />;
}
