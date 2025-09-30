import Navbar from "../../components/Navbar"; 
import { getSortedPostsData } from "../../../lib/markdown"; // Lấy tất cả dữ liệu
import BlogClientPage from "../../components/BlogClientPage"; // Component mới

// Server Component: Chỉ lấy dữ liệu tĩnh và render các component chính
export default function BlogList() {
    // Lấy dữ liệu bài viết (chạy trên Server)
    const allPostsData = getSortedPostsData();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar />
            
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-8 border-b pb-4">
                    Tất Cả Bài Viết Blog 💡
                </h1>
                
                {/* Truyền dữ liệu tĩnh xuống Client Component */}
                <BlogClientPage initialPosts={allPostsData} /> 
            </main>
        </div>
    );
}
