import { meowApi } from "./apiWrapper";

export const postMeow = async () => {
  try {
    const res = await meowApi.post("/");
  } catch (error) {
    console.log(error);
  }
};

export const updateMeow = async (id) => {
  try {
    const res = await meowApi.patch(`/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const deleteMeow = async (id) => {
  try {
    const res = await meowApi.delete(`/${id}`);
  } catch (error) {
    console.log(error);
  }
};

export const getMeowById = async (id) => {
  try {
    const res = await meowApi.get(`/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};