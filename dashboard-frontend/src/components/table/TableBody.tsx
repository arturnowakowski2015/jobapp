import {
  Checkbox,
  TableBody as MuiTableBody,
  TableCell,
  TableRow,
} from '@mui/material';

import { TableBodyProps } from './Table.types';

export const TableBody = ({ onSelect, selectedIds, data }: TableBodyProps) => {
  return (
    <MuiTableBody>
      {data.map(dataObj => (
        <TableRow key={dataObj.id} hover>
          <TableCell padding="checkbox">
            <Checkbox
              onChange={() => onSelect(dataObj.id)}
              color="primary"
              checked={selectedIds.includes(dataObj.id)}
            />
          </TableCell>
          {dataObj.nodes.map((node, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableCell key={index}>{node}</TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
};
