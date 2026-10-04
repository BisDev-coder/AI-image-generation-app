import React from 'react';
import { LogIn, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#050b14]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/10">
            <Sparkles className="h-5 w-5 text-black" />
          </div>

          <div className="leading-tight">
            <h1 className="text-lg font-semibold tracking-tight text-white">
              VisionForge
            </h1>

            <p className="hidden text-xs text-gray-500 sm:block">
              AI Image Studio
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">



          {user ? (
            <>
              {/* User */}
              <div className="hidden items-center gap-2 md:flex">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-400/10 text-sm font-medium text-emerald-400">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="max-w-32 truncate text-sm text-gray-300">
                 Hello {user.name}
                </span>
              </div>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-gray-300 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400/30"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            /* Login */
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-400/30"
            >
              <LogIn className="h-4 w-4" />
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

