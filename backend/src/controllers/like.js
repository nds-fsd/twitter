const Like = require("../schemas/mongo/like");
const Meow = require("../schemas/mongo/meow");
const User = require("../schemas/mongo/user");

const checkLikeStatus = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const meowId = req.params.meowId;

    const like = await Like.findOne({
      userId: userId,
      meowId: meowId,
    });

    const isLiked = !!like;

    return res.status(200).json({
      isLiked,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when checking like status",
    });
  }
};

const getMeowsLiked = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;

    const likes = await Like.find({ userId: userId });
    const meowsIdsLiked = likes.map((like) => like.meowId);

    const meowsLiked = await Meow.find({ _id: { $in: meowsIdsLiked } });
    const meowsWithOriginalAuthors = await Promise.all(
      meowsLiked.map(async (meow) => {
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

    return res.status(200).json(meowsWithOriginalAuthors);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching data", message: error.message });
  }
};

const likeMeow = async (req, res) => {
  try {
    const meowId = req.params.meowId;
    const meow = await Meow.findById(meowId);
    const userId = req.jwtPayload.id;
    const user = await User.findById(userId);

    if (!meow) {
      return res.status(404).json({
        error: "The meow to like does not exist",
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "User not authenticated or does not exist",
      });
    }

    const existingLike = await Like.findOne({
      userId: userId,
      meowId: meowId,
    });

    if (existingLike) {
      return res.status(400).json({
        error: "You already liked this meow",
      });
    }

    const like = new Like({
      userId: userId,
      meowId: meowId,
    });

    await like.save();

    await Meow.findByIdAndUpdate(meowId, { $inc: { likes: 1 } }, { new: true });

    return res.status(200).json({
      message: "The meow has been liked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when liking meow",
    });
  }
};

const unlikeMeow = async (req, res) => {
  try {
    const meowId = req.params.meowId;
    const meow = await Meow.findById(meowId);
    const userId = req.jwtPayload.id;
    const user = await User.findById(userId);

    if (!meow) {
      return res.status(404).json({
        error: "The meow to like does not exist",
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "User not authenticated or does not exist",
      });
    }

    const existingLike = await Like.findOne({
      userId: userId,
      meowId: meowId,
    });

    if (!existingLike) {
      return res.status(400).json({
        error: "You do not like this meow",
      });
    }

    await existingLike.remove();

    await Meow.findByIdAndUpdate(
      meowId,
      { $inc: { likes: -1 } },
      { new: true },
    );

    return res.status(200).json({
      message: "The meow has been unliked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when liking meow",
    });
  }
};

module.exports = {
  checkLikeStatus,
  getMeowsLiked,
  likeMeow,
  unlikeMeow,
};
