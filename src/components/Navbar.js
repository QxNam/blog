'use client'; // QUAN TRỌNG: Khắc phục lỗi event handlers

import Link from 'next/link';
import Image from 'next/image'; // ⚠️ Cần thêm import Image

export default function Navbar() {
  return (
    // Thanh điều hướng cố định - Dùng style inline để áp dụng biến theme
    <nav 
      style={{ backgroundColor: 'var(--card-background)', transition: 'background-color 0.5s ease' }}
      className="sticky top-0 z-50 backdrop-blur-md shadow-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo / Hình logo của bạn */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="flex items-center space-x-2 p-1 transition-colors"
            >
              {/* ⚠️ KHẮC PHỤC CẢNH BÁO <img>: Thay thế <img> bằng <Image /> */}
              <div className="relative h-8 w-8"> {/* Container để Image hoạt động với 'fill' hoặc đặt kích thước cố định */}
                  <Image 
                      src="/logo.png" 
                      alt="namqx Logo" 
                      // ⚠️ Đối với logo/ảnh nhỏ, nên dùng kích thước cố định thay vì 'fill'
                      width={32} 
                      height={32} 
                      className="rounded-md" 
                  />
              </div>
              
              {/* Chữ Logo - Giữ màu xanh, nhưng dùng biến CSS để đổi sắc độ theo theme */}
              <span 
                  className="text-2xl font-bold transition-colors"
                  style={{ color: 'var(--blue-primary)', transition: 'color 0.3s ease' }}
              >
                QxNam
              </span>
            </Link>
          </div>

          {/* Các liên kết điều hướng */}
          <div className="flex items-center space-x-4">
            <NavLink href="/" text="Portfolio" />
            <NavLink href="/blog" text="Blog" />
            <NavLink href="/contact" text="Contact" />
          </div>
        </div>
      </div>
    </nav>
  );
}

// Component phụ cho liên kết
function NavLink({ href, text }) {
  return (
    <Link 
      href={href} 
      style={{ 
        color: 'var(--foreground)',
        transition: 'color 0.3s ease'
      }}
      className="px-3 py-2 rounded-md text-sm font-medium"
      // Event handlers vẫn hoạt động do đã có 'use client' ở đầu file
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--blue-primary)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}
    >
      {text}
    </Link>
  );
}