import styles from './Public-home.module.css'
import Cat from '../assets/Cat.png'
import RegisterForm from './RegisterForm'
import { useState } from 'react'

const PublicHome = ( ) => {

     const [popUp, setpopUp] = useState(false);

     const registerForm = ()=> {
        setpopUp(!popUp)

     }
   
     if(popUp) {
        return(
            <RegisterForm></RegisterForm>
           
        )

     }


    return(
        <div className={styles.container}>
           
            <img src={Cat} />

            <div className={styles.right}>
                <h1>Happening now</h1>
              <div className={styles.buttons}>
                <button style={{backgroundColor: "#00A9A5"}} onClick={()=>{registerForm()}} >Create account</button>
                <p>Or</p>
                <button>Login</button>

              </div>

            </div>
          
         
           

        </div>
    )
}

export default PublicHome;