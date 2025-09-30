import { getMarkdownData, getAllPostSlugs } from "../../../../lib/markdown";
import Navbar from "../../../components/Navbar"; 
import Image from "next/image"; // Đã import Image

// ------------------------------------------------
// 1. TẠO STATIC PARAMS (Bắt buộc cho Dynamic Route tĩnh)
// ------------------------------------------------
export async function generateStaticParams() {
    try {
        const slugs = getAllPostSlugs();
        return slugs.map(item => ({ slug: item.slug })); 
    } catch (e) {
        console.error("Lỗi khi lấy slugs cho generateStaticParams:", e);
        return [];
    }
}

// ------------------------------------------------
// 2. COMPONENT HIỂN THỊ NỘI DUNG BLOG
// ------------------------------------------------
export default async function Post({ params }) {
    const { slug } = await params;

    let postData;
    try {
        postData = await getMarkdownData(`blogs/${slug}`);
    } catch (e) {
        console.error(`Không tìm thấy bài viết: blogs/${slug}`, e);
        // KHẮC PHỤC THEME: Sử dụng biến CSS
        return (
            <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--page-background)', color: 'var(--foreground)' }}>
                <h1 className="text-3xl text-red-500">404 - Không tìm thấy bài viết này.</h1>
            </div>
        );
    }

    const { title, date, contentHtml, description, image } = postData;

    // LOGIC XỬ LÝ ĐƯỜNG DẪN ẢNH
    const cleanedImagePath = image 
        ? image.startsWith('public/') 
            ? image.substring('public/'.length) 
            : image 
        : null;

    const formattedDate = new Date(date).toLocaleDateString('vi-VN', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        // KHẮC PHỤC THEME: Thay thế màu nền bằng biến CSS
        <div className="min-h-screen" style={{ backgroundColor: 'var(--page-background)', color: 'var(--foreground)' }}>
            <Navbar />
            
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Tiêu đề và Metadata */}
                <header className="mb-8 pb-4 border-b dark:border-gray-700">
                    {/* Ảnh Cover */}
                    {cleanedImagePath && (
                        // KHẮC PHỤC CẢNH BÁO <img>: Sử dụng <Image />
                        <div className="mb-6 rounded-lg overflow-hidden shadow-xl relative w-full h-[250px] md:h-[350px]">
                            <Image 
                                src={`/${cleanedImagePath}`} 
                                alt={title} 
                                fill 
                                priority
                                sizes="(max-width: 768px) 100vw, 800px"
                                style={{ objectFit: "cover" }}
                            />
                        </div>
                    )}
                    
                    {/* KHẮC PHỤC THEME: Xóa class màu chữ cố định */}
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: 'var(--foreground)' }}>
                        {title}
                    </h1>
                    
                    {description && (
                         <p className="text-xl mt-3 italic">
                            {description}
                         </p>
                    )}

                    <p className="mt-3">
                        Ngày xuất bản: {formattedDate}
                    </p>
                </header>

                {/* NỘI DUNG BÀI VIẾT */}
                {contentHtml ? (
                    <div 
                        className="prose prose-lg dark:prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: contentHtml }}
                    />
                ) : (
                    <p className="text-xl text-yellow-600 dark:text-yellow-400">
                        Bài viết này không có nội dung (body) sau phần Front Matter. Vui lòng kiểm tra file Markdown.
                    </p>
                )}
            </article>
        </div>
    );
}

export const revalidate = 60;