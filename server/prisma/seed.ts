import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
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
      imageName: "habago/admin",
      description: "基础管理系统",
      author: "habago",
      version: "1.0.0",
      default: true,
      enabled: true,
      server: "localhost:3001",
    },
  });
  console.log("seed successfully", plugin);
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
