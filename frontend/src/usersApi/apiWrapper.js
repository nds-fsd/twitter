import axios from "axios";

export  const userApi = axios.create({
    baseURL: 'http://localhost:3001/user',
    headers: {'Content-Type': 'application/json',}
});





