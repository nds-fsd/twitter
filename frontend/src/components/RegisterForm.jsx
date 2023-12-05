import styles from './RegisterForm.module.css'
import { useForm } from "react-hook-form";
import React, { useState } from "react";




const RegisterForm = ()=> {

 
    const { register, handleSubmit } = useForm();



    return(
        <div >
            <h2>Create your account</h2>
           
           <h3 style={{color: "white"}}>Personal details</h3>
            <form action="">
                
                    <div>
                    <input type="text" name="" placeholder="Name"/>
                    </div>
                   
                   <div> 
                   <input type="text" name="" placeholder="Surname"/> 
                   </div>

                  <div>
                    <input type="text" name="" placeholder="Email" />
                  </div>
                  
                   <div className={styles.date}>
                   <label htmlFor="">Date of birth</label>
                   <input type="date" />
                  </div>



                  <h3  style={{color: "white"}}>Username and password</h3>

                  <div>
                    <input type="text" placeholder='Username' />
                  </div>

                  <div>
                    <input type="password" placeholder='Password' />
                    <input type="password" placeholder='Confirm your password'/>
                  </div>

                
                  
  
                
                

            </form>
        </div>

    )
}

export default RegisterForm;