import { AddJobPayload } from 'api/addJob/addJob.types';

export type JobFormProps =
  | {
      type: 'edit';
      defaultValues: Partial<AddJobPayload>;
      handleJobFormSubmission: (
        payload: Partial<AddJobPayload>,
      ) => Promise<void>;
    }
  | {
      type: 'add';
      handleJobFormSubmission: (payload: AddJobPayload) => Promise<void>;
    };
