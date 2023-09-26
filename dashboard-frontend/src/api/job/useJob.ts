import { useCallback, useEffect, useState } from 'react';

import { useAxios } from 'api/axios/useAxios';
import { Job } from 'api/jobs/jobs.types';

export const useJob = (jobId: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [data, setData] = useState<Job>();
  const axios = useAxios();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const res = await axios.get<Job>(`/jobs/${jobId}`);
      setData(res.data);
    } catch (_error) {
      setErrorMessage('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [axios, jobId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    errorMessage,
  };
};
