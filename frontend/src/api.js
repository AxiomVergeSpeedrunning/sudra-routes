import axios from 'axios';
import Cookies from 'js-cookie';

class API {
  static initAxios() {
    this.serverTimeOffset = 0;

    this.api = axios.create({
      baseURL: '/api/v1/',
      responseType: 'json',
      headers: { 'X-REQUESTED-WITH': 'XMLHttpRequest' },
    });
    this.api.interceptors.request.use(config => {
      const authToken = Cookies.get('authToken');

      if (authToken) {
        config.headers.Authorization = `Token ${authToken}`;
      }

      config.headers['Content-Type'] = 'application/json';

      return config;
    });

    this.api.interceptors.response.use(response => response.data);
  }

  static async getTutorials() {
    return this.api.get('tutorials/all/');
  }

  static async checkAuthentication() {
    return this.api.get('auth/check/');
  }

  static async login({ username, password }) {
    return this.api.post('auth/login/', { username, password });
  }

  static async register({ username, email, password }) {
    return this.api.post('auth/register/', { username, email, password });
  }

  static async getTrackerInfo({ uid }) {
    return this.api.get(`get/${uid}/`, { baseURL: '/tracker' });
  }

  static async discordAuth({ token }) {
    return this.api.post('auth/store-discord/', { token });
  }
}

API.initAxios();

export default API;
