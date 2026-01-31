import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCalendarAlt, FaUserEdit } from 'react-icons/fa';

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
  });
  return post;
}

export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
  
  const { id } = await params;
  
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-20">
      
      {/* Header */}
      <div className="relative w-full h-[450px] bg-[#0f172a]">
        {post.imageUrl ? (
          <Image 
            src={post.imageUrl} 
            alt={post.title} 
            fill 
            className="object-cover opacity-50" 
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-blue-900 opacity-90" />
        )}
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 max-w-4xl mx-auto z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition w-fit px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20">
            <FaArrowLeft /> Back to Blog
          </Link>
          
          <div className="flex items-center gap-4 text-blue-200 text-sm font-bold uppercase tracking-wider mb-4">
             <span className="flex items-center gap-2">
                <FaCalendarAlt /> 
                {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
             </span>
             <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
             <span className="flex items-center gap-2"><FaUserEdit /> NextGen Team</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-2xl">
            {post.title}
          </h1>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto -mt-12 relative z-20 px-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-slate-100">
          <article className="prose prose-lg prose-slate max-w-none">
            <div className="whitespace-pre-line leading-relaxed text-slate-700 text-lg">
              {post.content}
            </div>
          </article>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-slate-500 text-sm italic">
                Thanks for reading!
             </div>
             <Link href="/blog" className="px-6 py-3 bg-[#0f172a] text-white font-bold rounded-full hover:bg-[#3b82f6] transition shadow-lg">
               Read more posts
             </Link>
          </div>
        </div>
      </div>

    </div>
  );
}