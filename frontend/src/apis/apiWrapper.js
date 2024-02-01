import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const userApi = () => {
  const token = getUserToken();

  return axios.create({
    baseURL: `${BASE_URL}/user`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const userRegisterApi = () => {
  return axios.create({
    baseURL: `${BASE_URL}/user/register`,
    headers: { "Content-Type": "application/json" },
  });
};

export const meowApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/meow`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const followApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/follow`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likeApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/like`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
