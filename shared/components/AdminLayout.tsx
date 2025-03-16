"use client";

import React, { useState, useEffect } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/breadcrumbs";
import { Button } from "@heroui/button";
import {
  ChevronDoubleLeftIcon,
  Cog8ToothIcon,
  HeartIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";

import DarkModeSwitch from "./DarkModeSwitch";
// 模拟侧边栏菜单项
const sidebarMenu = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <PresentationChartBarIcon className="h-6 min-w-6" />,
  },
  {
    label: "Settings",
    path: "/admin/settings",
    icon: <Cog8ToothIcon className="h-6 min-w-6" />,
  },
  // 可根据需要添加更多菜单项
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 从 localStorage 中获取侧边栏状态
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(
    window.localStorage.getItem("sidebarCollapsed") === "true",
  );

  // 保存侧边栏状态到 localStorage
  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex min-h-screen duration-500">
      {/* 左侧侧边栏 */}
      <div
        className={`${
          isSidebarCollapsed ? "w-16" : "w-64"
        } border-r bg-slate-800 text-slate-100 transition-all duration-300 dark:border-gray-600 dark:bg-gray-950 dark:text-gray-50`}
      >
        <div className="flex items-center p-4">
          <HeartIcon className="h-8 min-w-8" />
          <h2
            className={`${
              isSidebarCollapsed
                ? "transition-discrete hidden text-[0px] transition-all duration-300"
                : "transition-discrete ml-2 text-nowrap text-xl font-bold transition-all duration-300"
            } `}
          >
            Admin Panel
          </h2>
        </div>
        <ul className="space-y-2">
          {sidebarMenu.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                {item.icon}
                <span
                  className={`${
                    isSidebarCollapsed
                      ? "transition-discrete hidden text-[0px] transition-all duration-300"
                      : "text-md transition-discrete ml-2 inline text-nowrap transition-all duration-300"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* 右侧内容区域 */}
      <div className="transition-background flex flex-1 flex-col bg-slate-200 dark:bg-gray-900">
        {/* 顶部面包屑 */}
        <div className="flex items-center border-b border-slate-300 bg-white px-4 py-2 transition-colors dark:border-gray-600 dark:bg-gray-950">
          <Button
            isIconOnly
            aria-label="collapse"
            size="sm"
            variant="bordered"
            onPress={toggleSidebar}
          >
            <ChevronDoubleLeftIcon
              className={`h-4 transition-transform ${
                isSidebarCollapsed ? "rotate-180" : "rotate-0"
              }`}
            />
          </Button>
          <Breadcrumbs className="mx-4 flex-1">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Music</BreadcrumbItem>
            <BreadcrumbItem>Artist</BreadcrumbItem>
            <BreadcrumbItem>Album</BreadcrumbItem>
            <BreadcrumbItem>Song</BreadcrumbItem>
          </Breadcrumbs>
          <DarkModeSwitch />
        </div>
        {/* 内容区域 */}
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
