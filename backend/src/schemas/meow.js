const { Schema, model } = require("mongoose");

const meowSchema = new Schema({
  text: { type: String, required: true },
  reposts: { type: Number, required: false },
  likes: { type: Number, required: false },
  views: { type: Number, required: false },
  date: { type: String, required: true },
});

const Meow = model("meow", meowSchema);

module.exports = Meow;
