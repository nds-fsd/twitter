const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  username: { type: String, required: true },
  birthday: { type: String, required: true },
  mail: { type: String, required: true },
  password: { type: String, required: true },
  description: { type: String, required: false },
  town: { type: String, required: false },
  dateOfRegister: { type: String, required: true },
  meowCounter: { type: Number, default: 0 },
  followingCounter: { type: Number, default: 0 },
  followerCounter: { type: Number, default: 0 },
  userProfilePhoto: {
    type: String,
    default:
      "https://res.cloudinary.com/dkfs5w0ga/image/upload/v1707388880/code/defaultUserProfile.jpg",
  },
  backgroundProfilePhoto: {
    type: String,
    default:
      "https://res.cloudinary.com/dkfs5w0ga/image/upload/v1707388880/code/defaultBackgroundProfile.jpg",
  },
});

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date();

  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    name: this.name,
    mail: this.mail,
  };

  return jwt.sign(payload, secret, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

const User = model("user", userSchema);

module.exports = User;
