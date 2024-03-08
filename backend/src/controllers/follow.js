const Follow = require("../schemas/mongo/follow");
const User = require("../schemas/mongo/user");

const checkFollowStatus = async (req, res) => {
  try {
    const followerId = req.jwtPayload.id;
    const username = req.params.username;
    const followedUser = await User.findOne({ username });

    if (!followedUser) {
      return res.status(404).json({
        error: "The user to follow does not exist",
      });
    }

    const follow = await Follow.findOne({
      follower: followerId,
      followed: followedUser.id,
    });

    const isFollowing = !!follow;

    return res.status(200).json({
      isFollowing,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when checking tracking status",
    });
  }
};

const followUser = async (req, res) => {
  try {
    const username = req.body.username;
    const followerId = req.jwtPayload.id;
    const follower = await User.findById(followerId);
    const followed = await User.findOne({ username });

    if (!follower) {
      return res.status(401).json({
        error: "User not authenticated or does not exist",
      });
    }

    if (!followed) {
      return res.status(404).json({
        error: "Username does not exist",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: follower.id,
      followed: followed.id,
    });

    if (existingFollow) {
      return res.status(400).json({
        error: "You already follow this user",
      });
    }

    const follow = new Follow({
      followed: followed.id,
      follower: follower.id,
    });

    await User.updateOne(
      { _id: follower.id },
      { $inc: { followingCounter: 1 } },
    );
    await User.updateOne(
      { _id: followed.id },
      { $inc: { followerCounter: 1 } },
    );

    await follow.save();
    return res.status(200).json({
      message: "The user has been followed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when following user",
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const username = req.body.username;
    const followerId = req.jwtPayload.id;
    const follower = await User.findById(followerId);
    const followed = await User.findOne({ username });

    if (!follower) {
      return res.status(401).json({
        error: "User not authenticated or does not exist",
      });
    }

    if (!followed) {
      return res.status(404).json({
        error: "Username does not exist",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: follower.id,
      followed: followed.id,
    });

    if (!existingFollow) {
      return res.status(400).json({
        error: "You do not follow this user",
      });
    }

    await existingFollow.remove();

    follower.followingCounter -= 1;
    await follower.save();

    followed.followerCounter -= 1;
    await followed.save();

    return res.status(200).json({
      message: "You have successfully unfollowed the user",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Unexpected error when unfollowing user",
    });
  }
};

module.exports = {
  checkFollowStatus,
  followUser,
  unfollowUser,
};
