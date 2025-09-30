# Cấu trúc Portfolio và Blog
Trong Next.js (sử dụng App Router), bạn sẽ quản lý các trang và bài viết như sau:
- Portfolio (Trang chính): Trang giới thiệu chung của bạn.
    - File: `src/app/page.js`

- Blog (Danh sách bài viết): Trang liệt kê tất cả các bài blog của bạn.
    - File: Tạo thư mục: `src/app/blog/page.js`

- Chi tiết Bài viết Blog: Mỗi bài viết sẽ có một đường dẫn riêng (ví dụ: /blog/bai-viet-dau-tien).
    - File: Tạo thư mục: `src/app/blog/[slug]/page.js` (Sử dụng tính năng Dynamic Routing của Next.js).