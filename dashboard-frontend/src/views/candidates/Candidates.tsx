import { Delete, Visibility } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { useCandidates } from 'api/candidates/useCandidates';
import { AppRoute, getSingleCandidateUrl } from 'AppRoute';
import { Table } from 'components/table/Table';

import * as styles from './candidates.styles';
import { CandidatesTableColumnNames } from './Candidates.types';
import { candidatesColumns } from './candidatesColumns';
import { candidatesRowsPerPage } from './candidatesRowsPerPage';

export const Candidates = () => {
  const {
    data,
    errorMessage,
    isLoading,
    searchResult,
    page,
    rowsPerPage,
    paginatedData,
    searchTerm,
    onSearchTerm,
    onCandidateDelete,
    onChangePage,
    onChangeRowsPerPage,
  } = useCandidates();

  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;

  if (errorMessage || !paginatedData || !data) {
    return (
      <Typography color="error">
        Something went wrong while loading candidates data, please try again
      </Typography>
    );
  }

  const candidates = Object.values(searchResult || paginatedData).map(
    candidate => ({
      position: candidate.position,
      name: candidate.name,
      date: candidate.date,
      id: candidate.id,
      actions: (
        <Box>
          <IconButton onClick={() => onCandidateDelete(candidate.id)}>
            <Delete />
          </IconButton>
          <IconButton
            onClick={() =>
              navigate(getSingleCandidateUrl(candidate.id.toString(10)))
            }
          >
            <Visibility />
          </IconButton>
        </Box>
      ),
    }),
  );

  return (
    <Table<CandidatesTableColumnNames>
      columnNames={candidatesColumns}
      data={candidates}
      renderAboveTable={({ selectedIds, onSelect }) => (
        <Box sx={styles.aboveTableContainer}>
          <Select
            disabled={selectedIds.length === 0}
            onChange={async e => {
              if (e.target.value === 'delete') {
                await Promise.all(
                  selectedIds.map(async id => {
                    await onCandidateDelete(parseInt(id, 10));
                    onSelect(id);
                  }),
                );
              }
            }}
            value="actions"
          >
            <MenuItem value="actions">Actions</MenuItem>
            <MenuItem value="delete">Delete</MenuItem>
          </Select>
          <TextField
            type="search"
            label="Search candidate"
            onChange={e => onSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Button
            component={Link}
            to={AppRoute.addCandidate}
            variant="contained"
            sx={styles.addButton}
          >
            Add
          </Button>
        </Box>
      )}
      renderBelowTable={() => (
        <TablePagination
          rowsPerPageOptions={candidatesRowsPerPage}
          component="div"
          count={Object.keys(data).length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_event, newPage) => {
            onChangePage(newPage);
          }}
          onRowsPerPageChange={event => {
            onChangeRowsPerPage(parseInt(event.target.value, 10));
          }}
        />
      )}
    />
  );
};
