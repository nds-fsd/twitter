import axios from "axios";
import { getUserToken } from "../local-storage";

export const userApi = () => {
  const token = getUserToken();

  return axios.create({
    baseURL: "http://localhost:3001/user",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userRegisterApi = () => {
  return axios.create({
    baseURL: "http://localhost:3001/user/register",
    headers: { "Content-Type": "application/json" },
  });
};
export const meowApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: "http://localhost:3001/meow",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const followApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: "http://localhost:3001/follow",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likeApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: "http://localhost:3001/like",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
