import { AddJobPayload } from 'api/addJob/addJob.types';
import { useAxios } from 'api/axios/useAxios';

export const useEditJob = () => {
  const axios = useAxios();

  const editJob = (id: string) => async (payload: Partial<AddJobPayload>) => {
    await axios.put('/jobs', { ...payload, id: parseInt(id, 10) });
  };

  return { editJob };
};
