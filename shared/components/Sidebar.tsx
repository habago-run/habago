"use client";

// 新增防抖相关引用
import React, { useCallback, useEffect, useRef } from "react";
import { ChevronDoubleLeftIcon, HeartIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { Button } from "@heroui/react";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  menuItems: Array<{
    label: string;
    path: string;
    icon: React.ReactNode;
  }>;
  currentPath: string;
}

export default function Sidebar({
  isCollapsed,
  onToggle,
  menuItems,
  currentPath,
}: SidebarProps) {
  const resizeTimeout = useRef<NodeJS.Timeout>(setTimeout(() => {}, 0));
  const latestIsCollapsed = useRef(isCollapsed);

  // 保持最新状态引用
  latestIsCollapsed.current = isCollapsed;

  // 使用防抖的resize处理
  const handleResize = useCallback(() => {
    // clearTimeout(resizeTimeout.current);
    // resizeTimeout.current = setTimeout(() => {
    if (window.innerWidth >= 768 && latestIsCollapsed.current) {
      onToggle();
    } else if (window.innerWidth < 768 && !latestIsCollapsed.current) {
      onToggle();
    }
    // }, 200); // 200ms防抖
  }, [onToggle]); // 添加onToggle依赖

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout.current);
    };
  }, [handleResize]); // 添加依赖

  return (
    <>
      {/* 移动端遮罩层 */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden ${
          isCollapsed ? "invisible opacity-0" : "visible opacity-100"
        }`}
        onClick={() => {
          if (window.innerWidth < 768) onToggle();
        }}
      />
      <div
        className={`fixed z-50 min-h-full md:relative ${
          isCollapsed
            ? "w-64 -translate-x-full md:w-16 md:translate-x-0"
            : "w-64"
        } transform-gpu border-r border-gray-600 bg-slate-800 text-slate-100 transition-all duration-300 dark:bg-gray-950 dark:text-gray-50`}
      >
        <div className="flex items-center p-4">
          <HeartIcon className="h-8 min-w-8" />
          <h2
            className={`${
              isCollapsed ? "hidden" : ""
            } transition-discrete ml-2 overflow-hidden text-nowrap text-xl font-bold`}
          >
            Admin Panel
          </h2>
          <Button
            isIconOnly
            aria-label="collapse"
            size="sm"
            variant="bordered"
            className="ml-2 text-white md:hidden"
            onPress={onToggle}
          >
            <ChevronDoubleLeftIcon
              className={`h-4 transition-transform ${
                isCollapsed ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.path}
                className={`flex items-center px-4 py-2 hover:bg-gray-700 ${currentPath === item.path ? "bg-slate-700 dark:bg-gray-800" : ""}`}
              >
                {item.icon}
                <span
                  className={`${isCollapsed ? "hidden" : "text-md ml-2 overflow-hidden text-nowrap"}`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
