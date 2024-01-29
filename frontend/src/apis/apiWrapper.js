import axios from "axios";


const BASE_URL = process.env.REACT_APP_BACKEND_URL

export const userApi = axios.create({
  baseURL: `${BASE_URL}/user`,
  headers: { "Content-Type": "application/json" },
});

export const userRegisterApi = axios.create({
  baseURL: `${BASE_URL}/user/register`,
  headers: { "Content-Type": "application/json" },
});

export const meowApi = axios.create({
  baseURL: `${BASE_URL}/meow`,
  headers: { "Content-Type": "application/json" },
});

export const followApi = axios.create({
  baseURL: `${BASE_URL}/follow`,
  headers: { "Content-Type": "application/json" },
});

export const likeApi = axios.create({
  baseURL: `${BASE_URL}/like`,
  headers: { "Content-Type": "application/json" },
});
