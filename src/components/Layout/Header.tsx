import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { BookOpen, LogOut, User as UserIcon } from 'lucide-react';

export const Header = () => {
  const { user, logout } = useAuthStore();

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">E-Notes</span>
          </Link>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/notes"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  My Notes
                </Link>
                <Link
                  to="/subscription"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Subscription
                </Link>
                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
                    <UserIcon className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={logout}
                    className="text-gray-700 hover:text-indigo-600"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};