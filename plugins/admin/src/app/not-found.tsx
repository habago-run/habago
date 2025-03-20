import Link from "next/link";
import DarkModeSwitch from "@shared/components/DarkModeSwitch";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-[url(./img/bg.svg)] bg-cover bg-center p-8 duration-500">
      <div className="flex justify-end">
        <DarkModeSwitch />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <h1 className="animate-gradient mx-auto text-center text-6xl font-bold text-transparent">
          哈巴狗
        </h1>
        <h2 className="mt-4 text-center text-2xl font-medium text-slate-800 transition-colors dark:text-slate-100">
          面向AI的下一代全栈框架，0停机更新功能。
        </h2>
        <p className="mt-8 text-center text-slate-800 transition-colors dark:text-slate-100">
          此页面尚未被插件注册，去
          <Link
            className="mx-1 font-bold text-blue-600 underline transition-colors dark:text-blue-400"
            href="/admin/welcome"
          >
            后台管理
          </Link>
        </p>
        <p className="mt-2 text-center text-slate-800 transition-colors dark:text-slate-100">
          可以在插件管理页面安装相关插件
        </p>
      </div>
    </main>
  );
}
