'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// ĐÃ ĐỔI: Import icon Robot thay vì Messenger
import { FaRobot, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Tự động hiện lời chào sau 3 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 font-sans">
      
      {/* 1. BONG BÓNG LỜI CHÀO (Giữ nguyên) */}
      <AnimatePresence>
        {showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative bg-white p-4 rounded-2xl shadow-2xl border border-slate-100 max-w-[250px]"
          >
            <button 
                onClick={() => setShowGreeting(false)}
                className="absolute -top-2 -right-2 bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full p-1"
            >
                <FaTimes size={10} />
            </button>

            <div className="flex items-start gap-3">
                <div className="relative w-10 h-10 shrink-0 rounded-full overflow-hidden border border-slate-200">
                    <Image src="/logo.jpg" alt="Support" fill className="object-cover" />
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-900">NextGen Team</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Hi there! 👋 Ready to land your dream job at a Fortune 500 company?
                    </p>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NÚT CHAT CHÍNH (ĐÃ ĐỔI ICON) */}
      <a
        href="https://m.me/61585871531164" // Link vẫn giữ nguyên để mở Messenger
        target="_blank"
        rel="noopener noreferrer"
        // Đổi màu nền sang màu tối hơn (slate-800) để hợp với icon Robot
        className="group relative flex items-center justify-center w-16 h-16 bg-slate-800 hover:bg-slate-900 text-white rounded-full shadow-2xl transition-all hover:scale-110"
        onMouseEnter={() => setShowGreeting(true)}
      >
        {/* Hiệu ứng sóng (Đổi màu nhạt hơn theo nút) */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-slate-600 opacity-75 animate-ping"></span>
        
        {/* ĐÂY LÀ ICON ROBOT MỚI */}
        <FaRobot size={30} className="relative z-10" />
        
        {/* Chấm xanh Online */}
        <span className="absolute top-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full z-20"></span>
      </a>

    </div>
  );
}