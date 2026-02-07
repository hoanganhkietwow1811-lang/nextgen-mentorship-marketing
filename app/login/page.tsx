// File: app/login/page.tsx
'use client';

import { useState } from 'react';
import { handleLogin } from './actions';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const onRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* --- TABS --- */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-4 text-center font-bold transition-all ${
              activeTab === 'login' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                : 'text-gray-400 hover:text-gray-600 bg-gray-50'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`w-1/2 py-4 text-center font-bold transition-all ${
              activeTab === 'register' 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                : 'text-gray-400 hover:text-gray-600 bg-gray-50'
            }`}
          >
            Register
          </button>
        </div>

        <div className="p-8">
          {/* === LOGIN FORM === */}
          {activeTab === 'login' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800">Welcome Back</h3>
                <p className="text-sm text-gray-500 mt-2">Please enter your details to sign in.</p>
              </div>

              <form action={handleLogin} className="flex flex-col gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                  <input name="email" type="email" placeholder="name@example.com" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                  <input name="password" type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30">
                  Sign In
                </button>
              </form>
            </div>
          )}

          {/* === REGISTER FORM === */}
          {activeTab === 'register' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {registerSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
                  <h3 className="text-xl font-bold text-gray-800">Account Created!</h3>
                  <p className="text-gray-500 mt-2 text-sm">You can now sign in with your new account.</p>
                  <button onClick={() => setActiveTab('login')} className="mt-6 text-blue-600 font-bold hover:underline">Go to Login</button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
                    <p className="text-sm text-gray-500 mt-2">Join us and start your journey.</p>
                  </div>

                  <form onSubmit={onRegisterSubmit} className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                      <input required type="text" placeholder="johndoe123" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                      <input required type="email" placeholder="name@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                      <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all mt-2">
                      Create Account
                    </button>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}