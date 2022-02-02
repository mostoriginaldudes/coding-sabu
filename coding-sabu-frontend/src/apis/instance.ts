import Axios from 'axios';

const httpRequest = Axios.create({
  baseURL: 'http://localhost:3001'
});

export default httpRequest;
