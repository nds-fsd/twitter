import styles from './RegisterForm.module.css'
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { userApi } from '../apis/apiWrapper';
import Swal from 'sweetalert2'

const RegisterForm = ()=> {

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

   
    const { register, formState: { errors }, handleSubmit } = useForm();

      
     const onSubmit = (data)=> {
      if(data.password !== data.passwordConfirm){
        setPasswordError(true)
        return;
      }
      let date = new Date().toDateString();
      

       const createUser = async () => {

        try{
         
          const res = await userApi.post('/',{...data, dateOfRegister: date} );
           console.log(res)
           if(res.status === 201){
            setSuccess(true)
           }
        } catch(error){
          setError(true)
          console.log(error);
      
        }
      }
      
          
       createUser();

       
       

   

       }

       if (success) {
       Swal.fire({
        title: "Welcome to Meower!",
        text: "User created successfully.",
        icon: "success",
       confirmButtonColor: "#00A9A5"

       })
       
      }
    
      
         if (error) {
          Swal.fire({
            text: "Ops, something went wrong!",
            icon: "error",
            confirmButtonColor: "#00A9A5",
            timer: "3000"
          })
          setError(false)
          }



// Hay medidas provisionales que hay que modificar, como en el primer div(los pixels)
       return(
        <div style={{marginLeft: "10rem", marginTop: "3rem"}}> 
            <h2>Create your account</h2>

            <br />
            <br />
           
           
           
            <form onSubmit={handleSubmit(onSubmit)}>

            <h3 style={{color: "white"}}>Personal details</h3>
                
                    <div>
                    <input maxLength={30} type="text" name="" placeholder="Name"  {...register("name", { required: true })}  />
                    {errors.name?.type === 'required' && <p className={styles.error}>Name is required.</p>}
                    </div>
                   
                   
                   <div> 
                   <input maxLength={30} type="text" name="" placeholder="Surname" {...register("surname", { required: true, })} />
                   {errors.surname?.type === 'required' && <p className={styles.error}>Surname is required.</p>} 
                   </div>

                  <div>
                    <input maxLength={80} type="text" name="" placeholder="Email" {...register("mail", { required: true,
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />
                    {errors.mail?.type === 'required' && <p className={styles.error}>Mail is required.</p>}
                    {errors.mail?.type === 'pattern' && <p className={styles.error}>Please enter a valid email.</p>}
                  </div>
                  
                   <div className={styles.date}>
                   <label htmlFor="">Date of birth</label>
                   <input type="date"  {...register("birthday", { required: true, })} />
                   {errors.birthday?.type === 'required' && <p className={styles.error}>Date is required</p>}
                  </div>
                   <br />
                   <br />

                  <h3  style={{color: "white"}}>Username and password</h3>

                  <div>
                    <input maxLength={20} type="text" placeholder='Username' {...register("username", { required: true })}/>
                    {errors.username?.type === 'required' && <p className={styles.error}>Username is required</p>}
                  </div>

                      <div>
                      <input maxLength={30} type="password" placeholder='Password' {...register("password",
                       {
                         required: true,
                         minLength: 8,
                         pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/ })} />
                      {errors.password?.type === 'required' && <p className={styles.error}>Password is required</p>}
                      {errors.password?.type === 'minLength' && <p className={styles.error}>Password must be 8 to 30 character long.</p>}
                      {errors.password?.type === 'pattern' &&  <p style={{fontSize:'12px', color: 'red', fontWeight: 'bold'}}>
                        Passwrod must contain one lower case,
                       one upper<br/> case, one number and one special character.</p> }
                     
                       </div>
                     
                      <div>
                    <input maxLength={30} type="password" placeholder='Confirm your password' {...register("passwordConfirm",
                    { required: true, })} />
                      {errors.passwordConfirm?.type === 'required' && <p className={styles.error}>Please, confirm your password</p>}
                      {passwordError&& <p className={styles.error}>Passwords do not match</p>}
                    </div>

                  <div>
                  <input className={styles.submit} type="submit" value={"Sign up"}></input>
                  </div>
              

                  
                
                </form>
        
        </div>

    )
}

export default RegisterForm;  

