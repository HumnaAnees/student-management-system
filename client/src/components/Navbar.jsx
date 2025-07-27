import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Modern icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="text-2xl font-extrabold text-green-400">
            Student Feedback
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-green-300 transition">Feedback Form</Link>
            <Link to="/admin/login" className="hover:text-green-300 transition">Admin Login</Link>
            <Link to="/admin/dashboard" className="hover:text-green-300 transition">Dashboard</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block py-1 hover:text-green-300"
          >
            Feedback Form
          </Link>
          <Link
            to="/admin/login"
            onClick={() => setIsOpen(false)}
            className="block py-1 hover:text-green-300"
          >
            Admin Login
          </Link>
          <Link
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className="block py-1 hover:text-green-300"
          >
            Dashboard
          </Link>
        </div>
      )}
    </nav>
  );
}
