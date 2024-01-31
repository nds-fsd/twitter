const Meow = require("../schemas/meow");
const User = require("../schemas/user");
const Follow = require("../schemas/follow");
const mongoose = require("mongoose");

// ------------------------------------------------------------------------------------------------------------------------------

const getAllMeows = async (req, res) => {
  try {
    const id = req.jwtPayload.id;
    const resultado = await Follow.find({ follower: id });
    const meowsYouFollow = await Meow.find({
      author: {
        $in: resultado.map((follow) =>
          mongoose.Types.ObjectId(follow.followed)
        ),
      },
    });
    const ownMeows = await Meow.find({ author: id });

    const meowsToSend = meowsYouFollow.concat(ownMeows);

    function compararPorFecha(a, b) {
      return a.date - b.date;
    }

    meowsToSend.sort(compararPorFecha);

    return res.status(200).json(meowsToSend);
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
    return res.status(500).json(error.message);
  }
};

const createMeow = async (req, res) => {
  try {
    const body = req.body;

    const userId = req.jwtPayload.id;

    const meow = {
      text: body.meow,
      date: body.date,
      author: userId,
    };
    if (body.parentMeow) {
      meow.parentMeow = body.parentMeow;

      await Meow.updateOne({ _id: body.parentMeow }, { $inc: { replies: 1 } });
    }

    const meowToSave = new Meow(meow);
    await meowToSave.save();
    await User.updateOne({ _id: userId }, { $inc: { meowCounter: 1 } });

    return res
      .status(201)
      .json({ message: "Meow created successfully", meowId: meowToSave._id });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
// -------------------------------------------------------------------------------------------------------------------------------
const repostMeow = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const repost = req.body;

    console.log(repost);

    if (!repost.repostedMeowId) {
      const meow = {
        text: repost.text,
        reposts: 1,
        author: userId,
        repostedMeowId: repost._id,
        date: repost.date,
      };

      const meowToSave = new Meow(meow);
      await meowToSave.save();
      await User.updateOne({ _id: userId }, { $inc: { meowCounter: 1 } });
      return res
        .status(201)
        .json({ message: "Meow reposted successfully", meow });
    }
    const meow = {
      text: repost.text,
      reposts: repost.reposts + 1,
      author: userId,
      repostedMeowId: repost.repostedMeowId,
      date: repost.date,
    };

    const meowToSave = new Meow(meow);
    await meowToSave.save();
    await User.updateOne({ _id: userId }, { $inc: { meowCounter: 1 } });
    return res
      .status(201)
      .json({ message: "Meow reposted successfully", meow });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// ---------------------------------------------------------------------------------------------------------------------------------
const updateMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);

    if (meowFound) {
      const { text } = req.body;
      const meowUpdated = await Meow.findByIdAndUpdate(id, text, { new: true });
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
      res.status(201).json({ message: "Successfully deleted meow" });
    } else {
      res.status(404).json({ error: "Meow not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAllMeows,
  getMeowById,
  createMeow,
  updateMeow,
  deleteMeow,
  repostMeow,
};
