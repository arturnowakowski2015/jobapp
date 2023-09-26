import { ReactNode } from 'react';

export type ColumnName<T extends string = string> = {
  id: T;
  displayName: ReactNode;
};

export type TableHeadProps = {
  isAllSelected: boolean;
  onSelectAll: () => void;
  columnNames: ColumnName[];
};

export type TableBodyRow = {
  id: string;
  nodes: ReactNode[];
};

export type TableBodyProps = {
  onSelect: (id: string) => void;
  selectedIds: string[];
  data: TableBodyRow[];
};

export type TableProps<T extends string> = {
  columnNames: ColumnName<T>[];
  data: Record<T, ReactNode>[];
  renderAboveTable?: ({
    selectedIds,
    onSelect,
  }: {
    selectedIds: string[];
    onSelect: (id: string) => void;
  }) => JSX.Element;
  renderBelowTable?: () => JSX.Element;
};
