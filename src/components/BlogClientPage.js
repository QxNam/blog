'use client'; // BẮT BUỘC: Đánh dấu đây là Client Component

import { useState, useMemo } from 'react'; // Đã loại bỏ useEffect
import Link from 'next/link';
import Image from 'next/image';

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
            {/* === KHU VỰC LỌC THEO TAG === */}
            {/* ⚠️ KHẮC PHỤC THEME: Thay thế bg-white dark:bg-gray-800 bằng inline style */}
            <div 
                className="flex flex-wrap gap-2 mb-8 p-4 rounded-lg shadow-inner"
                style={{ backgroundColor: 'var(--card-background)', color: 'var(--foreground)' }}
            >
                {/* ⚠️ KHẮC PHỤC THEME: Xóa class màu chữ Tailwind */}
                <span className="font-semibold mr-2">Lọc theo:</span>
                
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
                    filteredPosts.map(({ slug, title, date, tags, image, description }) => (
                        <PostCard 
                            key={slug} 
                            slug={slug} 
                            title={title} 
                            date={date} 
                            tags={tags} 
                            image={image}
                            description={description}
                            onTagClick={handleTagClick} 
                        />
                    ))
                ) : (
                    /* ⚠️ KHẮC PHỤC THEME: Xóa class màu chữ Tailwind */
                    <p className="text-center">
                        Không tìm thấy bài viết nào với tag &quot;{selectedTag}&quot;. 
                        {/* ⚠️ KHẮC PHỤC ESLINT: Sử dụng &quot; để thoát ký tự nháy kép */}
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
    
    // Logic xử lý đường dẫn ảnh từ Front Matter (loại bỏ public/)
    const cleanedImagePath = image 
        ? image.startsWith('public/') 
            ? image.substring('public/'.length) 
            : image 
        : null;

    return (
        // ⚠️ KHẮC PHỤC THEME: Thay thế bg-white dark:bg-gray-800 bằng inline style
        <div 
            className="p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex space-x-4"
            style={{ backgroundColor: 'var(--card-background)', color: 'var(--foreground)' }}
        >
            
            {/* KHU VỰC ẢNH THUMBNAIL (Bên trái) */}
            {cleanedImagePath && (
                <div className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shadow-sm relative"> 
                    {/* ⚠️ KHẮC PHỤC CẢNH BÁO <img>: Thay thế <img> bằng <Image /> */}
                    <Image 
                        src={`/${cleanedImagePath}`} // Đường dẫn phải bắt đầu bằng /
                        alt={`Ảnh bìa ${title}`} 
                        fill // Dùng fill để lấp đầy div cha có thuộc tính relative
                        sizes="(max-width: 640px) 100vw, 30vw" // Tối ưu hóa hiệu suất Next.js
                        style={{ objectFit: "cover" }} // Thay class object-cover
                    />
                </div>
            )}

            {/* KHU VỰC NỘI DUNG (Bên phải) */}
            <div className="flex-grow">
                {/* ⚠️ KHẮC PHỤC THEME: Xóa class màu chữ Tailwind */}
                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400 hover:underline">
                    <Link href={`/blog/${slug}`}>
                        {title}
                    </Link>
                </h2>
                {/* Mô tả ngắn/tóm tắt */}
                {/* ⚠️ KHẮC PHỤC THEME: Xóa class màu chữ Tailwind */}
                {description && (
                    <p className="text-sm mt-1 line-clamp-2">
                        {description}
                    </p>
                )}
                {/* ⚠️ KHẮC PHỤC THEME: Xóa class màu chữ Tailwind */}
                <p className="text-sm mt-2">
                    Ngày: {new Date(date).toLocaleDateString('vi-VN')}
                </p>
                
                {/* Hiển thị Tags trong PostCard */}
                {/* ⚠️ KHẮC PHỤC THEME: Vẫn giữ lại Tailwind cho styling button tag */}
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
