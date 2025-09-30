'use client'; // QUAN TRỌNG: Khắc phục lỗi event handlers

import Link from 'next/link';

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
              {/* Ảnh Logo */}
              <img 
                src="/logo.png" 
                alt="namqx Logo" 
                className="h-15 w-auto rounded-md" 
              />
              
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
      // Lỗi đã xảy ra ở đây. Giữ lại JS handler sau khi thêm 'use client'
      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--blue-primary)'}
      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--foreground)'}
    >
      {text}
    </Link>
  );
}
