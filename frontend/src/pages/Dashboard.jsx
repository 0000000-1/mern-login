import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // 1. If no token, redirect to login immediately
    if (!token) {
      navigate('/login');
      return;
    }

    // 2. Fetch protected data using the token
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('http://localhost:5003/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(data);
      } catch (err) {
        // If token is invalid or expired, clear it and redirect
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex justify-between items-center border-b pb-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>

        {user ? (
          <div className="space-y-2">
            <h3 className="text-xl text-gray-700">
              Welcome back, <span className="font-bold text-indigo-600">{user.name}</span>!
            </h3>
            <p className="text-gray-500 text-sm">Account Email: {user.email}</p>
            
            <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-indigo-700 font-medium">Your protected content goes here.</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="ml-3 text-gray-500">Loading profile...</p>
          </div>
        )}
      </div>
    </div>
  );
}
