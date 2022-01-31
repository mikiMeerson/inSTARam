import { AxiosRequestHeaders } from 'axios';

const authHeader = (): AxiosRequestHeaders => {
  try {
    const userStr = localStorage.getItem('user');
    if (typeof userStr !== 'string') throw new Error('User info not found');

    const user = JSON.parse(userStr);

    if (!(typeof user.accessToken === 'string'
        && user.accessToken.length > 0)) {
      throw new Error('Invalid user access token');
    }

    return { 'x-access-token': user.accessToken };
  } catch {
    return {};
  }
};

export default authHeader;
