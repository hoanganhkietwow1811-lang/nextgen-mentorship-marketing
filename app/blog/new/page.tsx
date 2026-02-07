// File: app/blog/new/page.tsx
import { createPost } from "@/app/actions";
import { auth } from "@/auth"; // <--- Import Auth
import { redirect } from "next/navigation"; // <--- Import Redirect
import { FaPaperPlane, FaImage, FaArrowLeft, FaLink } from "react-icons/fa";
import Link from "next/link";

export default async function NewPostPage() {
  // --- BẢO MẬT: KIỂM TRA QUYỀN ADMIN ---
  const session = await auth();
  
  // Nếu chưa đăng nhập HOẶC không phải admin -> Đuổi về trang blog
  if (!session || (session.user as any).role !== 'admin') {
    redirect("/blog");
  }
  // --------------------------------------

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-8 border-t-4 border-[#0f172a]">
        
        {/* Header với màu xanh NextGen */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
            <div>
              <h1 className="text-3xl font-extrabold text-[#0f172a]">Viết Bài Mới</h1>
              <p className="text-sm text-slate-500 mt-1">Chia sẻ kiến thức cùng cộng đồng NextGen</p>
            </div>
            <Link href="/blog" className="text-slate-500 hover:text-[#3b82f6] flex items-center gap-2 text-sm font-medium transition py-2 px-4 rounded-full hover:bg-blue-50">
               <FaArrowLeft /> Quay lại
            </Link>
        </div>

        <form action={createPost} className="space-y-6">
          
          {/* Tiêu đề */}
          <div>
            <label className="block text-sm font-bold text-[#0f172a] mb-2 uppercase tracking-wide">Tiêu đề bài viết</label>
            <input 
              name="title" 
              type="text" 
              required 
              placeholder="Nhập tiêu đề hấp dẫn..." 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-blue-100 outline-none transition text-slate-800 font-medium"
            />
          </div>

          {/* CHỌN ẢNH */}
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
            <label className="block text-sm font-bold text-[#0f172a] mb-4 flex items-center gap-2 uppercase tracking-wide">
                <FaImage className="text-[#3b82f6]"/> Hình ảnh đại diện
            </label>
            
            {/* Cách 1: Upload */}
            <div className="mb-4 group">
                <span className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Cách 1: Tải ảnh lên (Khuyên dùng)</span>
                <div className="relative overflow-hidden rounded-lg">
                    <input 
                        name="imageFile" 
                        type="file" 
                        accept="image/*"
                        className="w-full px-4 py-3 bg-white border border-slate-300 focus:border-[#3b82f6] outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-[#0f172a] file:text-white hover:file:bg-[#3b82f6] cursor-pointer"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4 my-3">
               <div className="h-[1px] bg-slate-300 flex-grow"></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase">Hoặc</span>
               <div className="h-[1px] bg-slate-300 flex-grow"></div>
            </div>

            {/* Cách 2: Link */}
            <div>
                <span className="text-xs font-semibold text-slate-500 uppercase mb-2 block">Cách 2: Dán đường dẫn (Link)</span>
                <div className="relative">
                    <input name="imageUrl" type="url" placeholder="https://..." className="w-full px-4 py-3 bg-white rounded-lg border border-slate-300 focus:border-[#3b82f6] outline-none transition text-slate-600"/>
                    <FaLink className="absolute right-4 top-4 text-slate-400"/>
                </div>
            </div>
          </div>

          {/* Nội dung */}
          <div>
            <label className="block text-sm font-bold text-[#0f172a] mb-2 uppercase tracking-wide">Nội dung chi tiết</label>
            <textarea 
              name="content" 
              required 
              rows={8} 
              placeholder="Viết nội dung tại đây..." 
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-[#3b82f6] focus:ring-2 focus:ring-blue-100 outline-none transition resize-none text-slate-700 leading-relaxed"
            />
          </div>

          {/* Nút Submit chuẩn màu NextGen */}
          <button type="submit" className="w-full py-4 bg-[#0f172a] text-white font-bold rounded-xl hover:bg-[#3b82f6] transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center gap-3 text-lg transform hover:-translate-y-1">
            <FaPaperPlane /> Đăng bài ngay
          </button>
        </form>

      </div>
    </div>
  );
}