import httpRequest from 'apis/instance';

export const login = (requestBody: LoginInfo) =>
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

export const signup = (requestBody: SignupInfo) =>
  httpRequest.post('/auth/users', requestBody);
