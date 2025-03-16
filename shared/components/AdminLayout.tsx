import DarkModeSwitch from './DarkModeSwitch';
import React from 'react';

// 模拟侧边栏菜单项
const sidebarMenu = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Settings', path: '/admin/settings' },
    // 可根据需要添加更多菜单项
];

// 模拟顶部二级导航项
const topMenu = [
    { label: 'Overview', path: '/admin/dashboard/overview' },
    { label: 'Analytics', path: '/admin/dashboard/analytics' },
    // 可根据需要添加更多导航项
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen">
            {/* 左侧侧边栏 */}
            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4">
                    <h2 className="text-xl font-bold">Admin Panel</h2>
                </div>
                <ul className="space-y-2">
                    {sidebarMenu.map((item, index) => (
                        <li key={index}>
                            <a href={item.path} className="block px-4 py-2 hover:bg-gray-700">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            {/* 右侧内容区域 */}
            <div className="flex-1 flex flex-col">
                {/* 顶部二级导航 */}
                <div className="flex justify-between items-center bg-gray-200 p-4">
                    <ul className="flex space-x-4">
                        {topMenu.map((item, index) => (
                            <li key={index}>
                                <a href={item.path} className="hover:text-blue-600">
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <DarkModeSwitch />
                </div>
                {/* 内容区域 */}
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
}