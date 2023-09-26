import { useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';

import { CandidatesForm } from 'components/candidatesForm/CandidatesForm';
import { useCandidate } from 'api/candidate/useCandidate';
import { useEditCandidate } from 'api/editCandidate/useEditCandidate';

export const EditCandidate = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error('Missing candidate id');
  }

  const { data, errorMessage, isLoading } = useCandidate(id);
  const { editCandidate } = useEditCandidate();

  if (isLoading) return <CircularProgress />;

  if (!data || errorMessage)
    return (
      <Typography color="error">
        Something went wrong. Please try again.
      </Typography>
    );

  return (
    <CandidatesForm
      type="edit"
      defaultValues={data}
      handleCandidateFormSubmission={editCandidate(id)}
    />
  );
};
