const Bookmark = require("../schemas/mongo/bookmark");
const Meow = require("../schemas/mongo/meow");
const User = require("../schemas/mongo/user");

const checkBookmarkStatus = async (req, res) => {
  try {
    const userId = req.jwtPayload.id;
    const meowId = req.params.meowId;

    const bookmark = await Bookmark.findOne({
      userId,
      meowId,
    });

    return res.status(200).json({
      isBookmarked: Boolean(bookmark),
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

    const bookmarks = await Bookmark.find({ userId });
    const bookmarkedMeowIds = bookmarks.map((bookmark) => bookmark.meowId);

    const bookmarkedMeows = await Meow.find({
      _id: { $in: bookmarkedMeowIds },
    });
    const bookmarkedMeowsWithOriginalAuthors = await Promise.all(
      bookmarkedMeows.map(async (meow) => {
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

    return res.status(200).json(bookmarkedMeowsWithOriginalAuthors);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
};

const bookmarkMeow = async (req, res) => {
  try {
    const meowId = req.params.meowId;
    const meow = await Meow.findById(meowId);

    if (!meow) {
      return res.status(404).json({
        error: "The meow to bookmark does not exist",
      });
    }

    const userId = req.jwtPayload.id;
    const existingBookmark = await Bookmark.findOne({
      userId,
      meowId,
    });

    if (existingBookmark) {
      return res.status(400).json({
        error: "You already bookmark this meow",
      });
    }

    const bookmark = new Bookmark({
      userId,
      meowId,
    });

    await bookmark.save();

    await Meow.findByIdAndUpdate(
      meowId,
      { $inc: { bookmarks: 1 } },
      { new: true },
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

    if (!meow) {
      return res.status(404).json({
        error: "The meow to bookmark does not exist",
      });
    }

    const userId = req.jwtPayload.id;
    const existingBookmark = await Bookmark.findOne({
      userId,
      meowId,
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
      { new: true },
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
