export type LoginPayload = {
  username: string;
  password: string;
};

export type InitLoginAction = { type: 'init' };
export type ErrorLoginAction = { type: 'error'; payload: string };
export type FinishLoginAction = { type: 'finish' };

export type LoginResponse = {
  access_token: string;
};

export type LoginAction =    
  | InitLoginAction
  | ErrorLoginAction
  | FinishLoginAction;

export type LoginReducerState =
  | {
      isLoading: true;
      errorMessage: undefined;
    }
  | {
      isLoading: false;
      errorMessage: string | undefined;
    };
