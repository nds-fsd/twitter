import { meowApi } from "./apiiWrapper"


export const postMeow = async () => {

  try{
   
    const res = await meowApi.post('/');

  } catch(error){

    console.log(error);

  }
}




export const updateMeow = async (id) => {

   try{

    const res = await meowApi.patch(`/${id}`);

   }catch(error){

    console.log(error);
   }

}




export const deleteMeow = async (id) => {

  try{
    
  const res = await meowApi.delete(`/${id}`);

  }catch(error){
    
    console.log(error);
   
  }
}

