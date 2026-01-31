'use client'

import { useEffect, useState } from 'react';
import { FaGlobeAmericas, FaCheck } from 'react-icons/fa';

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

export default function GoogleTranslate() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');

  useEffect(() => {
    // --- 1. HÀM XÓA COOKIE MẠNH TAY ---
    const clearGoogleCookies = () => {
        const cookies = document.cookie.split(";");
        const domain = document.domain;
        const domainParts = domain.split('.');
        
        // Xóa cookie trên domain hiện tại và các sub-domain (ví dụ .vercel.app)
        cookies.forEach(cookie => {
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
            
            if (name.includes("googtrans")) {
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=${domain};path=/`;
                
                // Thử xóa trên root domain (vd: .site.com)
                if (domainParts.length > 2) {
                    const rootDomain = domainParts.slice(-2).join('.');
                    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;domain=.${rootDomain};path=/`;
                }
            }
        });
    };
    
    // Gọi xóa ngay khi load
    clearGoogleCookies();

    // --- 2. KHỞI TẠO GOOGLE ---
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'en,vi',
            autoDisplay: false,
            // XÓA DÒNG layout: SIMPLE ĐỂ TĂNG ĐỘ TƯƠNG THÍCH
          },
          'google_translate_element'
        );
      }
    };

    const scriptId = 'google-translate-script';
    if (!document.getElementById(scriptId)) {
      const addScript = document.createElement('script');
      addScript.id = scriptId;
      addScript.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      addScript.async = true;
      document.body.appendChild(addScript);
    }
  }, []);

  // --- 3. HÀM CHANGE LANGUAGE (RETRY 50 LẦN = 5 GIÂY) ---
  const changeLanguage = (langCode: string, attempt = 1) => {
    // Tìm thẻ select (Thẻ này do Google sinh ra)
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;

    if (select) {
      // Nếu tìm thấy -> Đổi luôn
      select.value = langCode;
      select.dispatchEvent(new Event('change', { bubbles: true })); // Thêm bubbles: true
      setCurrentLang(langCode);
      setIsOpen(false);
    } else {
      // Nếu chưa thấy -> Thử lại tối đa 50 lần (mỗi lần cách nhau 100ms)
      if (attempt <= 50) {
        // Log để bạn kiểm tra xem nó có đang cố tìm không
        console.log(`Đang tìm thẻ select của Google... Lần thử ${attempt}`);
        setTimeout(() => changeLanguage(langCode, attempt + 1), 100);
      } else {
        console.error("Không tìm thấy thẻ select của Google Translate. Có thể script bị chặn.");
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans">
      
      {/* Menu Chọn Ngôn Ngữ */}
      <div 
        className={`absolute bottom-full left-0 mb-3 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-bottom-left ${
          isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'
        }`}
      >
         <div className="p-2 space-y-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2 border-b border-slate-50 mb-1">
              Select Language
            </p>
            
            <button 
                onClick={() => changeLanguage('en')}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-bold transition-colors ${
                    currentLang === 'en' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">🇺🇸</span> English
                </div>
                {currentLang === 'en' && <FaCheck className="text-blue-600"/>}
            </button>

            <button 
                onClick={() => changeLanguage('vi')}
                className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm font-bold transition-colors ${
                    currentLang === 'vi' ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-xl">🇻🇳</span> Tiếng Việt
                </div>
                {currentLang === 'vi' && <FaCheck className="text-blue-600"/>}
            </button>
         </div>
      </div>

      {/* Nút quả địa cầu */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-xl border transition-all duration-300 transform hover:scale-110 ${
            isOpen ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 border-slate-200'
        }`}
      >
        <FaGlobeAmericas className="text-2xl" />
      </button>

      {/* QUAN TRỌNG: 
          Không được display: none ở đây, dùng CSS trong globals.css để ẩn.
          Widget này cần tồn tại để Google inject code vào.
      */}
      <div id="google_translate_element"></div>
    </div>
  );
}