import axios from 'axios';

const baseUrl = 'http://localhost:4000';

class AuthService {
  login(username: string, password: string) {
    const credentials = {
      username,
      password,
    };
    return axios
      .post(`${baseUrl}/signin`, credentials)
      .then((response) => {
        console.log(response);
        if (response.data.user) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(name: string, unit: string, password: string) {
    return axios.post(`${baseUrl}/add-user`, {
      name,
      unit,
      password,
    });
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);

    return null;
  }
}

export default new AuthService();
