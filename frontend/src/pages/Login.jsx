import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5003/api/auth/login', { email, password });
      console.log(data)
      localStorage.setItem('token', data.token);
      alert('Login Successful!');
      navigate('/dashboard');
    } catch (err) {
      alert('Login Failed: ' + (err.response?.data?.message || 'Error connecting to server'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans relative">
      {/* Home Link - Styled as a floating back button */}
      <Link 
        to="/" 
        className="absolute top-6 left-6 text-gray-500 hover:text-blue-600 flex items-center gap-1 text-sm font-medium transition-colors"
      >
        ← Home
      </Link>

      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
        <h2 className="mb-6 text-2xl font-bold text-gray-800">Login</h2>

        <form onSubmit={handleLogin} className="flex flex-col">
          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded-md border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="mb-6 w-full rounded-md border border-gray-300 p-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 active:scale-95"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/Register" className="text-blue-600 font-bold hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
