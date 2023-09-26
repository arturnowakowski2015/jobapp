import { useAddCandidate } from 'api/addCandidate/useAddCandidate';
import { CandidatesForm } from 'components/candidatesForm/CandidatesForm';

export const AddCandidate = () => {
  const { addCandidate } = useAddCandidate();

  return (
    <CandidatesForm type="add" handleCandidateFormSubmission={addCandidate} />
  );
};
