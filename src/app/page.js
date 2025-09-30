// Server Component (Không cần Link/Image ở đây vì chúng đã được moved vào PortfolioContent)
import { getMarkdownData } from "../../lib/markdown"; // Đảm bảo đường dẫn chính xác
import Navbar from "../components/Navbar"; 
import Portfolio from "../components/Portfolio"; 


// Component chính (Server Component)
export default async function Home() {
  
  // VAI TRÒ 1: THU THẬP DỮ LIỆU
  const portfolioData = await getMarkdownData('portfolio/about');
  
  return (
    // <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div 
        className="min-h-screen" 
        style={{ backgroundColor: 'var(--background)', transition: 'background-color 0.5s ease' }}
    >
      <Navbar />

      {/* Portfolio Content (Component được tách riêng, nhận dữ liệu) */}
      {/* VAI TRÒ 3: TRUYỀN DỮ LIỆU */}
      <Portfolio data={portfolioData} />

      {/* FOOTER */}
      <footer className="w-full text-center py-6 border-t dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} QxNam.
      </footer>
    </div>
  );
}

export const revalidate = 60;