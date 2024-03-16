const Notification = require("../schemas/mongo/notification");
const User = require("../schemas/mongo/user");

const createNotification = async (req, res) => {
  try {
    const { recipient, sender, action, post } = req.body;
    const recipientUser = await User.findOne({
      username: recipient,
    });
    const senderUser = await User.findOne({
      username: sender,
    });

    if (!recipientUser || !senderUser) {
      return res
        .status(404)
        .json({ error: "Recipient or sender user not found" });
    }

    const newNotification = new Notification({
      recipient: recipientUser._id,
      sender: senderUser._id,
      action: action,
      post: post,
    });

    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const editNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notification = await Notification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({ error: "Notification not found" });
    }
    notification.read = !notification.read;

    await notification.save();

    res.status(200).json(notification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const getUserNotification = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const notifications = await Notification.find({
      recipient: user._id,
    });

    if (notifications.length > 0) {
      res.status(200).json(notifications);
    } else {
      res.status(204).json({ message: "No notifications yet" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notificationFound = await Notification.findById(id);

    if (notificationFound) {
      await Notification.findByIdAndDelete(notificationId);
      res.status(201).json({ message: "Notification deleted successfully" });
    } else {
      res.status(404).json({ error: "Notification not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createNotification,
  editNotification,
  getUserNotification,
  deleteNotification,
};
