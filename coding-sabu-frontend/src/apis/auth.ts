import httpRequest from 'apis/instance';
import { LoginInfo, SignupInfo } from 'types';

export const login = (loginInfo: LoginInfo) =>
  httpRequest.post('/auth/login', loginInfo);

export const signup = (signupInfo: SignupInfo) =>
  httpRequest.post('/auth/users', signupInfo);

export const checkEmail = (email: string) =>
  httpRequest.get(`/auth/user/email/${email}`);
