const Like = require("../schemas/like");

const getAllLikes = async (req, res) => {
  try {
    const allLikes = await Like.find();
    res.status(200).json(allLikes);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getLikeById = async (req, res) => {
  try {
    const { id } = req.params;
    const likeFound = await Like.findById(id);
    if (likeFound) {
      res.status(200).json(likeFound);
    } else {
      res.status(404).json({ error: "Like not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createLike = async (req, res) => {
  try {
    const body = req.body;
    const likeToSave = new Like(body);
    await likeToSave.save();
    res.status(201).json(likeToSave);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateLike = async (req, res) => {
  try {
    const { id } = req.params;
    const likeFound = await Like.findById(id);
    if (likeFound) {
      const body = req.body;
      const likeUpdated = await Like.findByIdAndUpdate(id, body, { new: true });
      res.status(201).json(likeUpdated);
    } else {
      res.status(404).json({ error: "Like not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteLike = async (req, res) => {
  try {
    const { id } = req.params;
    const likeFound = await Like.findById(id);
    if (likeFound) {
      await Like.findByIdAndDelete(id);
    } else {
      res.status(404).json("Like not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllLikes,
  getLikeById,
  createLike,
  updateLike,
  deleteLike,
};
