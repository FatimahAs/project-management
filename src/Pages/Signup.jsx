import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const USERS_API = "https://683ffc315b39a8039a565e4a.mockapi.io/users";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      return Swal.fire("Error", "جميع الحقول مطلوبة", "error");
    }

    if (name.length < 6) {
      return Swal.fire("Error", "يجب أن يكون الاسم أكثر من 6 حروف", "error");
    }

    if (!email.includes("tuwaiq")) {
      return Swal.fire("Error", "يجب أن يحتوي البريد على كلمة tuwaiq", "error");
    }

    if (password.length < 8) {
      return Swal.fire(
        "Error",
        "يجب أن تكون كلمة المرور أكثر من 8 حروف",
        "error"
      );
    }

    try {
      await axios.post(USERS_API, {
        name,
        email,
        password,
        role: "student",
        teacherId: "",
        teamMembers: [],
      });

      Swal.fire({
        icon: "success",
        title: "تم التسجيل بنجاح!",
        text: "سيتم تحويلك إلى صفحة تسجيل الدخول",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/signin"), 2000);
    } catch {
      Swal.fire("Error", "حدث خطأ أثناء التسجيل", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#094067] mb-6 text-center">
          Create Student Account
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent"
            />
          </div>

          <button
            onClick={handleRegister}
            className="w-full bg-[#3da9fc] hover:bg-[#3da9fc7a] text-[#fffffe] font-medium py-2.5 rounded-lg transition-colors"
          >
            SIGN UP
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to="/signin"
            className="text-[#3da9fc] hover:text-[#3da9fc7a] font-medium ml-1"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
