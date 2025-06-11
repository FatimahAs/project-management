import { useState } from "react";
import { Link } from "react-router";

export default function Signup() {
	const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  return (
<>   
  <div className="min-h-screen flex items-center justify-center p-4">
	<div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
		<h2 className="text-2xl font-bold text-[#094067] mb-6 text-center">Create Student Account</h2>
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
			<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
		    <input
            value={email}
            type="email"
            onChange={e => setEmail(e.target.value)}
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

	

		<button  type="submit" className="w-full  bg-[#3da9fc]   hover:bg-[#3da9fc7a] text-[#fffffe] font-medium py-2.5 rounded-lg transition-colors">
			SIGN UP
		</button>
		</div>

		<div className="mt-6 text-center text-sm text-gray-600">
		Already have an account? 
		<Link to="/signin" className="text-[#3da9fc] hover:text-[#3da9fc7a] font-medium">Sign In</Link>
		</div>
	</div>
	</div>

      </>
  );
}
