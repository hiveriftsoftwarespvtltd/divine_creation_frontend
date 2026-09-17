import React, { useState } from 'react';
import logo from '../../assets/logo.png';
import { api } from '../../utils/api';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.auth.login(email.trim(), password);
      sessionStorage.setItem('adminToken', response.access_token);
      onLoginSuccess();
    } catch (err) {
      setError(err.message || 'Invalid email/username or password.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070919] flex items-center justify-center px-4 relative overflow-hidden .">
      {/* Decorative Mandala Background Overlays */}
      <div className="absolute left-0 bottom-0 w-96 h-96 opacity-5 pointer-events-none mix-blend-screen overflow-hidden">
        <svg className="w-full h-full text-[#cca040]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="30" />
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(deg => (
            <line key={deg} x1="10" y1="50" x2="90" y2="50" transform={`rotate(${deg} 50 50)`} />
          ))}
        </svg>
      </div>

      <div className="absolute right-0 top-0 w-96 h-96 opacity-5 pointer-events-none mix-blend-screen overflow-hidden">
        <svg className="w-full h-full text-[#cca040]" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="30" />
          {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(deg => (
            <line key={deg} x1="10" y1="50" x2="90" y2="50" transform={`rotate(${deg} 50 50)`} />
          ))}
        </svg>
      </div>

      {/* Main Login Card */}
      <div className="bg-[#0b0e26] border border-slate-800/80 rounded-2xl p-8 sm:p-10 w-full max-w-md shadow-2xl relative z-10 space-y-8">

        {/* Brand Header */}
        <div className="text-center space-y-4">
          <img
            src={logo}
            alt="Divine Creations Logo"
            className="h-20 w-auto object-contain mx-auto filter brightness-110"
          />
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#cca040]">Admin Control Panel</h2>
            <p className="text-xs text-slate-400 mt-1 font-sans uppercase tracking-wider">
              Management Portal Login
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Email/Username Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Email / Username
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin"
              className="w-full bg-[#0d1232] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040] transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0d1232] border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-200 focus:outline-none focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#cca040] cursor-pointer"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L5.636 5.636m-1.22 1.22L18.364 19.5M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Secure Log In</span>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h16.5a1.5 1.5 0 001.5-1.5V12a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 12v8.25a1.5 1.5 0 001.5 1.5z" />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* Footer Hint */}
        <div className="text-center">
          <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
            Protected Area. Unauthorized access is recorded.
          </p>
        </div>

      </div>
    </div>
  );
}
