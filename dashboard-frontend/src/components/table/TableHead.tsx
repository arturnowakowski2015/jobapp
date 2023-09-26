import {
  Checkbox,
  TableCell,
  TableHead as MuiTableHead,
  TableRow,
} from '@mui/material';

import { TableHeadProps } from './Table.types';

export const TableHead = ({
  isAllSelected,
  onSelectAll,
  columnNames,
}: TableHeadProps) => {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            checked={isAllSelected}
            onChange={onSelectAll}
          />
        </TableCell>
        {columnNames.map(colName => (
          <TableCell key={colName.id}>{colName.displayName}</TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};
