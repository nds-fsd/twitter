import { useState } from "react"
import { useEffect } from "react";
import { meowApi } from "./meowsApi/apiiWrapper"


function App() {

  const [meows, setMeows] = useState('');
  const [error, setError] = useState(false)



useEffect(()=> {
   const getAllMeows = async ()=> {

      try{
          const res = await meowApi.get('/');
          const data = res.data
  
          
          setMeows(data)
          
         
     } catch(error){
       
        console.log(error)
        setError(true)
     }
   
          }
   getAllMeows()

}, [])
   
         return (
         
            meows&&meows.map( meow =>{

               return <div key={meow._id}>
                  {meow.text}<br/>
                  {meow.date}
               </div>

               
            }))
 
    
}

export default App
