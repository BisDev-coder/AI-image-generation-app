import React, { useState } from 'react';
import { Eye, EyeOff, Sparkles } from 'lucide-react';
import { useAuth } from '../Context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const data = await login(email, password);

        if (!data.success) {
          setError(data.message || 'Login failed');
        }

        return;
      }

      const data = await register(name, email, password);

      if (!data.success) {
        setError(data.message || 'Registration failed');
        return;
      }

      alert(
        `Registration successful!\n\nName: ${data.user.name}\nEmail: ${data.user.email}`
      );

      setName('');
      setEmail('');
      setPassword('');
      // setIsLogin(true);
      //       The setIsLogin(true) must be removed.
      // After registration:
      // Register → success alert → user is logged in → VisionForge opens
    } catch (error) {
      console.error('Auth error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    if (loading) return;

    setIsLogin(!isLogin);
    setError('');
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050b14] px-4 py-10 text-white">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Auth Card */}
      <div className="relative w-full max-w-md">

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">

          {/* Logo */}
          <div className="mb-8 flex flex-col items-center">

            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg shadow-emerald-500/10">
              <Sparkles className="h-6 w-6 text-black" />
            </div>

            <h1 className="text-2xl font-semibold tracking-tight">
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h1>

            <p className="mt-2 text-center text-sm text-gray-500">
              {isLogin
                ? 'Login to continue creating with VisionForge'
                : 'Start creating AI images with VisionForge'}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            {!isLogin && (
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  disabled={loading}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400/50 focus:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                required
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400/50 focus:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                  required
                  minLength={6}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 pr-11 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-emerald-400/50 focus:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 py-3 text-sm font-semibold text-black transition hover:from-emerald-300 hover:to-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? isLogin
                  ? 'Logging in...'
                  : 'Creating Account...'
                : isLogin
                  ? 'Login'
                  : 'Create Account'}
            </button>
          </form>

          {/* Switch */}
          <div className="mt-6 border-t border-white/10 pt-6 text-center text-sm text-gray-500">
            {isLogin
              ? "Don't have an account?"
              : 'Already have an account?'}{' '}

            <button
              type="button"
              disabled={loading}
              onClick={switchMode}
              className="font-medium text-emerald-400 transition hover:text-emerald-300 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLogin ? 'Create one' : 'Login'}
            </button>
          </div>

        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs text-gray-600">
          AI image generation powered by Hugging Face
        </p>

      </div>
    </div>
  );
};

export default Auth;

