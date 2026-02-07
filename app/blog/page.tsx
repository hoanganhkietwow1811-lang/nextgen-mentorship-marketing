import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { FaArrowLeft, FaCalendarAlt, FaPlus, FaTrash } from 'react-icons/fa';
import { deletePost } from '@/app/actions'; 

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
  });
  return posts;
}

export default async function BlogPage() {
  const posts = await getPosts();
  const session = await auth();

  // 👇 LOGIC MỚI: Kiểm tra chính xác quyền Admin
  const isAdmin = (session?.user as any)?.role === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      
      {/* Header - Giữ nguyên thiết kế cũ của bạn */}
      <div className="bg-[#0f172a] text-white py-20 px-6 text-center shadow-lg relative overflow-hidden">
        <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">NextGen Blog & News</h1>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Latest recruitment trends and success stories from our community.
            </p>
            
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link href="/" className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 rounded-full hover:bg-white/20 transition backdrop-blur-sm border border-white/20">
                  <FaArrowLeft /> Home
                </Link>

                {/* 👇 CHỈ ADMIN MỚI THẤY NÚT NEW POST */}
                {isAdmin && (
                    <Link href="/blog/new" className="inline-flex items-center gap-2 px-6 py-2 bg-[#f59e0b] text-white font-bold rounded-full hover:bg-[#d97706] transition shadow-lg">
                      <FaPlus /> New Post
                    </Link>
                )}
            </div>
        </div>
      </div>

      {/* Post List */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {posts.length === 0 ? (
           <div className="text-center py-20">
               <p className="text-slate-400 text-xl">No posts available yet.</p>
               {isAdmin && <p className="text-slate-500 mt-2">Click "New Post" to start sharing!</p>}
           </div>
        ) : (
            <div className="grid md:grid-cols-2 gap-8">
                {posts.map((post) => (
                <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col h-full relative">
                    
                    {/* 👇 CHỈ ADMIN MỚI THẤY NÚT XÓA */}
                    {isAdmin && (
                      <div className="absolute top-4 right-4 z-20">
                        <form action={deletePost}>
                          <input type="hidden" name="postId" value={post.id} />
                          <button 
                            type="submit" 
                            className="p-2 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
                            title="Delete this post"
                          >
                            <FaTrash size={14} />
                          </button>
                        </form>
                      </div>
                    )}

                    <div className="relative w-full h-64 bg-gray-100 overflow-hidden">
                        {post.imageUrl ? (
                            <Image 
                              src={post.imageUrl} 
                              alt={post.title} 
                              fill 
                              className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300 bg-slate-100">No Image</div>
                        )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                            <FaCalendarAlt />
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric', month: 'long', day: 'numeric'
                            })}
                        </div>
                        
                        <Link href={`/blog/${post.id}`}>
                            <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#3b82f6] transition line-clamp-2 cursor-pointer">
                                {post.title}
                            </h2>
                        </Link>
                        
                        <p className="text-slate-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed whitespace-pre-line">
                            {post.content}
                        </p>
                        
                        <div className="pt-4 border-t border-slate-50 mt-auto">
                           <Link href={`/blog/${post.id}`} className="text-[#3b82f6] font-semibold text-sm hover:underline flex items-center gap-1 w-fit">
                              Read more &rarr;
                           </Link>
                        </div>
                    </div>
                </article>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}