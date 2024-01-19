const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const meowSchema = new Schema({
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const Meow = model("meow", meowSchema);

module.exports = Meow;
