import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  // 初始化管理员账户（参考server/seed.ts的插件创建逻辑）
  const existingAdmin = await prisma.systemUser.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists");
    return;
  }

  // 使用更安全的 PBKDF2 哈希算法
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(
      process.env.ADMIN_PASSWORD || "habago", // 初始密码建议通过环境变量配置
      salt,
      512, // 迭代次数
      32, // 密钥长度
      "sha256", // 哈希算法
    )
    .toString("hex");

  await prisma.$transaction([
    // 创建默认角色
    prisma.systemRole.upsert({
      where: { name: "SUPER_ADMIN" },
      update: {},
      create: {
        name: "SUPER_ADMIN",
        description: "系统超级管理员",
        permissions: JSON.stringify([{ all: 0x1111 }]),
      },
    }),
    prisma.systemRole.upsert({
      where: { name: "USER" },
      update: {},
      create: {
        name: "USER",
        description: "普通用户",
        permissions: JSON.stringify([]),
      },
    }),

    // 创建管理员用户
    prisma.systemUser.create({
      data: {
        username: "admin",
        password: hashedPassword,
        salt: salt, // 添加salt字段存储
        role: {
          connect: { name: "SUPER_ADMIN" },
        },
      },
    }),
  ]);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
