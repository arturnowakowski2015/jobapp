export type PasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
export type LoginResponse = {
  accessToken: string;
};
export type DataPayload = {
  firstName: string;
  lastName: string;
};
