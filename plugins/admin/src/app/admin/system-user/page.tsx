import Curd from "@shared/components/curd/Curd";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "username",
    label: "用户名",
  },
  {
    key: "enabled",
    label: "启用",
  },
  {
    key: "createdAt",
    label: "创建于",
  },
];

const actions = {
  create: true,
  update: true,
  delete: true,
};

export default async function SystemUser() {
  const dataPromise = prisma.systemUser.findMany();

  return <Curd dataPromise={dataPromise} columns={columns} actions={actions} />;
}
