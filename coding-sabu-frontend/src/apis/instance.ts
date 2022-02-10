import Axios, { AxiosResponse } from 'axios';

const instance = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000
});

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),

  post: (url: string, body: {}) => instance.post(url, body).then(responseBody),

  put: (url: string, body: {}) => instance.put(url, body).then(responseBody),

  patch: (url: string, body: {}) =>
    instance.patch(url, body).then(responseBody),

  delete: (url: string) => instance.delete(url).then(responseBody)
};

export default requests;
