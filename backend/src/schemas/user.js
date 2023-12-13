const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true },
  birthday: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String, required: false },
  dateOfRegister: { type: String, required: true },
});

const User = model("user", userSchema);

module.exports = User;
