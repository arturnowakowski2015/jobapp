import { ColumnName } from 'components/table/Table.types';

import { CandidatesTableColumnNames } from './Candidates.types';

export const candidatesColumns: ColumnName<CandidatesTableColumnNames>[] = [
  { id: 'name', displayName: 'User' },
  { id: 'date', displayName: 'Date' },
  { id: 'position', displayName: 'Position' },
  { id: 'actions', displayName: 'Actions' },
];
