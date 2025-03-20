"use client";

import React, { useActionState, useEffect } from "react";
import { Button, Input } from "@heroui/react";
import DarkModeSwitch from "@shared/components/DarkModeSwitch";
import { signin } from "@/app/actions/auth";
import { redirect, useSearchParams } from "next/navigation";

const LoginPage: React.FC = () => {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/admin/welcome";
  const [state, action, pending] = useActionState(signin, {});

  useEffect(() => {
    if (state.username) {
      sessionStorage.setItem("username", state.username);
      redirect(redirectTo);
    }
  }, [state.username]);

  return (
    <main className="flex min-h-screen flex-col bg-[url(./img/bg.svg)] bg-cover bg-center p-8 duration-500">
      <div className="flex justify-end">
        <DarkModeSwitch />
      </div>
      <div className="m-auto w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900 transition-colors dark:text-gray-100">
            欢迎回来
          </h2>
          <p className="mt-2 text-sm text-gray-600 transition-colors dark:text-gray-400">
            请输入您的凭据以登录
          </p>
        </div>

        <form className="mt-8 space-y-6" action={action}>
          <div className="space-y-4">
            <Input
              label="用户名"
              id="username"
              name="username"
              type="text"
              size="sm"
              autoComplete="username"
              required
            />

            <Input
              label="密码"
              id="password"
              size="sm"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          {state.error && (
            <p className="text-sm text-red-600 dark:text-red-500">
              {state.error}
            </p>
          )}

          <Button
            type="submit"
            isLoading={pending}
            className="w-full"
            color="primary"
          >
            {pending ? "登录中..." : "登录"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
