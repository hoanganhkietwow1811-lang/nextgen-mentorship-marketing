import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth'; // Import auth
import { FaArrowLeft, FaCalendarAlt, FaUserEdit, FaPlus } from 'react-icons/fa';

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: true } 
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();
  const session = await auth(); // Lấy thông tin đăng nhập

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16 px-6 text-center shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog Chia Sẻ</h1>
        <p className="text-blue-200 text-lg max-w-2xl mx-auto">Kiến thức thực chiến và kinh nghiệm quý báu từ các Mentor Fortune 500.</p>
        
        <div className="mt-8 flex justify-center gap-4">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-sm">
             <FaArrowLeft /> Trang chủ
            </Link>

            {/* --- NÚT VIẾT BÀI MỚI (Chỉ hiện khi đã Login) --- */}
            {session && (
                <Link href="/blog/new" className="inline-flex items-center gap-2 px-6 py-2 bg-yellow-500 text-blue-900 font-bold rounded-full hover:bg-yellow-400 transition shadow-lg">
                 <FaPlus /> Viết bài mới
                </Link>
            )}
        </div>
      </div>

      {/* Danh sách bài viết */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-bold text-gray-700">Chưa có bài viết nào</h3>
            <p className="text-gray-500 mt-2">Hãy đăng bài viết đầu tiên nhé.</p>
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Career</span>
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt className="text-gray-400"/>
                    {new Date(post.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed">
                  {post.content}
                </p>
                
                <div className="flex items-center justify-between border-t border-gray-100 pt-6 mt-2">
                   <span className="text-blue-600 font-semibold group-hover:underline cursor-pointer">Đọc tiếp &rarr;</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}