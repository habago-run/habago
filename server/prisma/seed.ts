import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

async function main() {
  await insertAdminPlugin();
  await insertAdminUser();
}

async function insertAdminPlugin() {
  const existingPlugin = await prisma.plugin.findUnique({
    where: { name: "Admin" },
  });
  if (existingPlugin) {
    console.log("Plugin already exists");
    return;
  }
  const plugin = await prisma.plugin.create({
    data: {
      name: "Admin",
      description: "基础管理系统",
      author: "habago",
      version: "1.0.0",
      default: true,
      enabled: true,
    },
  });
  console.log("seed successfully", plugin);
}

async function insertAdminUser() {
  const existingAdmin = await prisma.systemUser.findUnique({
    where: { username: "admin" },
  });

  if (existingAdmin) {
    console.log("Admin user already exists");
    return;
  }

  // 生成密码哈希（保持原有安全实现）
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedPassword = crypto
    .pbkdf2Sync(process.env.ADMIN_PASSWORD || "habago", salt, 512, 32, "sha256")
    .toString("hex");

  // 简化后的用户创建逻辑
  await prisma.systemUser.create({
    data: {
      username: "admin",
      password: hashedPassword,
      salt: salt,
      enabled: true,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
