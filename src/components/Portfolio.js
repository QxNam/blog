import Image from "next/image";
import Link from "next/link";

// Component này nhận dữ liệu đã được xử lý (props) từ page.js
export default function PortfolioContent({ data }) {
    const { title, avatar, role, contentHtml } = data;
    
    // Lấy đoạn tóm tắt ngắn (chỉ lấy đoạn đầu tiên)
    const shortBio = contentHtml.split('<h2>')[0];

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
            
            {/* 2. HERO SECTION (Tâm điểm Portfolio) */}
            <section className="text-center py-16 md:py-24 bg-white dark:bg-gray-800 rounded-xl shadow-lg mb-12">
                
                {/* Ảnh đại diện */}
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-blue-500">
                    <Image
                      src={avatar || "/images/my-avatar.png"} 
                      alt={title || "Avatar"}
                      fill 
                      style={{ objectFit: 'cover' }}
                      sizes="128px"
                      priority
                    />
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mt-4 leading-tight">
                    Chào, tôi là <span className="text-blue-600 dark:text-blue-400">QUÁCH XUÂN NAM</span> 👋
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-400 mt-2 font-medium">
                    {role || "GenAI Engineer"}
                </p>

                <div className="mt-8 max-w-2xl mx-auto text-lg text-gray-700 dark:text-gray-300">
                   {/* Hiển thị đoạn tóm tắt ngắn từ Markdown */}
                   <div 
                      className="prose dark:prose-invert max-w-none mx-auto"
                      dangerouslySetInnerHTML={{ __html: shortBio }} 
                    />
                </div>

                <div className="mt-8 space-x-4">
                    <Link 
                      href="/projects" 
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                    >
                      Xem Dự Án 🚀
                    </Link>
                    <Link 
                      href="/blog" 
                      className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                      Đọc Blog 💡
                    </Link>
                </div>
            </section>
            
            {/* ... Có thể thêm Section Tóm tắt Dự án/Blog ở đây ... */}
            
        </main>
    );
}