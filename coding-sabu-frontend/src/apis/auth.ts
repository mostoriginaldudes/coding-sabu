import httpRequest from 'apis/instance';
import { LoginInfo, SignupInfo } from 'types';

export const login = (requestBody: LoginInfo) =>
  httpRequest.post('/auth/login', requestBody);

export const signup = (requestBody: SignupInfo) =>
  httpRequest.post('/auth/users', requestBody);
