import { useState } from "react"
import { useEffect } from "react";
import { meowApi } from "./meowsApi/apiiWrapper"
import { postMeow, updateMeow, deleteMeow } from "./meowsApi/meowsRequests";


function App() {

  const [meows, setMeows] = useState('');
  const [error, setError] = useState(false)
  const [errorMessage, seterrorMessage] = useState('')



useEffect(()=> {
   const getAllMeows = async ()=> {

      try{
          const res = await meowApi.get('/');
          const data = res.data
  
          
          setMeows(data)
          
         
     } catch(error){
       
        console.log(error)
        setError(true)
        seterrorMessage(error.message)
     }

     
   
          }
   getAllMeows()

}, [])


   if (error) return(
      <div style={{fontSize:'40px'}}>Ops, something went wrong!
         <p style={{fontSize:'20px', color: 'red', fontWeight: 'bold'}}>{errorMessage}</p>
      </div>
   )
   
         return (
         
            meows&&meows.map( meow =>{

               return <div key={meow._id}>
                  {meow.text}<br/>
                  <span>{meow.reposts}</span><span>{meow.likes}</span><span>{meow.views}</span>
                  {meow.date}
               </div>

               
            }))
 
    
}

export default App
