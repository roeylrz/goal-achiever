import axios from 'axios';
import keys from './keys';

const instance = axios.create({
  baseURL: `${keys.baseURL}:${keys.basePort}`,
  timeout: 120000
});

export default instance;
