const { Schema, model } = require("mongoose");

const followSchema = new Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  following: {
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
