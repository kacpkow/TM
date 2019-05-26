import axios from 'axios';
import { API_URL } from '../config/constants';
import UserContext from '../contexts/User';

export default (opts = {}) => {
  const { user } = UserContext();

  const headers = {};

  if (user) {
    headers.Authorization = `Token ${user.token}`;
  }

  if (opts.multipart) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  return axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  });
};
