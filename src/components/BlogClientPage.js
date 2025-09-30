'use client'; // BẮT BUỘC: Đánh dấu đây là Client Component

import { useState, useMemo } from 'react'; // Đã loại bỏ useEffect
import Link from 'next/link';

// để đảm bảo nút chuyển đổi hiển thị trên toàn bộ trang (bao gồm cả Portfolio).

export default function BlogClientPage({ initialPosts }) {

    // State để lưu trữ Tag đang được chọn (null/'' nghĩa là chọn tất cả)
    const [selectedTag, setSelectedTag] = useState(null);

    // 1. Lấy danh sách tất cả các tags duy nhất (Unique Tags)
    // Dùng useMemo để chỉ tính toán lại khi initialPosts thay đổi
    const uniqueTags = useMemo(() => {
        const tags = new Set();
        initialPosts.forEach(post => {
            if (post.tags && Array.isArray(post.tags)) {
                post.tags.forEach(tag => tags.add(tag));
            }
        });
        return Array.from(tags).sort();
    }, [initialPosts]);

    // 2. Logic Lọc Bài Viết
    // Dùng useMemo để chỉ lọc lại khi selectedTag thay đổi
    const filteredPosts = useMemo(() => {
        if (!selectedTag) {
            return initialPosts; // Hiển thị tất cả nếu không có tag nào được chọn
        }
        return initialPosts.filter(post => 
            post.tags && post.tags.includes(selectedTag)
        );
    }, [initialPosts, selectedTag]);

    // Hàm xử lý khi người dùng chọn Tag
    const handleTagClick = (tag) => {
        // Nếu click lại tag đang chọn, thì bỏ chọn
        if (selectedTag === tag) {
            setSelectedTag(null);
        } else {
            setSelectedTag(tag);
        }
    };

    return (
        <div>
            {/* ThemeToggle đã được di chuyển ra component cấp cao hơn */}
            
            {/* === KHU VỰC LỌC THEO TAG === */}
            <div className="flex flex-wrap gap-2 mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
                <span className="font-semibold text-gray-700 dark:text-gray-300 mr-2">Lọc theo:</span>
                
                {/* Nút "Xem tất cả" */}
                <TagButton 
                    tag={null} 
                    label="Tất cả" 
                    selectedTag={selectedTag} 
                    onClick={handleTagClick} 
                />
                
                {/* Danh sách các Tag có sẵn */}
                {uniqueTags.map(tag => (
                    <TagButton 
                        key={tag} 
                        tag={tag} 
                        label={tag} 
                        selectedTag={selectedTag} 
                        onClick={handleTagClick} 
                    />
                ))}
            </div>

            {/* === DANH SÁCH BÀI VIẾT ĐÃ LỌC === */}
            <div className="space-y-8">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map(({ slug, title, date, tags, image, description }) => ( // Đã thêm image và description
                        <PostCard 
                            key={slug} 
                            slug={slug} 
                            title={title} 
                            date={date} 
                            tags={tags} 
                            image={image} // TRUYỀN IMAGE PROP
                            description={description} // Truyền description
                            onTagClick={handleTagClick} 
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400">
                        Không tìm thấy bài viết nào với tag "{selectedTag}".
                    </p>
                )}
            </div>
        </div>
    );
}

// Component phụ: Nút Tag
function TagButton({ tag, label, selectedTag, onClick }) {
    const isSelected = tag === selectedTag;
    
    return (
        <button 
            onClick={() => onClick(tag)}
            className={`
                text-sm font-medium px-3 py-1 rounded-full transition-colors duration-200
                ${isSelected 
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700' 
                    : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }
            `}
        >
            {label}
        </button>
    );
}

// Component phụ: Thẻ Bài Viết (ĐÃ CẬP NHẬT để hiển thị ảnh)
function PostCard({ slug, title, date, tags, image, description, onTagClick }) {
    
    // LOGIC KHẮC PHỤC: Xử lý đường dẫn ảnh từ Front Matter (loại bỏ public/)
    const cleanedImagePath = image 
        ? image.startsWith('public/') 
            ? image.substring('public/'.length) 
            : image 
        : null;

    return (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex space-x-4">
            
            {/* KHU VỰC ẢNH THUMBNAIL (Bên trái) */}
            {cleanedImagePath && (
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shadow-sm">
                    {/* Sử dụng thẻ img đơn giản cho thumbnail */}
                    <img 
                        src={`/${cleanedImagePath}`} 
                        alt={`Ảnh bìa ${title}`} 
                        className="w-full h-full object-cover" 
                    />
                </div>
            )}

            {/* KHU VỰC NỘI DUNG (Bên phải) */}
            <div className="flex-grow">
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    <Link href={`/blog/${slug}`}>
                        {title}
                    </Link>
                </h2>
                {/* Mô tả ngắn/tóm tắt */}
                {description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 line-clamp-2">
                        {description}
                    </p>
                )}
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Ngày: {new Date(date).toLocaleDateString('vi-VN')}
                </p>
                
                {/* Hiển thị Tags trong PostCard */}
                <div className="mt-2 space-x-2">
                    {tags && Array.isArray(tags) && tags.map(tag => (
                        <button 
                            key={tag} 
                            onClick={() => onTagClick(tag)}
                            className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold px-2 py-0.5 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            #{tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
