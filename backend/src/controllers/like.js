const Like = require("../schemas/mongo/like");
const Meow = require("../schemas/mongo/meow");
const User = require("../schemas/mongo/user");

const checkLikeStatus = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const meowId = req.params.meowId;

    const like = await Like.findOne({
      userId,
      meowId,
    });

    return res.status(200).json({
      isLiked: Boolean(like),
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
    const likedMeowIds = likes.map((like) => like.meowId);

    const likedMeows = await Meow.find({ _id: { $in: likedMeowIds } });
    const likedMeowsWithOriginalAuthors = await Promise.all(
      likedMeows.map(async (meow) => {
        const repostedMeow =
          meow.repostedMeowId && (await Meow.findById(meow.repostedMeowId));
        if (!repostedMeow) return meow;

        const originalAuthor = await User.findById(repostedMeow.author);
        return {
          ...meow._doc,
          originalName: originalAuthor.name,
          originalSurname: originalAuthor.surname,
          originalUsername: originalAuthor.username,
        };
      }),
    );

    return res.status(200).json(likedMeowsWithOriginalAuthors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const likeMeow = async (req, res) => {
  try {
    const meowId = req.params.meowId;
    const meow = await Meow.findById(meowId);

    if (!meow) {
      return res.status(404).json({
        error: "The meow to like does not exist",
      });
    }

    const userId = req.jwtPayload.id;
    const existingLike = await Like.findOne({
      userId,
      meowId,
    });

    if (existingLike) {
      return res.status(400).json({
        error: "You already liked this meow",
      });
    }

    const like = new Like({
      userId,
      meowId,
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

    if (!meow) {
      return res.status(404).json({
        error: "The meow to like does not exist",
      });
    }

    const userId = req.jwtPayload.id;
    const existingLike = await Like.findOne({
      userId,
      meowId,
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
