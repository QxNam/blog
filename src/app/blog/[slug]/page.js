import { getMarkdownData, getAllPostSlugs } from "../../../../lib/markdown";
import Navbar from "../../../components/Navbar"; 
import Image from "next/image"; // Cần import nếu dùng Image component cho coverImage

// ------------------------------------------------
// 1. TẠO STATIC PARAMS (Bắt buộc cho Dynamic Route tĩnh)
// ------------------------------------------------
export async function generateStaticParams() {
    // Đây là Server side code, chạy lúc build time để tạo các trang HTML tĩnh
    try {
        const slugs = getAllPostSlugs(); // Lấy danh sách slug từ lib/markdown.js
        return slugs.map(item => ({ slug: item.slug })); 
    } catch (e) {
        console.error("Lỗi khi lấy slugs cho generateStaticParams:", e);
        // Trả về mảng rỗng nếu có lỗi để quá trình build không bị dừng hoàn toàn
        return [];
    }
}

// ------------------------------------------------
// 2. COMPONENT HIỂN THỊ NỘI DUNG BLOG
// ------------------------------------------------
export default async function Post({ params }) {
    const { slug } = params;
    
    let postData;
    try {
        // Đọc và xử lý nội dung từ file markdown: content/blogs/[slug].md
        // Đảm bảo đường dẫn import cho lib/markdown là đúng
        postData = await getMarkdownData(`blogs/${slug}`);
    } catch (e) {
        // Xử lý trường hợp không tìm thấy file
        console.error(`Không tìm thấy bài viết: blogs/${slug}`, e);
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <h1 className="text-3xl text-red-500">404 - Không tìm thấy bài viết này.</h1>
            </div>
        );
    }

    const { title, date, contentHtml, description, image } = postData;

    // LOGIC KHẮC PHỤC: Xử lý đường dẫn ảnh từ Front Matter
    // Nếu đường dẫn bắt đầu bằng 'public/', chúng ta loại bỏ nó.
    const cleanedImagePath = image 
        ? image.startsWith('public/') 
            ? image.substring('public/'.length) 
            : image 
        : null;

    const formattedDate = new Date(date).toLocaleDateString('vi-VN', { 
        year: 'numeric', month: 'long', day: 'numeric' 
    });

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                
                {/* Tiêu đề và Metadata */}
                <header className="mb-8 pb-4 border-b dark:border-gray-700">
                    {/* Ảnh Cover (Kiểm tra lại đường dẫn ảnh trong Markdown của bạn) */}
                    {cleanedImagePath && (
                        <div className="mb-6 rounded-lg overflow-hidden shadow-xl">
                            {/* Đường dẫn ảnh bây giờ sẽ là: /images/docker/main.png */}
                             <img src={`/${cleanedImagePath}`} alt={title} className="w-full h-auto object-cover max-h-96" />
                        </div>
                    )}
                    
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        {title}
                    </h1>
                    
                    {description && (
                         <p className="text-xl text-gray-600 dark:text-gray-400 mt-3 italic">
                            {description}
                         </p>
                    )}

                    <p className="text-gray-500 dark:text-gray-400 mt-3">
                        Ngày xuất bản: {formattedDate}
                    </p>
                </header>

                {/* NỘI DUNG BÀI VIẾT */}
                {/* Dùng contentHtml và dangerouslySetInnerHTML để render nội dung Markdown đã chuyển đổi */}
                {contentHtml ? (
                    <div 
                        // Quan trọng: Áp dụng Tailwind Typography để nội dung markdown hiển thị đẹp
                        className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
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

export const revalidate = 60; // Tái xác thực mỗi 60 giây

