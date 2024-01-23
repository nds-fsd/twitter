const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const meowSchema = new Schema({
  text: { type: String, required: true },
  reposts: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  date: { type: Date, default: Date.now() },
  replies: { type: Number, default: 0 },
  parentMeow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "meow",
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Meow = model("meow", meowSchema);

module.exports = Meow;
