const Follow = require("../schemas/follow");

const getAllFollows = async (req, res) => {
  try {
    const allFollows = await Follow.find();
    res.status(200).json(allFollows);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getFollowById = async (req, res) => {
  try {
    const { id } = req.params;
    const followFound = await Follow.findById(id);
    if (followFound) {
      res.status(200).json(followFound);
    } else {
      res.status(404).json({ error: "Follow no encontrado" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createFollow = async (req, res) => {
  try {
    const body = req.body;
    const followToSave = new Follow(body);
    await followToSave.save();
    res.status(201).json(followToSave);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const followFound = await Follow.findById(id);
    if (followFound) {
      const body = req.body;
      const followUpdated = await Follow.findByIdAndUpdate(id, body, { new: true });
      res.status(201).json(followUpdated);
    } else {
      res.status(404).json({ error: "Follow no encontrado" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const followFound = await Follow.findById(id);
    if (followFound) {
      await Follow.findByIdAndDelete(id);
    } else {
      res.status(404).json("Follow no encontrado");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllFollows,
  getFollowById,
  createFollow,
  updateFollow,
  deleteFollow,
};
