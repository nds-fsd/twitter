const Meow = require("../schemas/meow");
const User = require("../schemas/user");
const Follow = require("../schemas/follow");
const mongoose = require("mongoose");

// -------------------------------------------------------------------------------------------------------------------------------
const getFeedMeows = async (req, res) => {
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

    const meowsToSend = meowsYouFollow.concat(ownMeows).filter((meow) => {
      return !meow.parentMeow;
    });

    function compararPorFecha(a, b) {
      return a.date - b.date;
    }

    meowsToSend.sort(compararPorFecha);

    return res.status(200).json(meowsToSend);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
// ----------------------------------------------------------------------------------------------------------------------------

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
// ----------------------------------------------------------------------------------------------------------------------------------------

const getMeowReplies = async (req, res) => {
  try {
    const { id } = req.params;

    const meowReplies = await Meow.find({ parentMeow: id });

    if (meowReplies.length > 0) {
      const uniqueAuthorIds = [
        ...new Set(meowReplies.map((meow) => meow.author)),
      ];

      const authorDetails = await User.find(
        { _id: { $in: uniqueAuthorIds } },
        "username"
      );

      const authorMap = authorDetails.reduce((map, user) => {
        map[user._id] = user.username;
        return map;
      }, {});

      const meowRepliesWithUsernames = meowReplies.map((meow) => {
        return {
          ...meow.toObject(),
          authorUsername: authorMap[meow.author] || "Unknown User",
        };
      });
      return res.status(200).json(meowRepliesWithUsernames.reverse());
    } else {
      return res.status(404).json({
        message: "No replies found.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ---------------------------------------------------------------------------------------------------------------------------------

const createMeow = async (req, res) => {
  try {
    const body = req.body;

    const userId = req.jwtPayload.id;

    const meow = {
      text: body.meow,
      author: userId,
    };
    if (body.parentMeow) {
      meow.parentMeow = body.parentMeow;
      meow.author = userId;
      console.log(req.jwtPayload);
      console.log(meow);

      await Meow.updateOne({ _id: body.parentMeow }, { $inc: { replies: 1 } });
    }

    const meowToSave = new Meow(meow);
    await meowToSave.save();
    await User.updateOne({ _id: userId }, { $inc: { meowCounter: 1 } });

    return res.status(201).json({ message: "Meow created successfully" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
// -------------------------------------------------------------------------------------------------------------------------------
const updateMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);

    if (!meowFound) {
      return res.status(404).json({ error: "Meow not found" });
    }

    const userFound = await User.findById(meowFound.author);
    const body = req.body;
    const meowUpdated = await Meow.findByIdAndUpdate(id, body, { new: true });

    return res.status(200).json({ userFound, meowUpdated });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// -------------------------------------------------------------------------------------------------------------------------------

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
  getFeedMeows,
  getMeowById,
  createMeow,
  updateMeow,
  deleteMeow,
  getMeowReplies,
};
