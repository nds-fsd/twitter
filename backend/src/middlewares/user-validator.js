const bcrypt = require("bcrypt");
const User = require("../schemas/mongo/user");

const isValidEmail = (mail) => {
  const patternMail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;
  return patternMail.test(mail);
};

const isValidPassword = (password) => {
  const patternPassword =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  return patternPassword.test(password);
};

const isValidBirthday = (birthday) => {
  const today = new Date();
  const minYear = today.getFullYear() - 14;
  const maxYear = today.getFullYear() - 100;
  const minAge = new Date(
    [minYear, today.getMonth() + 1, today.getDate()].join("-"),
  );
  const maxAge = new Date(
    [maxYear, today.getMonth() + 1, today.getDate()].join("-"),
  );
  const inputDate = new Date(birthday);

  return inputDate < maxAge && inputDate > minAge;
};

const validateUpdateUser = async (req, res, next) => {
  const { body } = req;

  Object.keys(body).forEach((key) => {
    if (body[key] === undefined || body[key] === null || body[key] === "") {
      delete body[key];
    }
  });

  if (!isValidPassword(body?.password)) {
    return res.status(400).json({
      message:
        "Password must be 8 to 15 characters long, contain one lowercase, one uppercase, one number, and one special character.",
    });
  }

  if (body.password) {
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
  }

  if (body._id) {
    const user = await User.findById(body._id);
    if (user) {
      if (!user.comparePassword(body?.password)) {
        user.password = body.password;
      }
    }
  }

  next();
};

const validateRegisterUser = async (req, res, next) => {
  const { name, surname, birthday, username, mail, password } = req.body;

  if (!name || !surname || !birthday || !username) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (!isValidEmail(mail)) {
    return res.status(400).json({ error: "Mail is not valid" });
  }

  if (!isValidPassword(password)) {
    return res.status(400).json({
      message:
        "Password must be 8 to 15 characters long, contain one lowercase, one uppercase, one number, and one special character.",
    });
  }

  if (!isValidBirthday(birthday)) {
    return res.status(400).json({
      error:
        "Invalid birthday. Allowed age range is between 14 and 100 years old.",
    });
  }

  const mailExists = await User.findOne({ mail });
  const userNameExists = await User.findOne({ username });

  if (mailExists || userNameExists) {
    return res.status(400).json({
      error: {
        ...(mailExists && { mail: "Mail already registered" }),
        ...(userNameExists && { username: "Username already registered" }),
      },
    });
  }

  next();
};

module.exports = {
  validateUpdateUser,
  validateRegisterUser,
};
