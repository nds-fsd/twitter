const { Schema, model } = require("mongoose");
const mongoose = require("mongoose");

const validateAction = (value) => {
  const allowedActions = ["follow", "like", "comment", "repost"];
  return allowedActions.includes(value);
};

const notificationSchema = new Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  action: {
    type: String,
    required: true,
    validate: {
      validator: validateAction,
      message: "Invalid action",
    },
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "meow",
  },
  read: { type: Boolean, default: false },
  date: { type: Date, default: Date.now() },
});

const Notification = model("notification", notificationSchema);

module.exports = Notification;
