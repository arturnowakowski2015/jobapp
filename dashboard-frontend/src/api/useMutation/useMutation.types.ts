import { AxiosInstance } from 'axios';

export type UseMutationProps<T, R> = {
  mutateFn: (axios: AxiosInstance) => (arg: T) => Promise<R>;
  onSuccess: (res: R) => void;
};

export type InitLoginAction = { type: 'init' };
export type ErrorLoginAction = { type: 'error'; payload: string };
export type FinishLoginAction = { type: 'finish' };

export type LoginResponse = {
  access_token: string;
};

export type MutationAction =
  | InitLoginAction
  | ErrorLoginAction
  | FinishLoginAction;

export type MutationState =
  | {
      isLoading: true;
      errorMessage: undefined;
    }
  | {
      isLoading: false;
      errorMessage: string | undefined;
    };
