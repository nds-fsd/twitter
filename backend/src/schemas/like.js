const { Schema, model } = require("mongoose");

const likeSchema = new Schema({
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Like = model("like", likeSchema);

module.exports = Like;
