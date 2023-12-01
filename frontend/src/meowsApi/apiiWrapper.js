import axios from 'axios';

export const meowApi = axios.create({
    baseURL: 'http://localhost:3001/meow',
    headers: {'Content-Type': 'application/json',}
});

