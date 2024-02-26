const express = require("express");
const User = require("../schemas/user");
const { sendWelcomeEmail } = require("../service/email-service");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const userFound = await User.findOne({ username });

    if (userFound) {
      res.status(200).json(userFound);
    } else {
      res.status(404).json({ error: "User not found" });
    }
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
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const userFound = await User.findOne({ username });

    if (userFound) {
      const body = req.body;
      const userUpdated = await User.findOneAndUpdate({ username }, body, {
        new: true,
      });
      res.status(201).json(userUpdated);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new User(body);
    console.log(newUser);

    const createdUser = await newUser.save();

    res.status(201).json({
      token: createdUser.generateJWT(),
      user: {
        name: createdUser.name,
        surname: createdUser.surname,
        username: createdUser.username,
        mail: createdUser.mail,
        id: createdUser._id,
      },
    });
   /*  if(createdUser){
      await sendWelcomeEmail({name: createdUser.name, email: createdUser.mail});
    } */
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { mail } = req.body;
    const foundUser = await User.findOne({ mail });

    res.status(201).json({
      token: foundUser.generateJWT(),
      user: {
        name: foundUser.name,
        surname: foundUser.surname,
        username: foundUser.username,
        mail: foundUser.mail,
        id: foundUser._id,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const userFound = await User.findOne({ username });

    if (userFound) {
      await User.findOneAndDelete({ username });
      res.status(201).json({ message: "Successfully deleted user" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const welcomeEmail = async (req, res) => {
  await sendWelcomeEmail({name: 'Cecilia', email: 'cecilia.lorenzo.galarza@gmail.com'});
  return res.status(200).send();
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getUserById,
  welcomeEmail,
};
