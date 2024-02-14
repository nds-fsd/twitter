const Notification = require("../schemas/notification");

const createNotification = async (req, res) => {
  try {
    const { recipient, sender, action, post } = req.body;
    const newNotification = new Notification({
      recipient,
      sender,
      action,
      post,
    });

    await newNotification.save();

    res.status(201).json(newNotification);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getNotification = async (req, res) => {
  try {
    const { id } = req.user._id;
    const notificationFound = await Notification.find({
      recipient: id,
    });

    if (notificationFound) {
      notificationFound.sort({ createdAt: -1 });
      res.status(200).json(notificationFound);
    } else {
      res.status(404).json({ error: "Error al obtener las notificaciones" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { notificationId } = req.params;
    const notificationFound = await Notification.findById(id);

    if (notificationFound) {
      await Notification.findByIdAndDelete(notificationId);
      res.status(201).json({ message: "Notificación eliminada exitosamente" });
    } else {
      res.status(404).json({ error: "Error al eliminar la notificación" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  createNotification,
  getNotification,
  deleteNotification,
};
