"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
} from "@heroui/react";
import React, { use } from "react";

export default function CurdTable<T>({
  columns,
  dataPromise,
}: {
  columns: { key: string; label: string }[];
  dataPromise: Promise<T[]>;
}) {
  const rows = use(dataPromise);

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
    <Table>
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
  );
}
