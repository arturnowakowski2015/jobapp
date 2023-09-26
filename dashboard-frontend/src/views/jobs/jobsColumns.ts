import { ColumnName } from 'components/table/Table.types';

import { JobsTableColumnNames } from './Jobs.types';

export const jobsColumns: ColumnName<JobsTableColumnNames>[] = [
  { id: 'position', displayName: 'Position' },
  { id: 'date', displayName: 'Date' },
  { id: 'actions', displayName: 'Actions' },
];
