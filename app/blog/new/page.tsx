import { createPost } from "@/app/actions";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { FaPenNib, FaSave, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

export default async function NewPostPage() {
  const session = await auth();
  // Nếu chưa đăng nhập thì đuổi về trang Login ngay
  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        
        <Link href="/blog" className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 transition">
          <FaArrowLeft /> Quay lại
        </Link>

        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-xl mb-4">
            <FaPenNib />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Viết bài mới</h2>
          <p className="text-gray-500">Chia sẻ kiến thức Mentor của bạn.</p>
        </div>

        <form action={createPost} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
            <input name="title" type="text" required placeholder="Ví dụ: Cách viết CV chuẩn..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
            <textarea name="content" rows={8} required placeholder="Nội dung chi tiết..." className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
          </div>

          <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 px-4 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-lg">
            <FaSave /> Đăng Bài Viết
          </button>
        </form>
      </div>
    </div>
  );
}