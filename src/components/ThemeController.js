'use client'; // BẮT BUỘC: Phải là Client Component để dùng hooks và localStorage

import { useState, useEffect } from 'react';

// --- COMPONENT PHỤ: THEME TOGGLE (NÚT CHUYỂN ĐỔI) ---
function ThemeToggle({ theme, toggleTheme }) {
    const isDark = theme === 'dark';
    const Icon = isDark ? SunIcon : MoonIcon;
    const label = isDark ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối';

    return (
        // Sử dụng custom class cho vị trí cố định và kiểu dáng
        <div className="theme-toggle-container"> 
            <button
                onClick={toggleTheme}
                title={label}
                className="theme-toggle-button"
            >
                <Icon className="theme-icon" />
            </button>
        </div>
    );
}

// --- ICON COMPONENTS (Inline SVG) ---
function SunIcon(props) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    );
}

function MoonIcon(props) {
    return (
        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
    );
}
// ------------------------------------

export default function ThemeController() {
    const [theme, setTheme] = useState('dark'); 

    useEffect(() => {
        // [1] Lần đầu tiên component mount: Đọc theme từ localStorage
        const savedTheme = localStorage.getItem('theme');
        const root = document.documentElement;

        // Ưu tiên theme đã lưu, nếu không có thì mặc định là 'dark'
        const initialTheme = savedTheme || 'dark';
        setTheme(initialTheme);

        if (initialTheme === 'dark') {
             root.classList.add('dark');
        } else {
             root.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        // [2] Khi state 'theme' thay đổi: Áp dụng class và lưu vào localStorage
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'dark' ? 'light' : 'dark'));
    };
    
    // Component này chỉ hiển thị nút chuyển đổi
    return <ThemeToggle theme={theme} toggleTheme={toggleTheme} />;
}
