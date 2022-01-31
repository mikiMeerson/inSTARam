import axios, { AxiosRequestConfig } from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(`${API_URL}all`);
  }

  getUserBoard() {
    const requestConfig: AxiosRequestConfig = { headers: authHeader() };
    return axios.get(`${API_URL}user`, requestConfig);
  }

  getModeratorBoard() {
    return axios.get(`${API_URL}mod`, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(`${API_URL}admin`, { headers: authHeader() });
  }
}

export default new UserService();
