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

import { useJobs } from 'api/jobs/useJobs';
import { AppRoute, getSingleJobUrl } from 'AppRoute';
import { Table } from 'components/table/Table';

import * as styles from './Job.styles';
import { JobsTableColumnNames } from './Jobs.types';
import { jobsColumns } from './jobsColumns';
import { jobRowsPerPage } from './jobsRowsPerPage';

export const Jobs = () => {
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
    onJobDelete,
    onChangePage,
    onChangeRowsPerPage,
  } = useJobs();

  const navigate = useNavigate();

  if (isLoading) return <CircularProgress />;

  if (errorMessage || !paginatedData || !data) {
    return (
      <Typography color="error">
        Something went wrong while loading jobs data, please try again
      </Typography>
    );
  }

  const jobs = Object.values(searchResult || paginatedData).map(job => ({
    position: job.title,
    date: job.date,
    id: job.id,
    actions: (
      <Box>
        <IconButton onClick={() => onJobDelete(job.id)}>
          <Delete />
        </IconButton>
        <IconButton
          onClick={() => navigate(getSingleJobUrl(job.id.toString(10)))}
        >
          <Visibility />
        </IconButton>
      </Box>
    ),
  }));

  return (
    <Table<JobsTableColumnNames>
      columnNames={jobsColumns}
      data={jobs}
      renderAboveTable={({ selectedIds, onSelect }) => (
        <Box sx={styles.aboveTableContainer}>
          <Select
            disabled={selectedIds.length === 0}
            onChange={async e => {
              if (e.target.value === 'delete') {
                await Promise.all(
                  selectedIds.map(async id => {
                    await onJobDelete(parseInt(id, 10));
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
            label="Search job"
            onChange={e => onSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <Button
            component={Link}
            to={AppRoute.addJob}
            variant="contained"
            sx={styles.addButton}
          >
            Add
          </Button>
        </Box>
      )}
      renderBelowTable={() => (
        <TablePagination
          rowsPerPageOptions={jobRowsPerPage}
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
