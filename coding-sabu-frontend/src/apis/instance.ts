import Axios, {
  AxiosError,
  AxiosInstance,
  AxiosInterceptorManager,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';

import store from 'store';
import { setToken, logout } from 'store/auth';
import { FORBIDDEN, UNAUTHORIZED } from 'fixtures/auth/constants';
import { reissueAccessTokenRequest } from './auth';

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

instance.interceptors.response.use(
  res => {
    if (isSuccess(res.status)) {
      saveAccessTokenToStore(res);
    }
    return res.data;
  },
  async (error: AxiosError) => {
    const { response } = error;
    const statusCode = response?.status;

    if (statusCode === UNAUTHORIZED) {
      await reissueAccessTokenRequest();
    } else if (statusCode === FORBIDDEN) {
      injectedStore.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

const isSuccess = (status: number) => status === 200 || status === 201;

const existAccessToken = (res: AxiosResponse) => res.headers && res.headers.authorization;

const saveAccessTokenToStore = (res: AxiosResponse) => {
  if (existAccessToken(res)) {
    const newAccessToken = res.headers.authorization;
    if (injectedStore.getState().auth.token !== newAccessToken) {
      injectedStore.dispatch(setToken(newAccessToken));
    }
  }
};

export default instance;
