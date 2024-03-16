const Meow = require("../schemas/mongo/meow");
const User = require("../schemas/mongo/user");
const Follow = require("../schemas/mongo/follow");
const mongoose = require("mongoose");

const getFeedMeows = async (req, res) => {
  try {
    const id = req.jwtPayload.id;

    const result = await Follow.find({ follower: id });
    const meowsYouFollow = await Meow.find({
      author: {
        $in: result.map((follow) => mongoose.Types.ObjectId(follow.followed)),
      },
    });
    const ownMeows = await Meow.find({ author: id });

    const meowsToSend = meowsYouFollow.concat(ownMeows).filter((meow) => {
      return !meow.parentMeow;
    });

    meowsToSend.sort((a, b) => a.date - b.date);

    const meowsWithOriginalAuthors = await Promise.all(
      meowsToSend.map(async (meow) => {
        const originalMeow =
          meow.repostedMeowId && (await Meow.findById(meow.repostedMeowId));
        if (!originalMeow) return meow;

        const originalAuthor = await User.findById(originalMeow.author);
        return {
          ...meow._doc,
          originalName: originalAuthor.name,
          originalSurname: originalAuthor.surname,
          originalUsername: originalAuthor.username,
        };
      }),
    );

    return res.json(meowsWithOriginalAuthors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
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
    console.error(error);
    return res.status(500).json({ error: "Server error" });
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
        const meowWithAuthor = {
          ...meow._doc,
          authorUsername: username,
          authorName: user.name,
          authorSurname: user.surname,
        };

        const repostedMeow =
          meow.repostedMeowId && (await Meow.findById(meow.repostedMeowId));
        if (!repostedMeow) return meowWithAuthor;

        const originalAuthor = await User.findById(repostedMeow.author);
        return {
          ...meow._doc,
          originalName: originalAuthor.name,
          originalSurname: originalAuthor.surname,
          originalUsername: originalAuthor.username,
          ...meowWithAuthor,
        };
      }),
    );
    res.status(200).json({ meowsWithOriginalAuthors, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

const getMeowReplies = async (req, res) => {
  try {
    const { id } = req.params;

    const meowReplies = await Meow.find({ parentMeow: id });

    if (meowReplies.length === 0) {
      return res.status(204).json({
        message: "No replies found.",
      });
    }

    const uniqueAuthorIds = [
      ...new Set(meowReplies.map((meow) => meow.author)),
    ];

    const authorDetails = await User.find(
      { _id: { $in: uniqueAuthorIds } },
      "username name surname",
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
    console.error(error);
    return res.status(500).json({ error: "Server error" });
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
        { $inc: { reposts: 1 } },
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
    console.error(error);
    return res.status(500).json({ error: "Server error" });
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
    const meowsToSend = [];
    const meowUpdated = await Meow.findByIdAndUpdate(id, body, { new: true });
    meowsToSend.push(meowUpdated);
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
      }),
    );

    return res.status(200).json({ userFound, meowsWithOriginalAuthors });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
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
          { $inc: { replies: -1 } },
        );
      }
      if (meowFound.repostedMeowId) {
        const originalMeow = await Meow.findById(meowFound.repostedMeowId);
        await Meow.updateOne(
          { _id: originalMeow._id },
          { $inc: { reposts: -1 } },
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
    console.error(error);
    return res.status(500).json({ error: "Server error" });
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
