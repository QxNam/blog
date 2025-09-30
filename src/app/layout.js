import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeController from "../components/ThemeController";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "QxNam",
  description: "QxNam's blog - Chia sẻ kiến thức và kinh nghiệm về lập trình, công nghệ và phát triển web.",
};

export default function RootLayout({ children }) {
  return (
    // QUAN TRỌNG:
    // 1. Loại bỏ class="dark" ban đầu.
    // 2. Thêm suppressHydrationWarning để tránh lỗi khi ThemeController thao tác với <html>.
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      
      {/* ThemeController phải là Client Component và được đặt ở đây */}
      <ThemeController />
      </body>
    </html>
  );
}
