import { QueryAction, QueryState } from './useQuery.types';

export const defaultState: QueryState<any> = {
  isLoading: false,
  errorMessage: undefined,
  data: undefined,
};

export const queryReducer = <T>(
  state: QueryState<T>,
  action: QueryAction,
): QueryState<any> => {
  switch (action.type) {
    case 'init':
      return { isLoading: true, errorMessage: undefined, data: undefined };

    case 'error':
      return {
        isLoading: false,
        errorMessage: action.payload,
        data: undefined,
      };

    case 'success':
      return {
        isLoading: false,
        errorMessage: undefined,
        data: action.payload,
      };

    default:
      throw new Error('Wrong action type');
  }
};
