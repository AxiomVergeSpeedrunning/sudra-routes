import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.twitch.tv/helix/',
  headers: {
    // The client ID can be public, so it's safe to put this in hardcoded
    'Client-ID': 'gw6m21unatsk0qatoe5k5osycugpog',
  },
});

api.interceptors.response.use(response => response.data);

export default api;
