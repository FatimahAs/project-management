import { Home, Users, Settings, BookOpen } from "lucide-react";

const navItems = {
  admin: [
    { label: "لوحة التحكم", icon: <Home />, href: "/admin/dashboard" },
    { label: "المستخدمين", icon: <Users />, href: "/admin/users" },
    { label: "الإعدادات", icon: <Settings />, href: "/admin/settings" },
  ],
  teacher: [
    { label: "أفكاري", icon: <BookOpen />, href: "/teacher/ideas" },
    { label: "طلابي", icon: <Users />, href: "/teacher/students" },
  ],
  student: [
    { label: "أفكاري", icon: <BookOpen />, href: "/student/ideas" },
    { label: "الملف الشخصي", icon: <Settings />, href: "/student/profile" },
  ],
};

export default function Sidebar({ userType }) {
  const items = navItems[userType] || [];

  return (
    <aside className="w-64 bg-gray-100 h-full p-4 shadow-md">
      <h2 className="text-xl font-bold mb-6">القائمة</h2>
      <ul className="space-y-4">
        {items.map((item, idx) => (
          <li key={idx}>
            <a
              href={item.href}
              className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
