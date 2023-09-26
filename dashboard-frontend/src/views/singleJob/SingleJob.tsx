import { Button, CircularProgress, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';

import { useJob } from 'api/job/useJob';
import { getEditJobUrl } from 'AppRoute';

export const SingleJob = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    throw new Error('jobId missing in SingleJob route');
  }

  const { data, errorMessage, isLoading } = useJob(id);

  if (isLoading) return <CircularProgress />;

  if (errorMessage || !data) {
    return (
      <Typography color="error">
        Something went wrong while loading jobs data, please try again
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h2">Job: {data.title}</Typography>
      <Typography>Company: {data.companyName}</Typography>
      <Typography>Created at: {data.date}</Typography>
      <Typography>Description:</Typography>
      <Typography>{data.longDescription}</Typography>
      <Button component={Link} to={getEditJobUrl(id)} variant="contained">
        Edit
      </Button>
    </>
  );
};
