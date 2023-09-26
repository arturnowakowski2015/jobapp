import { LoginAction, LoginReducerState } from './login.types';

export const defaultLoginReducerState: LoginReducerState = {
  isLoading: false,
  errorMessage: undefined,
};

export const loginReducer = (
  state: LoginReducerState,
  action: LoginAction,
): LoginReducerState => {
  switch (action.type) {
    case 'init':
      return { isLoading: true, errorMessage: undefined };

    case 'finish':
      return { ...state, isLoading: false };

    case 'error':
      return { isLoading: false, errorMessage: action.payload };

    default:
      throw new Error('Wrong action type');
  }
};
