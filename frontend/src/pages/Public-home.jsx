import styles from './Public-home.module.css'
import Cat from '../assets/Cat.png'
import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import { useState } from 'react'
 

const PublicHome = ( ) => {

     const [popUp, setpopUp] = useState(false);
     const [popUp2, setpopUp2] = useState(false);

   const handlePopUpClick = ()=>{
    setpopUp(!popUp);
    setpopUp2(false);

   }

   const handlePopUp2Click = ()=>{
    setpopUp2(!popUp2);
    setpopUp(false);

   }

   const changeToLoginForm = ()=> {
    setpopUp(false);
    setpopUp2(true);
   }

   const changeToRegisterForm = ()=> {
    setpopUp2(false);
    setpopUp(true);
   }
     
     
  

window.addEventListener('keydown', (e)=>{
    if (e.key === 'Escape'){
      setpopUp(false)
      setpopUp2(false)

    } 
})


    return(
        <>
           <div    className={styles.container} style={{ opacity: popUp||popUp2 ? '0.8' : '1', backgroundColor: popUp||popUp2 ? 'grey' : 'black' }} >
           
           <img src={Cat} />

           <div className={styles.right}>
               <h1>Happening now</h1>
             <div className={styles.buttons}>
               <button disabled={popUp||popUp2} style={{backgroundColor: "#00A9A5"}} onClick={handlePopUpClick} >Create account</button>
               <p>Or</p>
               <button disabled={popUp||popUp2} onClick={handlePopUp2Click}>Login</button>

             </div>

           </div>
          
         </div>
         {popUp&&(<RegisterForm close={()=> setpopUp(!popUp)} change={changeToLoginForm}/>)}
         {popUp2&&(<LoginForm close={()=> setpopUp2(!popUp2)} change={changeToRegisterForm}/>)}

        </>
       
        
         
      
          
    )
}

export default PublicHome;