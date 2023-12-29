import axios from "axios";

export const meowApi = axios.create({
  baseURL: "http://localhost:3001/meow",
  headers: { "Content-Type": "application/json" },
});

export const followApi = axios.create({
  baseURL: "http://localhost:3001/follow",
  headers: { "Content-Type": "application/json" },
});

export const userApi = axios.create({
  baseURL: "http://localhost:3001/user",
  headers: { "Content-Type": "application/json" },
});

export const likeApi = axios.create({
  baseURL: "http://localhost:3001/like",
  headers: { "Content-Type": "application/json" },
});
