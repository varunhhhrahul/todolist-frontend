import axios from 'axios';

const BASE_URL =
  // 'http://localhost:5000/todolist-backend-15ebe/us-central1/app/api/v1';
  'https://us-central1-todolist-backend-15ebe.cloudfunctions.net/app/api/v1';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default API;
