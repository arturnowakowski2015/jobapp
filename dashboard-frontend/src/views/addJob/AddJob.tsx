import { useAddJob } from 'api/addJob/useAddJob';
import { JobForm } from 'components/jobForm/JobForm';

export const AddJob = () => {
  const { addJob } = useAddJob();

  return <JobForm type="add" handleJobFormSubmission={addJob} />;
};
