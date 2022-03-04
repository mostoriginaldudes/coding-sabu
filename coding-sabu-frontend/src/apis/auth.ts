import httpRequest from 'apis/instance';
import { LoginInfo, SignupInfo, User } from 'types';

export const loginRequest = (loginInfo: LoginInfo) =>
  httpRequest.post<User>('/auth/login', loginInfo);

export const signupRequest = (signupInfo: SignupInfo) =>
  httpRequest.post<User>('/auth/users', signupInfo);

export const checkEmailRequest = (email: string) =>
  httpRequest.get<string>(`/auth/user/email/${email}`);

export const editUserRequest = (userInfo: FormData) => httpRequest.put<User>('/user', userInfo);

export const logoutRequest = () => httpRequest.get<void>('/auth/logout');

export const reissueAccessTokenRequest = () => httpRequest.get<void>('/auth/access');
