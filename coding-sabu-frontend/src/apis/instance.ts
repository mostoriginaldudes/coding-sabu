import Axios, {
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import store from 'store';
import { setToken } from 'store/auth';

import { reissueAccessTokenRequest } from './auth';
import { UNAUTHORIZED } from 'fixtures/auth/constants';
import AUTH_FAIL from 'fixtures/auth/fail';
import AuthorizationError from 'errors/AuthorizationError';

type Response<T = any> = {
  response: T;
  token?: string;
};

interface HttpRequestInstance extends AxiosInstance {
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>;
    response: AxiosInterceptorManager<AxiosResponse<Response>>;
  };
  head<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  options<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  patch<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

const instance: HttpRequestInstance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000,
  withCredentials: true
});

type Store = typeof store;
let injectedStore: Store;
export const injectStore = (_store: Store) => {
  injectedStore = _store;
};

instance.interceptors.request.use(req => {
  return loadAccessTokenToHttpHeader(req);
});

const loadAccessTokenToHttpHeader = (req: AxiosRequestConfig) => {
  if (req && req.headers) {
    req.headers['Authorization'] = injectedStore.getState().auth.token || '';
  }
  return req;
};

instance.interceptors.response.use(async res => {
  if (isSuccess(res.status)) {
    saveAccessTokenToStore(res);
  } else if (res.status === UNAUTHORIZED) {
    reissueAccessToken();
  }
  return res.data;
});

const isSuccess = (status: number) => status === 200 || status === 201;

const existAccessToken = (res: AxiosResponse) =>
  res.headers && res.headers.authorization;

const saveAccessTokenToStore = (res: AxiosResponse) => {
  if (existAccessToken(res)) {
    if (!injectedStore.getState().auth.token) {
      injectedStore.dispatch(setToken(res.headers.authorization));
    }
  }
};

const reissueAccessToken = async () => {
  try {
    await reissueAccessTokenRequest();
  } catch (error) {
    throw new AuthorizationError(AUTH_FAIL.UNAUTHORIZED);
  }
};

export default instance;
