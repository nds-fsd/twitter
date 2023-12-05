import styles from './RegisterForm.module.css'
import { useForm } from "react-hook-form";
import React, { useState } from "react";




const RegisterForm = ()=> {

 
    const { register, formState: { errors }, handleSubmit } = useForm();

       const onSubmit = (data)=> {

        console.log(data)


       }


       return(
        <div >
            <h2>Create your account</h2>
           
           <h3 style={{color: "white"}}>Personal details</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                
                    <div>
                    <input type="text" name="" placeholder="Name"  {...register("name", { required: true, })}  />
                    {errors.name?.type === 'required' && <p className={styles.error}>Name is required</p>}
                    </div>
                   
                   
                   <div> 
                   <input type="text" name="" placeholder="Surname" {...register("surname", { required: true, })} />
                   {errors.surname?.type === 'required' && <p className={styles.error}>Surname is required</p>} 
                   </div>

                  <div>
                    <input type="text" name="" placeholder="Email" {...register("mail", { required: true, })} />
                    {errors.mail?.type === 'required' && <p className={styles.error}>Mail is required</p>}
                  </div>
                  
                   <div className={styles.date}>
                   <label htmlFor="">Date of birth</label>
                   <input type="date" {...register("date", { required: true, })} />
                   {errors.date?.type === 'required' && <p className={styles.error}>Date is required</p>}
                  </div>



                  <h3  style={{color: "white"}}>Username and password</h3>

                  <div>
                    <input type="text" placeholder='Username' {...register("username", { required: true, })} />
                    {errors.username?.type === 'required' && <p className={styles.error}>Username is required</p>}
                  </div>

                      <div>
                      <input type="password" placeholder='Password' {...register("password", { required: true,
                      minLength: 8 })} />
                      {errors.password?.type === 'required' && <p className={styles.error}>Password is required</p>}
                      {errors.password?.type === 'minLength' && <p className={styles.error}>Passwrod must be 8 caracters long</p>}
                      </div>
                     
                      <div>
                    <input type="password" placeholder='Confirm your password' {...register("passwordConfirm",
                    { required: true, })} />
                      {errors.passwordConfirm?.type === 'required' && <p className={styles.error}>Please, confirm your password</p>}
                  </div>

                  <input type="submit" value={"Sign up"}></input>
                
                </form>
        
        </div>

    )
}

export default RegisterForm;