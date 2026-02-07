// File: app/login/page.tsx
'use client';

import { useState } from 'react';
import { handleLogin } from './actions'; // Import hàm từ file actions.ts vừa tạo bên cạnh

export default function LoginPage() {
  // State để chuyển Tab
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // State thông báo đăng ký thành công
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Xử lý khi bấm nút Đăng ký (Giả lập)
  const onRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Sau này bạn gọi API đăng ký thật ở đây
    setRegisterSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        
        {/* --- 1. THANH MENU TAB --- */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-4 text-center font-bold text-lg transition-colors ${
              activeTab === 'login' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`w-1/2 py-4 text-center font-bold text-lg transition-colors ${
              activeTab === 'register' 
                ? 'bg-white text-blue-600 border-b-2 border-blue-600' 
                : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {/* --- 2. NỘI DUNG FORM --- */}
        <div className="p-8">
          
          {/* === FORM ĐĂNG NHẬP (ADMIN) === */}
          {activeTab === 'login' && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Chào mừng trở lại</h3>
                <p className="text-sm text-gray-500">Đăng nhập quyền Admin/Mentor</p>
              </div>

              <form action={handleLogin} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                  <input name="email" type="email" placeholder="adminvip@gmail.com" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                  <input name="password" type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <button type="submit" className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all mt-2">
                  Đăng nhập
                </button>
              </form>
            </div>
          )}

          {/* === FORM ĐĂNG KÝ (USER MỚI) === */}
          {activeTab === 'register' && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              {registerSuccess ? (
                <div className="text-center py-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">✓</div>
                  <h3 className="text-xl font-bold text-gray-800">Đăng ký thành công!</h3>
                  <button onClick={() => setActiveTab('login')} className="mt-4 text-blue-600 font-bold hover:underline">Qua trang Đăng nhập ngay</button>
                </div>
              ) : (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">Tạo tài khoản mới</h3>
                    <p className="text-sm text-gray-500">Nhập thông tin cá nhân của bạn</p>
                  </div>

                  <form onSubmit={onRegisterSubmit} className="flex flex-col gap-4">
                    {/* Họ và tên */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Họ và tên</label>
                      <input required type="text" placeholder="Nguyễn Văn A" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    {/* Tên người dùng (Username) */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Tên người dùng</label>
                      <input required type="text" placeholder="nguyenvana123" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                      <input required type="email" placeholder="email@example.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    {/* Mật khẩu */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Mật khẩu</label>
                      <input required type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>

                    <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all mt-2">
                      Đăng ký tài khoản
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