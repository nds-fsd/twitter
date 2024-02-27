const Meow = require("../schemas/meow");
const User = require("../schemas/user");
const Follow = require("../schemas/follow");
const mongoose = require("mongoose");

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

    meowsToSend.sort((a, b) => a.date - b.date);

    const meowsWithOriginalAuthors = await Promise.all(
      meowsToSend.map(async (meow) => {
        if (meow.repostedMeowId) {
          const originalMeow = await Meow.findById(meow.repostedMeowId);
          if (originalMeow) {
            const originalAuthor = await User.findById(originalMeow.author);
            return {
              ...meow._doc,
              originalName: originalAuthor.name,
              originalSurname: originalAuthor.surname,
              originalUsername: originalAuthor.username,
            };
          }
        }
        return meow;
      })
    );

    return res.json(meowsWithOriginalAuthors);
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

const getProfileMeows = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username: username });
    const { _id } = user;
    const meowsProfile = await Meow.find({
      author: _id,
      parentMeow: undefined,
    });
    const meowsWithOriginalAuthors = await Promise.all(
      meowsProfile.map(async (meow) => {
        if (meow.repostedMeowId) {
          const originalMeow = await Meow.findById(meow.repostedMeowId);
          if (originalMeow) {
            const originalAuthor = await User.findById(originalMeow.author);
            return {
              ...meow._doc,
              originalName: originalAuthor.name,
              originalSurname: originalAuthor.surname,
              originalUsername: originalAuthor.username,
            };
          }
        }
        return meow;
      })
    );
    res.status(200).json({ meowsWithOriginalAuthors, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

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
        "username name surname"
      );

      const authorMap = authorDetails.reduce((map, user) => {
        map[user._id] = {
          username: user.username,
          name: user.name,
          surname: user.surname,
        };
        return map;
      }, {});

      const meowRepliesWithUsernames = meowReplies.map((meow) => {
        const author = authorMap[meow.author];
        return {
          ...meow.toObject(),
          authorUsername: author ? author.username : "Unknown User",
          authorName: author ? author.name : "Unknown",
          authorSurname: author ? author.surname : "Unknown",
        };
      });
      return res.status(200).json(meowRepliesWithUsernames.reverse());
    } else {
      return res.status(204).json({
        message: "No replies found.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
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
      meow.author = userId;

      await Meow.updateOne({ _id: body.parentMeow }, { $inc: { replies: 1 } });
    }

    const meowToSave = new Meow(meow);
    await meowToSave.save();
    await User.updateOne({ _id: userId }, { $inc: { meowCounter: 1 } });

    return res
      .status(201)
      .json({ message: "Meow created successfully", meowToSave });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const repostMeow = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const repost = req.body;

    const meow = {
      text: repost.text,
      author: userId,
      date: repost.date,
    };
    if (repost.repostedMeowId) {
      meow.repostedMeowId = repost.repostedMeowId;
      await Meow.updateOne(
        { _id: meow.repostedMeowId },
        { $inc: { reposts: 1 } }
      );
    } else {
      meow.repostedMeowId = repost._id;
      await Meow.updateOne({ _id: repost._id }, { $inc: { reposts: 1 } });
    }
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

const updateMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);

    if (!meowFound) {
      return res.status(404).json({ error: "Meow not found" });
    }

    const userFound = await User.findById(meowFound.author);
    const body = req.body;
    const meowsToSend = []
    const meowUpdated = await Meow.findByIdAndUpdate(id, body, { new: true });
    meowsToSend.push(meowUpdated)
    const meowsWithOriginalAuthors = await Promise.all(
      meowsToSend.map(async (meow) => {
        if (meow.repostedMeowId) {
          const originalMeow = await Meow.findById(meow.repostedMeowId);
          if (originalMeow) {
            const originalAuthor = await User.findById(originalMeow.author);
            return {
              ...meow._doc,
              originalName: originalAuthor.name,
              originalSurname: originalAuthor.surname,
              originalUsername: originalAuthor.username,
            };
          }
        }
        return meow;
      })
    );

    return res.status(200).json({ userFound, meowsWithOriginalAuthors });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.jwtPayload.id;
    const meowFound = await Meow.findById(id);

    if (meowFound) {
      await Meow.deleteMany({ parentMeow: id });
      if (meowFound.parentMeow) {
        await Meow.updateOne(
          { _id: meowFound.parentMeow },
          { $inc: { replies: -1 } }
        );
      }
      if (meowFound.repostedMeowId) {
        const originalMeow = await Meow.findById(meowFound.repostedMeowId);
        await Meow.updateOne(
          { _id: originalMeow._id },
          { $inc: { reposts: -1 } }
        );
      }
      await Meow.deleteMany({ repostedMeowId: id });

      await Meow.findByIdAndDelete(id);
      await User.updateOne({ _id: userId }, { $inc: { meowCounter: -1 } });
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
  repostMeow,
  getMeowReplies,
  getProfileMeows,
};
