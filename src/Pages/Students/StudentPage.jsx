import React, { useState, useEffect } from "react";
import { Button } from "/src/components/ui/button";
import { Input } from "/src/components/ui/input";
import { Card, CardContent } from "/src/components/ui/card";
import axios from "axios";
import { useNavigate } from "react-router";

const USERS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/users";
const PROJECTS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/projects";

export default function StudentPage() {
  const [user, setUser] = useState(null);
  const [idea, setIdea] = useState("");
  const [approvedIdeas, setApprovedIdeas] = useState([]);
  const [myIdeas, setMyIdeas] = useState([]);
  const [teacher, setTeacher] = useState(null);
  const [team, setTeam] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      navigate("/signin");
      return;
    }
    setUser(savedUser);
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`${PROJECTS_API}?status=accepted`)
        .then((res) => setApprovedIdeas(res.data));
      axios
        .get(`${PROJECTS_API}?userId=${user.id}`)
        .then((res) => setMyIdeas(res.data));
      axios
        .get(`${USERS_API}/${user.teacherId}`)
        .then((res) => setTeacher(res.data));
      axios
        .get(`${USERS_API}?teamId=${user.teamId}`)
        .then((res) => setTeam(res.data.filter((u) => u.id !== user.id)));
    }
  }, [user]);

  const handleAddIdea = async () => {
    if (!idea) return;
    const res = await axios.post(PROJECTS_API, {
      userId: user.id,
      idea,
      status: "pending",
    });
    setMyIdeas((prev) => [...prev, res.data]);
    setIdea("");
  };

  if (!user) return null;

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">مرحبا {user.email}</h1>
        <Button
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/signin");
          }}
          className="bg-red-600 text-white"
        >
          تسجيل الخروج
        </Button>
      </div>

      <div>
        <h2 className="text-xl font-semibold">الأفكار المعتمدة</h2>
        <div className="grid gap-2">
          {approvedIdeas.map((idea) => (
            <Card key={idea.id}>
              <CardContent>{idea.idea}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold">أفكاري</h2>
        <div className="grid gap-2">
          {myIdeas.map((idea) => (
            <Card key={idea.id}>
              <CardContent>
                {idea.idea} - الحالة: {idea.status}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex mt-2 gap-2">
          <Input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="أضف فكرة جديدة"
          />
          <Button onClick={handleAddIdea}>إرسال</Button>
        </div>
      </div>

      {teacher && (
        <div>
          <h2 className="text-xl font-semibold">المعلم المسؤول</h2>
          <Card>
            <CardContent>
              {teacher.name} - {teacher.email}
            </CardContent>
          </Card>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold">فريق العمل</h2>
        <div className="grid gap-2">
          {team.map((member) => (
            <Card key={member.id}>
              <CardContent>
                {member.name} - {member.email}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
