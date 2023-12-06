import styles from './RegisterForm.module.css'
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import axios from 'axios';

 const userApi = axios.create({
    baseURL: 'http://localhost:3001/user',
    headers: {'Content-Type': 'application/json',}
});





const RegisterForm = ()=> {

  const [success, setSuccess] = useState('')

   
    const { register, formState: { errors }, handleSubmit } = useForm();

      
     const onSubmit = (data)=> {
      let date = new Date().toDateString();
      console.log(data)

       const createUser = async () => {

        try{
         
          const res = await userApi.post('/',{...data, dateOfRegister: date} );
           console.log(res)
           if(res.status === 201){
            setSuccess(true)
           }
        } catch(error){
      
          console.log(error);
      
        }
      }
      
          
       createUser();
       

   

       }
       
       if (success) {
        return(
          <div className={styles.success}>Account created <br/>successfully! </div>
        )
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
                    pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/  })} />
                    {errors.mail?.type === 'required' && <p className={styles.error}>Mail is required.</p>}
                    {errors.mail?.type === 'pattern' && <p className={styles.error}>Please enter a valid email.</p>}
                  </div>
                  
                   <div className={styles.date}>
                   <label htmlFor="">Date of birth</label>
                   <input type="date"  {...register("birthday", { required: true, })} />
                   {errors.date?.type === 'required' && <p className={styles.error}>Date is required</p>}
                  </div>
                   <br />
                   <br />

                  <h3  style={{color: "white"}}>Username and password</h3>

                  <div>
                    <input maxLength={20} type="text" placeholder='Username' {...register("username", { required: true })}/>
                    {errors.username?.type === 'required' && <p className={styles.error}>Username is required</p>}
                  </div>

                      <div>
                      <input maxLength={30} type="password" placeholder='Password' {...register("password", { required: true,
                      minLength: 8 })} />
                      {errors.password?.type === 'required' && <p className={styles.error}>Password is required</p>}
                      {errors.password?.type === 'minLength' && <p className={styles.error}>Password must be 8 to 30 character long.</p>}
                      </div>
                     
                      <div>
                    <input maxLength={30} type="password" placeholder='Confirm your password' {...register("passwordConfirm",
                    { required: true, })} />
                      {errors.passwordConfirm?.type === 'required' && <p className={styles.error}>Please, confirm your password</p>}
                    </div>

                  <div>
                  <input className={styles.submit} type="submit" value={"Sign up"}></input>
                  </div>
              

                  
                
                </form>
        
        </div>

    )
}

export default RegisterForm;  

