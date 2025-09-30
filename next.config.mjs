/** @type {import('next').NextConfig} */
const nextConfig = {
  // BẮT BUỘC: Cấu hình cho Static Export.
  // Điều này sẽ tạo ra thư mục 'out/' chứa HTML/CSS/JS tĩnh.
  output: 'export', 

  // Vercel host ứng dụng ở cấp độ gốc, không cần Base Path cho liên kết
  basePath: '', 

  // Tùy chọn: Tắt Image Optimization vì nó yêu cầu máy chủ.
  images: {
    unoptimized: true,
  },

  // Tùy chọn: Tắt E-Tag cho static files
  generateEtags: false,
};

// Sử dụng export default thay vì module.exports cho file .mjs
export default nextConfig;
