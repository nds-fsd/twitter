import { useState } from "react"
import { useEffect } from "react";
import { meowApi } from "./meowsApi/apiiWrapper"


function App() {

  const [mewos, setMeows] = useState('');
  const [error, setError] = useState(false)

   const getAllMeows = async ()=> {

    try{
        const res = await meowApi.get('/')
   } catch(error){
      setError(true);
      console.log(error)
   }
        
}

   return (
    <div>
       
    </div>


  )
}

export default App
