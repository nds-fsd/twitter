const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
  text: { type: String, required: true },
  reposts: { type: Number, required: false },
  likes: { type: Number, required: false },
  views: { type: Number, required: false },
  date: { type: String, required: true },
});

const Like = model("like", likeSchema);

module.exports = Like;
