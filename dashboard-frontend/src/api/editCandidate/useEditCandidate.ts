import { AddJobPayload } from 'api/addJob/addJob.types';
import { useAxios } from 'api/axios/useAxios';

export const useEditCandidate = () => {
  const axios = useAxios();

  const editCandidate =
    (id: string) => async (payload: Partial<AddJobPayload>) => {
      await axios.put('/candidates', { ...payload, id: parseInt(id, 10) });
    };

  return { editCandidate };
};
