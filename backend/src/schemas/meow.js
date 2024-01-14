const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const meowSchema = new Schema({
  text: { type: String, required: true },
  reposts: { type: Number, required: false },
  likes: { type: Number, required: false },
  views: { type: Number, required: false },
  date: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Meow = model("meow", meowSchema);

module.exports = Meow;
