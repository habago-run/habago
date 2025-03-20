import Curd from "@shared/components/curd/Curd";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const columns = [
  {
    key: "name",
    label: "插件名称",
  },
  {
    key: "author",
    label: "发布者",
  },
  {
    key: "description",
    label: "描述",
  },
  {
    key: "version",
    label: "版本",
  },
  {
    key: "default",
    label: "默认插件",
  },
  {
    key: "enabled",
    label: "状态",
  },
];

const actions = {
  create: true,
  update: true,
  delete: true,
};

export default async function Plugin() {
  const dataPromise = prisma.plugin.findMany();

  return <Curd columns={columns} dataPromise={dataPromise} actions={actions} />;
}
