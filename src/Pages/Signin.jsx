import { useState } from "react";
import { Link } from "react-router";

export default function Signin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const res = await fetch(`https://683ffc315b39a8039a565e4a.mockapi.io/users?username=${username}`);
    const users = await res.json();
    const user = users.find(u => u.password === password);
    if (user) onLogin(user);
    else alert("بيانات الدخول غير صحيحة");
  };

  return (
<>   
  <div className="min-h-screen flex items-center justify-center p-4">
	<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
		<h2 className="text-2xl font-bold text-[#094067] mb-6 text-center">Sign In</h2>
		<div className="space-y-4">
		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
		    <input
            value={username}
            type="text"
            onChange={e => setUsername(e.target.value)}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent"
          />
		</div>

		<div>
			<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
			  <input
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            className="w-full border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent"
          />
		</div>

	

		<button onClick={handleLogin} type="submit" className="w-full  bg-[#3da9fc]   hover:bg-[#3da9fc7a] text-[#fffffe] font-medium py-2.5 rounded-lg transition-colors">
			SIGN IN
		</button>
		</div>

		<div className="mt-6 text-center text-sm text-gray-600">
		Don't have an account? 
		<Link to="/signup" className="text-[#3da9fc] hover:text-[#3da9fc7a] font-medium">Sign up</Link>
		</div>
	</div>
	</div>

      </>
  );
}
