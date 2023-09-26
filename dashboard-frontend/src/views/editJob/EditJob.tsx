import { CircularProgress, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { useEditJob } from 'api/editJob/useEditJob';
import { useJob } from 'api/job/useJob';
import { JobForm } from 'components/jobForm/JobForm';

export const EditJob = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('Missing job id');
  }

  const { data, errorMessage, isLoading } = useJob(id);
  const { editJob } = useEditJob();

  if (isLoading) return <CircularProgress />;

  if (!data || errorMessage)
    return (
      <Typography color="error">
        Something went wrong. Please try again.
      </Typography>
    );

  return (
    <JobForm
      defaultValues={data}
      type="edit"
      handleJobFormSubmission={editJob(id)}
    />
  );
};
