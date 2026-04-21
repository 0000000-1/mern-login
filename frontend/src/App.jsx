import { Routes, Route } from "react-router"; // or react-router-dom
import Home from './pages/HomePage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/Register" element={<Register />} />
    </Routes>
  );
}

// MAKE SURE THIS LINE IS HERE:
export default App; 
