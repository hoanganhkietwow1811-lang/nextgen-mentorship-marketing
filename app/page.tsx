import Link from 'next/link';
import { auth, signOut } from "@/auth"; // Import auth lấy thông tin, signOut để đăng xuất
import { FaFacebook, FaInstagram, FaSignInAlt, FaRobot, FaArrowRight, FaCheckCircle, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

export default async function Home() {
  // Lấy thông tin người dùng đang đăng nhập
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      
      {/* --- THANH MENU (NAVIGATION) --- */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-4 bg-white shadow-md sticky top-0 z-50">
        <div className="text-2xl font-extrabold text-blue-900 tracking-tighter">
          NEXTGEN<span className="text-yellow-500">.</span>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/blog" className="hidden md:block hover:text-blue-600 font-medium transition">
            Blog Chia Sẻ
          </Link>
          
          {/* Social Icons */}
          <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
            <a href="https://www.facebook.com/profile.php?id=61585871531164" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:scale-110 transition"><FaFacebook /></a>
            <a href="https://www.instagram.com/nextgen.mentorship_jobapp/" target="_blank" rel="noopener noreferrer" className="text-pink-600 text-2xl hover:scale-110 transition"><FaInstagram /></a>
          </div>

          {/* --- KHU VỰC ĐĂNG NHẬP / ĐĂNG XUẤT --- */}
          {session ? (
            // Nếu ĐÃ ĐĂNG NHẬP thì hiện tên + nút Logout
            <div className="flex items-center gap-4 ml-4">
              <div className="flex items-center gap-2 text-blue-900 font-bold bg-blue-50 px-4 py-2 rounded-full">
                <FaUserCircle size={20}/>
                <span>Hi, {session.user?.name || "Mentor"}</span>
              </div>
              
              <form action={async () => {
                "use server"
                await signOut()
              }}>
                <button type="submit" className="text-gray-500 hover:text-red-600 font-medium transition text-sm flex items-center gap-1">
                  <FaSignOutAlt /> Logout
                </button>
              </form>
            </div>
          ) : (
            // Nếu CHƯA ĐĂNG NHẬP thì hiện nút Login
            <Link href="/api/auth/signin" className="flex items-center gap-2 px-5 py-2 bg-blue-900 text-white rounded-full font-bold hover:bg-blue-800 transition shadow-lg">
              <FaSignInAlt /> <span>Login</span>
            </Link>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white py-24 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 mb-6 border border-blue-400 rounded-full bg-blue-900/50 text-blue-200 text-sm font-semibold tracking-wide uppercase">
             Mentorship Program 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Compete Smarter. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              Outperform the Job Market.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-2xl mx-auto font-light">
            Được dẫn dắt trực tiếp bởi các Mentor đến từ <span className="font-bold text-white">Fortune 500</span> (Tech, Finance, Business).
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-yellow-500 text-blue-900 font-bold rounded-full text-lg hover:bg-yellow-400 transition shadow-xl flex items-center justify-center gap-2">
              Đăng ký Mentee <FaArrowRight />
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-blue-900 transition">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </header>

      {/* --- STATS SECTION --- */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          <div className="text-center p-4">
            <h3 className="text-5xl font-extrabold text-blue-900 mb-2">150+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Mentee đã được dẫn dắt</p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-5xl font-extrabold text-green-500 mb-2">75%</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Success Rate (Tổng quan)</p>
          </div>
          <div className="text-center p-4">
            <h3 className="text-5xl font-extrabold text-purple-600 mb-2">85%+</h3>
            <p className="text-gray-500 font-medium uppercase tracking-wide text-sm">Success Rate (Internship)</p>
          </div>
        </div>
      </section>

      {/* --- CÁC NGÀNH ĐÀO TẠO --- */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lĩnh Vực Chuyên Môn</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Chương trình tập trung vào 3 trụ cột chính với lộ trình được cá nhân hóa.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-green-500">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-2xl mb-6">$</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Finance</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 size-4"/> Investment Banking</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-green-500 size-4"/> Corporate Finance</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-blue-500">
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-2xl mb-6">&lt;/&gt;</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Tech</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500 size-4"/> Software Engineering</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-blue-500 size-4"/> Data Science & AI</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 border-t-4 border-purple-500">
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl mb-6">B</div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Business</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500 size-4"/> Management Consulting</li>
                <li className="flex items-center gap-2"><FaCheckCircle className="text-purple-500 size-4"/> Business Analyst</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER & CHATBOT --- */}
      <footer className="bg-gray-900 text-gray-400 py-12 text-center">
        <p>&copy; 2026 NextGen Mentorship. All rights reserved.</p>
      </footer>

      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <button className="flex items-center gap-3 bg-blue-600 text-white px-6 py-4 rounded-full shadow-2xl hover:bg-blue-700 transition transform hover:scale-105">
          <FaRobot className="text-2xl" />
          <div className="text-left">
            <p className="text-xs font-light text-blue-200">Bạn cần hỗ trợ?</p>
            <p className="font-bold text-sm">Chat với Mentor</p>
          </div>
        </button>
      </div>
    </div>
  );
}