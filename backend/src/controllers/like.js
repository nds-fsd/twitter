const Like = require("../schemas/like");
const Meow = require("../schemas/meow");
const User = require("../schemas/user");

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
    console.error("Error in checkLikeStatus:", error);
    return res.status(500).json({
      error: "Unexpected error when checking like status",
    });
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
    console.error("Error in likeMeow:", error);
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
      { new: true }
    );

    return res.status(200).json({
      message: "The meow has been unliked successfully",
    });
  } catch (error) {
    console.error("Error in likeMeow:", error);
    return res.status(500).json({
      error: "Unexpected error when liking meow",
    });
  }
};

module.exports = {
  checkLikeStatus,
  likeMeow,
  unlikeMeow,
};
