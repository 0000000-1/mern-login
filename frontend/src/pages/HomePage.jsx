import { Link } from 'react-router';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-6 text-center">
      <div className="max-w-md bg-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Welcome to <span className="text-indigo-600">My App</span>
        </h1>
        
        <p className="text-gray-600 text-lg mb-8">
          A secure place for your data. Please log in to access your dashboard and personal settings.
        </p>
        
        <nav className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/login" 
            className="w-full sm:w-32 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all active:scale-95"
          >
            Login
          </Link>
          
          <Link 
            to="/register" 
            className="w-full sm:w-32 bg-white text-indigo-600 border-2 border-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all active:scale-95"
          >
            Register
          </Link>
        </nav>
      </div>
      
      <footer className="mt-8 text-gray-400 text-sm">
        © 2024 My App Inc. All rights reserved.
      </footer>
    </div>
  );
}
