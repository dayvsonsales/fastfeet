import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dayvson.mobi/fastfeet-api',
});

export default api;
