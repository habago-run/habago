"use server";

import { PrismaClient } from "@prisma/client";
import crypto from "crypto";
import { createSession } from "../lib/session";

type LoginState = {
  error?: string;
  username?: string;
};

const prisma = new PrismaClient();

export async function signin(
  _: LoginState,
  formData: FormData,
): Promise<LoginState> {
  try {
    const { username, password } = Object.fromEntries(formData);

    // 1. 查询用户
    const user = await prisma.systemUser.findUnique({
      where: { username: username.toString() }, // 使用动态用户名
    });

    if (!user) {
      return { error: "用户名或密码错误" };
    }

    // 2. 密码验证
    const inputHash = crypto
      .pbkdf2Sync(
        password.toString(),
        user.salt,
        512, // 迭代次数需与seed.ts一致
        32,
        "sha256",
      )
      .toString("hex");

    if (inputHash !== user.password) {
      return { error: "用户名或密码错误" };
    }
    await createSession(user.id, user.username);
    return { username: user.username };
  } catch (error) {
    console.error("登录失败:", error);
    return { error: "用户名或密码错误" };
  }
}
