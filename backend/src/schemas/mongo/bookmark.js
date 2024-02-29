const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const bookmarkSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  meowId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "meow",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Bookmark = model("bookmark", bookmarkSchema);

module.exports = Bookmark;
