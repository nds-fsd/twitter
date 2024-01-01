const User = require("../schemas/user");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;












const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};







const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById(id);
    if (userFound) {
      res.status(200).json(userFound);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};



const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById(id);
    if (userFound) {
      const body = req.body;
      const userUpdated = await User.findByIdAndUpdate(id, body, { new: true });
      res.status(201).json(userUpdated);
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};











const createUser = async (req, res) => {
   
  
  try {

    const body = req.body;
     const newUser = new User(body);
    console.log(newUser)

   await newUser.save();
   
   const today = new Date();
   const expirationDate = new Date();
   expirationDate.setDate(today.getDate() + 60);

   let payload = {
    name: body.name,
    email: body.mail,

  };

   res.status(201).json({token: jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
   })})


   
  
  
 
 
 
  } catch (error) {
    res.status(400).json(error.message);
   
  }
};









const loginUser = async (req, res) => {

  try{
    const { mail, password} = req.body;

    if (!mail || !password) return res.status(400).json({error: {login: "Missing email or password."}});
   
    const foundUser = await User.findOne({mail});
  
    if(!foundUser) return res.status(400).json({error:{email:"User not found."}});
  
    if(!foundUser.comparePassword(password)) return res.status(400).json({error:{password:"Invalid password."}});
  
    return res.status(200).json({
      token: foundUser.generateJTW(),
      user: {
        mail: foundUser.mail,
        name: foundUser.name,
        id: foundUser._id,
  
      }
    })

  } 
  catch(error){
    return res.status(500).json(error.message);
}

} 











const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById(id);
    if (userFound) {
      await User.findByIdAndDelete(id);
      res.status(201).json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ error: "Usuario no encontrado" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};






module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
