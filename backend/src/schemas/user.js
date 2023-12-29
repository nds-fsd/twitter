const bcrypt = require('bcrypt');
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


userSchema.pre('save', function(next) {
  const user = this;

  if(!user.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt){
    if(err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash){
      if(err) return next(err);

      user.password = hash;
      next();
    })
  })

  
} );

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

const User = model("user", userSchema);

module.exports = User;


