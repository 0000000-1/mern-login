import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      return alert("Password must be at least 6 characters");
    }

    setLoading(true);
    try {
      // Sends data to your backend
      await axios.post('https://mern-login-theta.vercel.app/api/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gray-50 px-8 py-4 font-sans flex items-center justify-center relative">
    {/* Home Link - Positioned absolutely so it doesn't push the card down */}
    <Link 
      to="/" 
      className="absolute top-8 left-8 text-gray-500 hover:text-indigo-600 flex items-center gap-1 text-sm font-medium transition-colors"
    >
      ← Home
    </Link>

    {/* Main Card */}
    <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-sm text-center border border-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">Create Account</h2>
      
      <form onSubmit={handleRegister} className="flex flex-col">
        <input 
          type="text" placeholder="Full Name" required
          className="w-full p-3 my-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />
        <input 
          type="email" placeholder="Email Address" required
          className="w-full p-3 my-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
        />
        <input 
          type="password" placeholder="Password" required
          className="w-full p-3 my-2 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
        />
        
        <button 
          type="submit" 
          disabled={loading}
          className={`w-full p-3 mt-5 rounded-lg font-bold text-white transition-all shadow-md ${
            loading 
              ? 'bg-indigo-300 cursor-not-allowed' 
              : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
          }`}
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <p className="mt-6 text-sm text-gray-600">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-600 font-bold hover:underline">
          Login here
        </Link>
      </p>
    </div>
  </div>
);

}
