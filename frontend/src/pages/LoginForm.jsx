import styles from './LoginForm.module.css'
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from 'axios';

const userApi = axios.create({
    baseURL: 'http://localhost:3001/user/login',
    headers: {'Content-Type': 'application/json',}
});



const LoginForm = ({close, change})=> {


    const { register, formState: { errors }, handleSubmit } = useForm({mode: 'onSubmit'});

  
  
  
  
  
    const onSubmit = (data)=> {
        console.log(data)

        const login = async ()=> {
            try{
                const res = await userApi.post('/',data)
                console.log(res)
                console.log(res.data.token)
            }
            catch(err){
                console.log(err)
            }
    

        }
        
        login()

       
    }



    return(

        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)} action="">
            <header>
                <span onClick={close}  className={styles.x}>x</span>
             </header>
             <h2>Access to your account</h2>
             <div>
                    <input style={{width: '20rem'}} maxLength={80} type="text" name="" placeholder="Email" {...register("mail", { required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />
                    {errors.mail?.type === 'required' && <p className={styles.error}>Mail is required.</p>}
                    {errors.mail?.type === 'pattern' && <p className={styles.error}>Please enter a valid email.</p>}
                  </div>

                  <div>
                      <input style={{width: '20rem'}} maxLength={30} type="password" placeholder='Password' {...register("password",{required: true})} />
                      {errors.password?.type === 'required' && <p className={styles.error}>Password is required</p>}
                     
                       </div>
                       <div>
                  <input style={{width: '20.5rem'}} className={styles.submit} type="submit" value={"Log in"}></input>
                  </div>
                  <footer>
                  <p>If you don't have an account, <span onClick={change} style={{cursor:'pointer', color: "green",fontWeight: 'bold', textDecoration: 'underline'}}> register here</span></p>

                  </footer>

            </form>
        </div>

        
    )
}

export default LoginForm;