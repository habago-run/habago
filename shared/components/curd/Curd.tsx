"use client";

import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import React, { use } from "react";

export type Actions = {
  create: boolean;
  update: boolean;
  delete: boolean;
};

export default function CurdTable<T>({
  columns,
  actions,
  dataPromise,
}: {
  columns: { key: string; label: string }[];
  actions: Actions;
  dataPromise: Promise<T[]>;
}) {
  const rows = use(dataPromise);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const renderCell = (item: any, columnKey: string | number) => {
    const value = getKeyValue(item, columnKey);
    const type = Object.prototype.toString.call(value);
    switch (type) {
      case "[object Boolean]":
        return value ? (
          <Chip color="primary">是</Chip>
        ) : (
          <Chip color="danger">否</Chip>
        );
      case "[object Date]":
        return new Date(value).toLocaleString();
      default:
        return value;
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        {actions.create && (
          <Button
            onPress={onOpen}
            color="primary"
            startContent={<PlusIcon className="h-4" />}
          >
            新增
          </Button>
        )}
        {actions.update && (
          <Button
            color="secondary"
            startContent={<PencilSquareIcon className="h-4" />}
          >
            编辑
          </Button>
        )}
        <div className="flex-1" />
        {actions.delete && (
          <Button
            color="danger"
            variant="ghost"
            startContent={<TrashIcon className="h-4" />}
          >
            删除
          </Button>
        )}
      </div>
      <Table color="primary" selectionMode="multiple">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={(item as any).id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>新增</ModalHeader>
              <ModalBody>TODO</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={onClose}>
                  确定
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
