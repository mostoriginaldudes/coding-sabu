import httpRequest from 'apis/instance';

interface LoginRequestBody {
  email: string;
  password: string;
}

interface SignupRequestBody extends LoginRequestBody {
  userType: 'teacher' | 'student';
  nickname: string;
  phoneNum: string;
  description: string;
  profileImage: string | null;
}

export const login = (requestBody: LoginRequestBody) =>
  httpRequest.post('/auth/login', requestBody);

export const signup = (requestBody: SignupRequestBody) =>
  httpRequest.post('/auth/users', requestBody);
