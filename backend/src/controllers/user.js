const express = require("express");
const User = require("../schemas/user");
const Like = require("../schemas/like");
const Follow = require("../schemas/follow");
const Bookmark = require("../schemas/bookmark");
const Meow = require("../schemas/meow");
const Notification = require("../schemas/notification");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const userFound = await User.findOne({ username });

    if (userFound) {
      res.status(200).json(userFound);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userFound = await User.findById(id);
    if (userFound) {
      res.status(200).json(userFound);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const username = req.params.username;
    const userFound = await User.findOne({ username });

    if (userFound) {
      const body = req.body;
      const userUpdated = await User.findOneAndUpdate({ username }, body, {
        new: true,
      });
      res.status(201).json(userUpdated);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new User(body);
    console.log(newUser);

    const createdUser = await newUser.save();

    res.status(201).json({
      token: createdUser.generateJWT(),
      user: {
        name: createdUser.name,
        surname: createdUser.surname,
        username: createdUser.username,
        mail: createdUser.mail,
        id: createdUser._id,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const loginUser = async (req, res) => {
  try {
    const { mail } = req.body;
    const foundUser = await User.findOne({ mail });

    res.status(201).json({
      token: foundUser.generateJWT(),
      user: {
        name: foundUser.name,
        surname: foundUser.surname,
        username: foundUser.username,
        mail: foundUser.mail,
        id: foundUser._id,
      },
    });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const username = req.params.username;
    const userFound = await User.findOne({ username });

    if (userFound) {
      const userMeows = await Meow.find({ author: userFound._id });

      const interactedMeowIds = userMeows
        .map((meow) => meow.parentMeow || meow.repostedMeowId)
        .filter((id) => id);

      const interactedUsersIds = await Meow.distinct("author", {
        _id: { $in: interactedMeowIds },
      });

      await User.updateMany(
        { _id: { $in: interactedUsersIds } },
        { $inc: { meowCounter: -1 } }
      );

      const deletedParentMeowsIds = await Meow.distinct("_id", {
        parentMeow: { $nin: await Meow.find({}, "_id") },
      });

      const deletedRepostedMeowsIds = await Meow.distinct("_id", {
        repostedMeowId: { $nin: await Meow.find({}, "_id") },
      });

      const deletedBookmarkAndLikeIds = [
        ...(await Bookmark.distinct("_id", {
          meowId: { $nin: await Meow.find({}, "_id") },
        })),
        ...(await Like.distinct("_id", {
          meowId: { $nin: await Meow.find({}, "_id") },
        })),
      ];

      await Bookmark.deleteMany({
        meowId: { $nin: await Meow.find({}, "_id") },
      });
      await Like.deleteMany({ meowId: { $nin: await Meow.find({}, "_id") } });

      await Meow.updateMany(
        {
          _id: {
            $in: [
              ...interactedMeowIds,
              ...deletedParentMeowsIds,
              ...deletedRepostedMeowsIds,
            ],
          },
          author: { $ne: userFound._id },
        },
        { $inc: { replies: -1, reposts: -1, likes: -1, bookmarks: -1 } }
      );

      await Meow.deleteMany({
        $or: [
          { author: userFound._id },
          {
            repostedMeowId: {
              $in: await Meow.find({ author: userFound._id }, "_id"),
            },
          },
          { parentMeow: { $in: deletedParentMeowsIds } },
          { repostedMeowId: { $in: deletedRepostedMeowsIds } },
        ],
      });

      await Bookmark.deleteMany({ userId: userFound._id });

      await Notification.deleteMany({
        $or: [{ recipient: userFound._id }, { sender: userFound._id }],
      });

      await Like.deleteMany({
        $or: [
          { userId: userFound._id },
          {
            meowId: { $in: await Meow.find({ author: userFound._id }, "_id") },
          },
        ],
      });

      const userFollows = await Follow.find({
        $or: [{ follower: userFound._id }, { followed: userFound._id }],
      });
      for (const follow of userFollows) {
        await User.updateOne(
          { _id: follow.follower },
          { $inc: { followingCounter: -1 } }
        );
        await User.updateOne(
          { _id: follow.followed },
          { $inc: { followerCounter: -1 } }
        );
      }
      await Follow.deleteMany({
        $or: [{ follower: userFound._id }, { followed: userFound._id }],
      });

      await userFound.remove();

      res.status(201).json({ message: "Successfully deleted user" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserById,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
