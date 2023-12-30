const express = require("express");
const User = require('../schemas/user.js');



const consoleLogType = (req, res, next) => {
  console.log("Request Type:", req.method, "Router Type:", req.baseUrl);
  next();
};







const validateUser = async (req, res, next) => {
 
  const {body} = req;
  const {name, surname, birthday, username, mail, password} = body;

  

 const userMailError = await User.findOne({mail: mail})
  
    if(userMailError) return res.status(400).json({error: {mail: 'Email already registered'}});

    const userNameError = await User.findOne({username: username})
  
    if(userNameError)  return res.status(400).json({error: {username: 'Username already registered'}});
      

   
  if(!name || !surname || !birthday || !username) {
   return res.status(400).json({message: "missing required fields"});
    
 } 

 const patternEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
 const patternPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/

 console.log(!mail.match(patternEmail))
 if(!mail.match(patternEmail)) {
 return res.status(400).json({message: "Email is not valid"});
  
 } 
 
 if(!password.match(patternPassword)) {
  return res.status(400).json({message: "Password must be 8 to 30 character long, contain one lower case, one upper case, one number and one special character."})
  
 }

 next();
};







module.exports = {
  consoleLogType,
  validateUser
};
