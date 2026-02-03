import Image from "next/image";
import Link from "next/link";
import { auth, signOut } from "@/auth"; 
import { 
  FaArrowRight, FaCheckCircle, FaStar, FaUsers, FaBriefcase, FaSignOutAlt, 
  FaFacebookMessenger, FaInstagram, FaLinkedinIn, FaYoutube 
} from "react-icons/fa";
import * as motion from "framer-motion/client";

// IMPORT CÁC COMPONENT ĐÃ TẠO
import Roadmap from "@/components/Roadmap";
import BrandLogos from "@/components/BrandLogos";
import IndustryTracks from "@/components/IndustryTracks";
import ChatWidget from "@/components/ChatWidget";
import GoogleTranslate from "@/components/GoogleTranslate";
import RegistrationForm from "@/components/RegistrationForm"; // <--- FORM ĐĂNG KÝ MỚI

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen bg-white font-sans text-slate-800">
      
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
             <div className="relative w-10 h-10 overflow-hidden rounded-full border border-slate-200">
                <Image src="/logo.jpg" alt="NextGen Logo" fill className="object-cover" />
             </div>
             <span className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-blue-600 transition">
                NextGen <span className="text-blue-600">Mentorship</span>
             </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-medium text-slate-600">
             <Link href="/" className="hover:text-blue-600 transition">Home</Link>
             <Link href="/blog" className="hover:text-blue-600 transition">Blog & News</Link>
             <Link href="#roadmap" className="hover:text-blue-600 transition">Roadmap</Link>
             <Link href="#register" className="hover:text-blue-600 transition">Apply Now</Link>
          </nav>

          <div className="flex items-center gap-4">
             {session ? (
                 <div className="flex items-center gap-3">
                    <span className="hidden md:block text-sm font-semibold text-slate-700">
                        Hi, {session.user?.name}
                    </span>
                    <form action={async () => {
                        'use server';
                        await signOut();
                    }}>
                        <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-500 border border-red-100 bg-red-50 rounded-full hover:bg-red-100 transition">
                            <FaSignOutAlt /> Logout
                        </button>
                    </form>
                 </div>
             ) : (
                 <Link href="/api/auth/signin" className="px-5 py-2 text-sm font-bold text-white bg-slate-900 rounded-full hover:bg-slate-800 transition shadow-lg hover:shadow-xl">
                    Sign In
                 </Link>
             )}
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION (NỀN TRẮNG) */}
      <section className="relative bg-white text-slate-900 py-24 px-6 overflow-hidden border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center relative z-10 pt-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
              <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-widest uppercase">
                 🚀 Over 3 Years of Excellence
              </div>
              
              <h1 className="text-4xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-slate-900">
                Dominate the U.S. Job Market <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x">
                   with Fortune 500 Mentors
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                Led by <strong className="text-blue-600">Top-Tier Mentors</strong> and experts from industry-leading firms. 
                We have guided <strong className="text-blue-600"> 150+ Mentees</strong> across Tech, Finance & Business 
                to secure their dream offers in the United States.
              </p>

              <div className="flex flex-col md:flex-row gap-5 justify-center">
                <Link href="#roadmap" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2 transform hover:-translate-y-1">
                  View 10-Step Roadmap <FaArrowRight />
                </Link>
                <Link href="#register" className="px-8 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-full transition border border-slate-200">
                  Join Mentorship
                </Link>
              </div>
          </motion.div>
        </div>
      </section>

      {/* 3. BRAND LOGOS (ĐÃ CHỈNH NỀN TRẮNG) */}
      <BrandLogos />

      {/* 4. INDUSTRY TRACKS */}
      <IndustryTracks />

      {/* 5. STATS SECTION */}
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-200">
                {[
                    { number: "150+", label: "Mentees Mentored", icon: FaUsers, color: "text-blue-600" },
                    { number: "95%", label: "Success Rate", icon: FaCheckCircle, color: "text-green-600" },
                    { number: "$120k", label: "Avg. Starting Salary", icon: FaBriefcase, color: "text-purple-600" },
                    { number: "50+", label: "Fortune 500 Partners", icon: FaStar, color: "text-yellow-500" },
                ].map((stat, idx) => (
                    <div key={idx} className="p-4">
                        <stat.icon className={`text-4xl mx-auto mb-4 ${stat.color}`} />
                        <h3 className="text-4xl font-extrabold text-slate-900">{stat.number}</h3>
                        <p className="text-xs text-slate-500 font-bold mt-2 uppercase tracking-wide">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 6. ROADMAP */}
      <div id="roadmap">
        <Roadmap />
      </div>

      {/* 7. FORM ĐĂNG KÝ (MỚI THÊM) */}
      {/* Nằm ngay trên Footer để thuận tiện cho việc kêu gọi hành động (CTA) */}
      <RegistrationForm />

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
            
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto mb-12"
            >
                <h2 className="text-3xl font-bold text-white mb-4">Ready to launch your career?</h2>
                <p className="mb-8">Join the community of high-achievers today.</p>
                <Link href="#register" className="px-8 py-3 bg-white text-slate-900 font-bold rounded-full hover:bg-slate-200 transition">
                    Get Started Now
                </Link>
            </motion.div>
            
            {/* SOCIAL ICONS */}
            <div className="flex justify-center gap-6 mb-8">
                <a 
                    href="https://m.me/61585871531164" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-500/30"
                >
                    <FaFacebookMessenger size={22} />
                </a>
                <a 
                    href="https://www.instagram.com/nextgen.mentorship_jobapp/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white rounded-full hover:brightness-110 transition-all transform hover:-translate-y-1 shadow-lg shadow-pink-500/30"
                >
                    <FaInstagram size={22} />
                </a>
                <a 
                    href="https://linkedin.com/company/nextgen-mentorship" 
                    target="_blank" 
                    className="p-3 bg-[#0077b5] text-white rounded-full hover:brightness-110 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/30"
                >
                    <FaLinkedinIn size={22} />
                </a>
                <a 
                    href="https://youtube.com/@nextgenmentorship" 
                    target="_blank" 
                    className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-red-600/30"
                >
                    <FaYoutube size={22} />
                </a>
            </div>

            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>&copy; 2026 NextGen Mentorship. All rights reserved.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition">Terms of Service</a>
                    <a href="#" className="hover:text-white transition">Contact</a>
                </div>
            </div>
        </div>
      </footer>

      {/* 9. WIDGETS TIỆN ÍCH */}
      <ChatWidget />      {/* Chatbot Robot ở góc phải */}
      <GoogleTranslate /> {/* Nút Dịch ở góc trái */}
    </div>
  );
}