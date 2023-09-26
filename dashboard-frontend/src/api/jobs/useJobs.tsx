import { useCallback, useEffect, useState } from 'react';

import { useAxios } from 'api/axios/useAxios';
import { jobRowsPerPage } from 'views/jobs/jobsRowsPerPage';

import { JobsResponse } from './jobs.types';

export const useJobs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [data, setData] = useState<JobsResponse>();
  const axios = useAxios();
  const [paginatedData, setPaginatedData] = useState<JobsResponse>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(jobRowsPerPage[0]!);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<JobsResponse>();

  const paginateData = useCallback(() => {
    if (!data) return;

    const offset = page * rowsPerPage;
    const newPaginatedData = Object.fromEntries(
      Object.entries(data).slice(offset, offset + rowsPerPage),
    );

    if (searchResult) {
      const newSearchResult = Object.fromEntries(
        Object.entries(searchResult).slice(offset, offset + rowsPerPage),
      );
      setSearchResult(newSearchResult);
    }

    setPaginatedData(newPaginatedData);
  }, [data, page, rowsPerPage, searchResult]);

  useEffect(() => {
    paginateData();
  }, [paginateData]);

  const fetchJobsData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const { data: profileData } = await axios.get<JobsResponse>('/jobs');
      setData(profileData);
    } catch (_error) {
      setErrorMessage('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchJobsData();
  }, [fetchJobsData]);

  const onJobDelete = useCallback(
    async (id: number) => {
      await axios.delete(`jobs/${id}`);
      setData(prev => {
        if (!prev) return prev;
        const { [id]: removedJob, ...remainingJobs } = prev;
        return remainingJobs;
      });
    },
    [axios],
  );

  const onSearch = useCallback(async () => {
    if (!paginatedData) return;
    if (searchTerm.trim().length === 0) {
      setSearchResult(undefined);
      return;
    }

    const result = Object.fromEntries(
      Object.entries(paginatedData).filter(([, value]) =>
        value.title
          .toLowerCase()
          .trim()
          .includes(searchTerm.toLowerCase().trim()),
      ),
    );

    setSearchResult(result);
  }, [paginatedData, searchTerm]);

  useEffect(() => {
    onSearch();
  }, [onSearch]);

  const onSearchTerm = useCallback((newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
  }, []);

  const onChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const onChangeRowsPerPage = useCallback((newPage: number) => {
    setRowsPerPage(newPage);
  }, []);

  return {
    data,
    isLoading,
    errorMessage,
    searchResult,
    page,
    rowsPerPage,
    paginatedData,
    searchTerm,
    onSearchTerm,
    onJobDelete,
    onChangePage,
    onChangeRowsPerPage,
  };
};
