const Meow = require("../schemas/meow");
const Follow = require("../schemas/follow");
const { default: mongoose } = require("mongoose");
const { fi } = require("date-fns/locale");

const getAllMeows = async (req, res) => {
  try {
    const id = req.jwtPayload.id;
    console.log(id);
    const resultado = await Follow.find({ follower: id });

    console.log(resultado);

    const meowsYouFollow = await Meow.find({
      author: {
        $in: resultado.map((follow) =>
          mongoose.Types.ObjectId(follow.followed)
        ),
      },
    });

    const allMeows = await Meow.find();

    if (meowsYouFollow.length < 2) {
      res.status(200).json(allMeows.slice(-10));
      return;
    }

    res.status(200).json(meowsYouFollow);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getMeowById = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);
    if (meowFound) {
      res.status(200).json(meowFound);
    } else {
      res.status(404).json({ error: "Meow not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createMeow = async (req, res) => {
  try {
    const body = req.body;
    const meowToSave = new Meow(body);
    await meowToSave.save();
    res.status(201).json(meowToSave);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);
    if (meowFound) {
      const body = req.body;
      const meowUpdated = await Meow.findByIdAndUpdate(id, body, { new: true });
      res.status(201).json(meowUpdated);
    } else {
      res.status(404).json({ error: "Meow not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);
    if (meowFound) {
      await Meow.findByIdAndDelete(id);
    } else {
      res.status(404).json("Meow not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllMeows,
  getMeowById,
  createMeow,
  updateMeow,
  deleteMeow,
};
