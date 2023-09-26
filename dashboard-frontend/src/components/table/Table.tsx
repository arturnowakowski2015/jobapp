import { TableContainer, Table as MuiTable } from '@mui/material';
import { useCallback, useMemo, useState } from 'react';

import { TableProps } from './Table.types';
import { TableBody } from './TableBody';
import { TableHead } from './TableHead';

export const Table = <T extends string>({
  columnNames,
  data,
  renderAboveTable,
  renderBelowTable,
}: TableProps<T | 'id'>) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const dataSortedByColNames = useMemo(
    () =>
      data.map(dataObj => ({
        id: dataObj.id as string,
        nodes: Object.keys(dataObj)
          .filter(key => key !== 'id')
          .sort(
            (a, b) =>
              columnNames.findIndex(col => col.id === a) -
              columnNames.findIndex(col => col.id === b),
          )
          .map(key => dataObj[key as T]),
      })),
    [columnNames, data],
  );

  const isAllSelected = useMemo(
    () => selectedIds.length === data.length,
    [data.length, selectedIds.length],
  );

  const onSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(dataSortedByColNames.map(d => d.id));
  };

  const onSelect = useCallback((id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id],
    );
  }, []);

  return (
    <>
      {renderAboveTable &&
        renderAboveTable({
          selectedIds,
          onSelect,
        })}
      <TableContainer>
        <MuiTable>
          <TableHead
            columnNames={columnNames}
            isAllSelected={isAllSelected}
            onSelectAll={onSelectAll}
          />
          <TableBody
            onSelect={onSelect}
            selectedIds={selectedIds}
            data={dataSortedByColNames}
          />
        </MuiTable>
      </TableContainer>
      {renderBelowTable && renderBelowTable()}
    </>
  );
};
