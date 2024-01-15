const Follow = require("../schemas/follow");
const User = require("../schemas/user");

const checkFollowStatus = async (req, res) => {
  try {
    const followerId = req.jwtPayload.id;
    const username = req.params.username;
    const followedUser = await User.findOne({ username });

    if (!followedUser) {
      return res.status(404).json({
        error: "El usuario a seguir no existe",
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
    console.error("Error en checkFollowStatus:", error);
    return res.status(500).json({
      error: "Error inesperado al verificar el estado de seguimiento",
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
        error: "Usuario no autenticado o no existe",
      });
    }

    if (!followed) {
      return res.status(404).json({
        error: "El usuario no existe",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: follower.id,
      followed: followed.id,
    });

    if (existingFollow) {
      return res.status(400).json({
        error: "Ya sigues a este usuario",
      });
    }

    const follow = new Follow({
      followed: followed.id,
      follower: follower.id,
    });

    follower.followingCounter += 1;
    await follower.save();

    followed.followerCounter += 1;
    await followed.save();

    await follow.save();
    return res.status(200).json({
      message: "El usuario se ha seguido correctamente",
    });
  } catch (error) {
    console.error("Error in followUser:", error);
    return res.status(500).json({
      error: "Error inesperado al seguir al usuario",
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
        error: "Usuario no autenticado o no existe",
      });
    }

    if (!followed) {
      return res.status(404).json({
        error: "El usuario no existe",
      });
    }

    const existingFollow = await Follow.findOne({
      follower: follower.id,
      followed: followed.id,
    });

    if (!existingFollow) {
      return res.status(400).json({
        error: "No sigues a este usuario",
      });
    }

    await existingFollow.remove();

    follower.followingCounter -= 1;
    await follower.save();

    followed.followerCounter -= 1;
    await followed.save();

    return res.status(200).json({
      message: "Has dejado de seguir al usuario correctamente",
    });
  } catch (error) {
    console.error("Error in unfollowUser:", error);
    return res.status(500).json({
      error: "Error inesperado al dejar de seguir al usuario",
    });
  }
};

module.exports = {
  checkFollowStatus,
  followUser,
  unfollowUser,
};
