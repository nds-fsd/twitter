const express = require("express");
const User = require("../schemas/user.js");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

// ---------------------------------Console Logotype---------------------------------------------------------

const consoleLogType = (req, res, next) => {
  console.log("Request Type:", req.method, "Router Type:", req.baseUrl);
  next();
};

// ------------------------------------------Create a new user--------------------------------------------------

const validateUser = async (req, res, next) => {
  const { body } = req;
  const { name, surname, birthday, username, mail, password } = body;

  const userMailError = await User.findOne({ mail: mail });
  const userNameError = await User.findOne({ username: username });

  if (userMailError && userNameError)
    return res.status(400).json({
      error: {
        mail: "Mail already registered",
        username: "Username already registered",
      },
    });
  if (userNameError)
    return res
      .status(400)
      .json({ error: { username: "Username already registered" } });
  if (userMailError)
    return res.status(400).json({ error: { mail: "Mail already registered" } });

  if (!name || !surname || !birthday || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const patternMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
  const patternPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

  if (!mail.match(patternMail)) {
    return res.status(400).json({ error: "Mail is not valid" });
  }

  if (!password.match(patternPassword)) {
    return res.status(400).json({
      message:
        "Password must be 8 to 15 character long, contain one lower case, one upper case, one number and one special character.",
    });
  }

  next();
};

// --------------------------------------------------Validate Login---------------------------------------------------

const validateLogin = async (req, res, next) => {
  const { mail, password } = req.body;

  if (!mail || !password)
    return res
      .status(400)
      .json({ error: { login: "Missing mail or password." } });
  const foundUser = await User.findOne({ mail });

  if (!foundUser)
    return res.status(400).json({ error: { mail: "User not found." } });

  if (!foundUser.comparePassword(password))
    return res.status(400).json({ error: { password: "Invalid password." } });

  next();
};

// ----------------------------------------Validate Token------------------------------------------------------------

const validateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ error: "Unauthorized MISSING HEADER" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, secret);
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized:((" });
  }

  req.jwtPayload = tokenPayload;

  next();
};

module.exports = {
  consoleLogType,
  validateUser,
  validateLogin,
  validateToken,
};
