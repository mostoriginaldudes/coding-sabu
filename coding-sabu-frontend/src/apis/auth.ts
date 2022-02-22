import httpRequest from 'apis/instance';
import { LoginInfo, SignupInfo, User } from 'types';

export const login = (loginInfo: LoginInfo) =>
  httpRequest.post<User>('/auth/login', loginInfo);

export const signup = (signupInfo: SignupInfo) =>
  httpRequest.post<User>('/auth/users', signupInfo);

export const checkEmail = (email: string) =>
  httpRequest.get<string>(`/auth/user/email/${email}`);

export const editUser = (userInfo: FormData) =>
  httpRequest.put<User>('/user', userInfo);

export const logout = () => httpRequest.get<void>('/auth/logout');
