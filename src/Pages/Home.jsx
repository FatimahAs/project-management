import { useState } from "react";
import Signin from "./Signin";
import StudentList from "./StudentList";
import AdminDashboard from "./AdminDashboard";

function Home() {
  const [user, setUser] = useState(null);

  if (!user) return <Signin onLogin={setUser} />;

  return user.role === "admin" ? (
    <AdminDashboard user={user} />
  ) : (
    <StudentList user={user} />
  );
}

export default Home;
