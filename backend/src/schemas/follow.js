const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const followSchema = new Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Follow = model("follow", followSchema);

module.exports = Follow;
