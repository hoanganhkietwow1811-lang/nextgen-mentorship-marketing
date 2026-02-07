// File: app/login/page.tsx
'use client';

import { useState } from 'react';
import { handleLogin } from './actions';

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setRegisterSuccess(true);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        
        {/* --- HEADER IMAGE / BRAND --- */}
        <div className="bg-slate-900 p-8 text-center text-white bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center relative">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px]"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold tracking-tight">NextGen Mentorship</h1>
            <p className="text-slate-300 text-sm mt-2">Connect, Learn, and Grow together.</p>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex p-2 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
              activeTab === 'login' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-200 ${
              activeTab === 'register' 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* --- CONTENT AREA --- */}
        <div className="p-8">
          
          {/* === LOGIN FORM === */}
          {activeTab === 'login' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Welcome Back</h2>
                <p className="text-slate-500 text-sm">Please enter your details to continue.</p>
              </div>

              <form action={handleLogin} className="space-y-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" /></svg>
                  </div>
                  <input name="email" type="email" placeholder="Email Address" required className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700" />
                </div>

                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input name="password" type="password" placeholder="Password" className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all font-medium text-slate-700" />
                </div>

                <div className="flex items-center justify-end">
                  <a href="#" className="text-xs font-bold text-indigo-600 hover:text-indigo-500 hover:underline">Forgot Password?</a>
                </div>

                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl shadow-lg shadow-slate-300 hover:bg-slate-800 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                  Sign In
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
              </form>
            </div>
          )}

          {/* === REGISTER FORM === */}
          {activeTab === 'register' && (
            <div className="animate-in fade-in zoom-in-95 duration-300">
              {registerSuccess ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">Account Created!</h3>
                  <p className="text-slate-500 mb-6">Your account has been successfully created. You can now log in.</p>
                  <button onClick={() => setActiveTab('login')} className="px-8 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all">Go to Sign In</button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800">Create Account</h2>
                    <p className="text-slate-500 text-sm">Join our community today.</p>
                  </div>

                  <form onSubmit={onRegisterSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input required type="text" placeholder="First Name" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm font-medium" />
                      <input required type="text" placeholder="Last Name" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm font-medium" />
                    </div>
                    
                    <input required type="text" placeholder="Username" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm font-medium" />
                    <input required type="email" placeholder="Email Address" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm font-medium" />
                    <input required type="password" placeholder="Password" className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all text-sm font-medium" />

                    <button disabled={isLoading} type="submit" className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2">
                      {isLoading ? 'Creating...' : 'Sign Up Now'}
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