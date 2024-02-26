const Bookmark = require("../schemas/mongo/bookmark");
const Meow = require("../schemas/mongo/meow");
const User = require("../schemas/mongo/user");

const checkBookmarkStatus = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const meowId = req.params.meowId;

    const bookmark = await Bookmark.findOne({
      userId: userId,
      meowId: meowId,
    });

    const isBookmarked = !!bookmark;

    return res.status(200).json({
      isBookmarked: isBookmarked,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when checking bookmark status",
    });
  }
};

const getMeowsBookmarked = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;

    const bookmarks = await Bookmark.find({ userId: userId });
    const meowsIdsBookmarked = bookmarks.map((bookmark) => bookmark.meowId);

    const meowsBookmarked = await Meow.find({
      _id: { $in: meowsIdsBookmarked },
    });

    return res.status(200).json(meowsBookmarked);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error fetching data", message: error.message });
  }
};

const bookmarkMeow = async (req, res) => {
  try {
    const meowId = req.params.meowId;
    const meow = await Meow.findById(meowId);
    const userId = req.jwtPayload.id;
    const user = await User.findById(userId);

    if (!meow) {
      return res.status(404).json({
        error: "The meow to bookmark does not exist",
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "User not authenticated or does not exist",
      });
    }

    const existingBookmark = await Bookmark.findOne({
      userId: userId,
      meowId: meowId,
    });

    if (existingBookmark) {
      return res.status(400).json({
        error: "You already bookmark this meow",
      });
    }

    const bookmark = new Bookmark({
      userId: userId,
      meowId: meowId,
    });

    await bookmark.save();

    await Meow.findByIdAndUpdate(
      meowId,
      { $inc: { bookmarks: 1 } },
      { new: true }
    );

    return res.status(200).json({
      message: "The meow has been bookmarked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when bookmarking meow",
    });
  }
};

const unbookmarkMeow = async (req, res) => {
  try {
    const meowId = req.params.meowId;
    const meow = await Meow.findById(meowId);
    const userId = req.jwtPayload.id;
    const user = await User.findById(userId);

    if (!meow) {
      return res.status(404).json({
        error: "The meow to bookmark does not exist",
      });
    }

    if (!user) {
      return res.status(401).json({
        error: "User not authenticated or does not exist",
      });
    }

    const existingBookmark = await Bookmark.findOne({
      userId: userId,
      meowId: meowId,
    });

    if (!existingBookmark) {
      return res.status(400).json({
        error: "You do not bookmark this meow",
      });
    }

    await existingBookmark.remove();

    await Meow.findByIdAndUpdate(
      meowId,
      { $inc: { bookmarks: -1 } },
      { new: true }
    );

    return res.status(200).json({
      message: "The meow has been unbookmarked successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when unbookmarking meow",
    });
  }
};

module.exports = {
  checkBookmarkStatus,
  getMeowsBookmarked,
  bookmarkMeow,
  unbookmarkMeow,
};
