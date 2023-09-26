import { useCallback, useEffect, useState } from 'react';

import { useAxios } from 'api/axios/useAxios';
import { candidatesRowsPerPage } from 'views/candidates/candidatesRowsPerPage';

import { CandidatesResponse } from './candidates.types';

export const useCandidates = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [data, setData] = useState<CandidatesResponse>();
  const axios = useAxios();
  const [paginatedData, setPaginatedData] = useState<CandidatesResponse>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(candidatesRowsPerPage[0]!);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<CandidatesResponse>();

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

  const fetchCandidatesData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(undefined);

    try {
      const { data: profileData } = await axios.get<CandidatesResponse>(
        '/candidates',
      );
      setData(profileData);
    } catch (_error) {
      setErrorMessage('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  }, [axios]);

  useEffect(() => {
    fetchCandidatesData();
  }, [fetchCandidatesData]);

  const onSearch = useCallback(async () => {
    if (!paginatedData) return;
    if (searchTerm.trim().length === 0) {
      setSearchResult(undefined);
      return;
    }

    const result = Object.fromEntries(
      Object.entries(paginatedData).filter(([, value]) =>
        value.name
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

  const onCandidateDelete = useCallback(
    async (id: number) => {
      await axios.delete(`candidates/${id}`);
      setData(prev => {
        if (!prev) return prev;
        const { [id]: removedCandidate, ...remainingCandidates } = prev;
        return remainingCandidates;
      });
    },
    [axios],
  );

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
    onCandidateDelete,
    onChangePage,
    onChangeRowsPerPage,
  };
};
