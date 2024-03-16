import axios from "axios";
import { getUserToken } from "./localStorage";

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const userApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/users`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const meowApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/meows`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const followApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/follows`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const likeApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/likes`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const bookmarkApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/bookmarks`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cloudinaryApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/cloudinary`,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const notificationApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/notifications`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const chatApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/chats`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const messageApi = () => {
  const token = getUserToken();
  return axios.create({
    baseURL: `${BASE_URL}/messages`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
