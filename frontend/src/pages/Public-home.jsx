import styles from './Public-home.module.css'
import Cat from '../assets/Cat.png'
import RegisterForm from './RegisterForm'
import { useState } from 'react'
 

const PublicHome = ( ) => {

     const [popUp, setpopUp] = useState(false);

     
     
  

window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape') setpopUp(!popUp)
})


    return(
        <>
           <div    className={styles.container} style={{ opacity: popUp ? '0.7' : '1' }}>
           
           <img src={Cat} />

           <div className={styles.right}>
               <h1>Happening now</h1>
             <div className={styles.buttons}>
               <button style={{backgroundColor: "#00A9A5"}} onClick={()=>{setpopUp(!popUp)}} >Create account</button>
               <p>Or</p>
               <button>Login</button>

             </div>

           </div>
          
         </div>
         {popUp&&(<RegisterForm close={()=> setpopUp(!popUp)} />)}
        </>
       
        
         
      
          
    )
}

export default PublicHome;