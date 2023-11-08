export type UseQueryProps = {
  url: string;
  initFetch: boolean;
};

export type InitLoginAction = { type: 'init' };
export type ErrorLoginAction = { type: 'error'; payload: string };
export type SuccessAction = { type: 'success'; payload: any };

export type LoginResponse = {
  access_token: string;
};

export type QueryAction = InitLoginAction | ErrorLoginAction | SuccessAction;

export type QueryState<T> =
  | {
      isLoading: true;
      errorMessage: undefined;
      data: undefined;
    }
  | {
      isLoading: false;
      errorMessage: string;
      data: T;
    }
  | { isLoading: false; errorMessage: undefined; data: any };
