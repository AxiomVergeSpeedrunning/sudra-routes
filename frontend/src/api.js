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
      config.headers['X-CSRFToken'] = Cookies.get('csrftoken');
      config.headers['Content-Type'] = 'application/json';

      return config;
    });

    this.api.interceptors.response.use(response => response.data);
  }

  static async getTutorials() {
    return await this.api.get('tutorials/all/');
  }
}

API.initAxios();

export default API;
