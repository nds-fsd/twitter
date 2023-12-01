import { meowApi } from "./apiiWrapper"






export const deleteMeow = async (id) => {

   await meowApi.delete(`/${id}`)
}