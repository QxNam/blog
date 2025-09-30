import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');
const blogDirectory = path.join(contentDirectory, 'blogs');

// ----------------------------------------------------
// HÀM 1: LẤY DỮ LIỆU VÀ CHUYỂN ĐỔI (Dùng cho cả Portfolio và Bài Blog chi tiết)
// ----------------------------------------------------
export async function getMarkdownData(pathFromContentDir) {
    // pathFromContentDir là đường dẫn tương đối TỪ thư mục 'content'
    // Ví dụ: 'portfolio/about' hoặc 'blogs/my-post'
    
    // Nối đường dẫn tuyệt đối
    const fullPath = path.join(contentDirectory, `${pathFromContentDir}.md`);
    
    // Đọc file
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Tách Front Matter và Nội dung
    const matterResult = matter(fileContents);
    
    // Chuyển đổi Markdown sang HTML
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);
        
    const contentHtml = processedContent.toString();

    // Trả về cả HTML và metadata
    return {
        contentHtml,
        ...matterResult.data,
    };
}

// ----------------------------------------------------
// HÀM 2: LẤY DANH SÁCH TẤT CẢ BLOG (cho trang blog/page.js)
// ----------------------------------------------------
export function getSortedPostsData() {
    // Lấy tên tất cả các file markdown trong thư mục 'blogs'
    const fileNames = fs.readdirSync(blogDirectory);
    
    const allPostsData = fileNames.map(fileName => {
        // Loại bỏ '.md' để lấy slug (ví dụ: 'bai-viet-dau-tien')
        const slug = fileName.replace(/\.md$/, '');

        // Đọc Front Matter từ file markdown
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const matterResult = matter(fileContents);
        
        const data = matterResult.data;

        // Xử lý dữ liệu để đảm bảo tính nhất quán (Consistent Data Handling)
        let tags = data.tags || [];
        if (typeof tags === 'string') {
            // Chuyển chuỗi tags thành mảng (ví dụ: "data engineer, docker" -> ["data engineer", "docker"])
            tags = tags.split(',').map(tag => tag.trim());
        }
        
        // Đảm bảo có ngày tháng để sắp xếp
        const date = data.date || new Date().toISOString(); 

        // Trả về slug và metadata cần thiết
        return {
            slug,
            title: data.title || 'Bài viết không tiêu đề',
            date: date,
            tags: tags,
            description: data.description || '',
            image: data.image || null,
            // Các trường khác như categories, author, v.v. cũng được bao gồm
            ...data,
        };
    });

    // Sắp xếp bài viết theo ngày tháng (bài mới nhất lên đầu)
    return allPostsData.sort((a, b) => {
        // Chuyển đổi sang đối tượng Date để so sánh chính xác hơn
        if (new Date(a.date) < new Date(b.date)) {
            return 1; // Bài mới hơn lên trên
        } else {
            return -1;
        }
    });
}

// ----------------------------------------------------
// HÀM 3: LẤY TẤT CẢ SLUG (cho Dynamic Routing)
// ----------------------------------------------------
export function getAllPostSlugs() {
    const fileNames = fs.readdirSync(blogDirectory);
    // Trả về mảng các đối tượng { slug: '...' }
    return fileNames.map(fileName => {
        return {
            slug: fileName.replace(/\.md$/, ''),
        };
    });
}