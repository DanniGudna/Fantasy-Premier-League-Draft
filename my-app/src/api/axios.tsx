import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',

  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  responseType: 'json',
});

export default instance;
