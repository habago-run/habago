import Link from "next/link";

import DarkModeSwitch from "@/components/DarkModeSwitch";
import "./home.css";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col justify-center bg-[url(/bg.svg)] bg-cover bg-center p-8 transition-colors duration-3000">
      <div className="flex justify-end">
        <DarkModeSwitch />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-4">
        <h1 className="animate-gradient mx-auto text-center text-6xl font-bold text-transparent">
          哈巴狗
        </h1>
        <p className="text-center text-slate-800 transition-colors dark:text-slate-100">
          尚未配置首页插件，去
          <Link
            className="font-bold text-blue-600 underline mx-1"
            href="/admin/dashboard"
          >
            后台管理
          </Link>
        </p>
        <p className="text-center text-slate-800 transition-colors dark:text-slate-100">
          可以管理页面安装首页插件或禁用此导航页
        </p>
      </div>
    </main>
  );
}
