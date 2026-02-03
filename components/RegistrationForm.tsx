'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaSpinner } from 'react-icons/fa';

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- 1. LINK FORM ĐÃ SỬA ĐUÔI /formResponse (CHUẨN) ---
  const GOOGLE_FORM_ACTION_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdTajpyZKWmMpwNsYDJ6DZbBONnuQeqt-6i-_cy-kKDfuG_Fw/formResponse";
  
  // --- 2. MÃ SỐ ENTRY ĐÃ LẤY TỪ LINK BẠN GỬI ---
  const entryIDs = {
    name: "entry.1884265043",      // TEN
    email: "entry.957805364",      // EMAIL
    phone: "entry.1974852837",     // SDT
    classInfo: "entry.1228037435", // TRUONG (Class/University)
    major: "entry.1212348438",     // NGANH (Major)
    aspiration: "entry.834847820"  // NGUYENVONG (Aspiration)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = new URLSearchParams();

    // Map dữ liệu từ ô nhập liệu vào đúng mã số Google Form
    data.append(entryIDs.name, formData.get('name') as string);
    data.append(entryIDs.email, formData.get('email') as string);
    data.append(entryIDs.phone, formData.get('phone') as string);
    data.append(entryIDs.classInfo, formData.get('classInfo') as string);
    data.append(entryIDs.major, formData.get('major') as string);
    data.append(entryIDs.aspiration, formData.get('aspiration') as string);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors', // Quan trọng: Chế độ này giúp gửi được mà không bị chặn
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data,
      });

      // Giả lập delay 1 xíu cho trải nghiệm mượt mà
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1000);

    } catch (error) {
      console.error("Form Error:", error);
      setIsSubmitting(false);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="register" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100"
        >
          {/* TRẠNG THÁI THÀNH CÔNG */}
          {isSuccess ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6 animate-bounce">
                <FaCheckCircle size={40} />
              </div>
              <h3 className="text-3xl font-bold text-slate-900 mb-4">Application Submitted!</h3>
              <p className="text-lg text-slate-600 mb-6">
                Thank you for your interest. Our team will review your profile and contact you <br/>
                <strong className="text-blue-600">within 24 hours</strong>.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="text-sm font-bold text-slate-400 hover:text-blue-600 underline"
              >
                Submit another response
              </button>
            </div>
          ) : (
            /* TRẠNG THÁI FORM NHẬP LIỆU */
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-3">Apply for Mentorship</h2>
                <p className="text-slate-500">Fill out the form below to start your journey.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. Full Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    id="name"
                    placeholder="e.g. John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium text-slate-800 placeholder:font-normal"
                  />
                </div>

                {/* 2. Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      id="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium text-slate-800 placeholder:font-normal"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      id="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium text-slate-800 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* 3. Class & Major */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="classInfo" className="block text-sm font-bold text-slate-700 mb-2">Class / University</label>
                    <input
                      required
                      type="text"
                      name="classInfo"
                      id="classInfo"
                      placeholder="e.g. Class of 2026 - UST"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium text-slate-800 placeholder:font-normal"
                    />
                  </div>
                  <div>
                    <label htmlFor="major" className="block text-sm font-bold text-slate-700 mb-2">Major</label>
                    <input
                      required
                      type="text"
                      name="major"
                      id="major"
                      placeholder="e.g. Computer Science"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium text-slate-800 placeholder:font-normal"
                    />
                  </div>
                </div>

                {/* 4. Aspiration */}
                <div>
                  <label htmlFor="aspiration" className="block text-sm font-bold text-slate-700 mb-2">Career Aspiration / Target Role</label>
                  <textarea
                    required
                    name="aspiration"
                    id="aspiration"
                    rows={3}
                    placeholder="e.g. I want to become a Software Engineer at a FAANG company in the US..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-medium text-slate-800 resize-none placeholder:font-normal"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" /> Submitting...
                    </>
                  ) : (
                    <>
                      Submit Application <FaPaperPlane />
                    </>
                  )}
                </button>
                
                <p className="text-center text-xs text-slate-400 mt-4">
                    Your information is kept strictly confidential.
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}