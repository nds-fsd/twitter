const Follow = require("../schemas/follow");
const User = require("../schemas/user");

const followUser = async (req, res) => {
  const username = req.body.username;
  const followerId = req.jwtPayload.userId;
  const follower = await User.findById(followerId);

  if (!follower) {
    return res.status(401).json({
      error: "Usuario no autenticado o no existe",
    });
  }

  const followed = await User.findOne({ username });

  if (!followed) {
    return res.status(404).json({
      error: "El usuario no existe",
    });
  }

  const follow = new Follow({
    followed: followed.id,
    follower: follower.id,
  });

  // if (!user) {
  //   return res.status(404).json({
  //     error: "El usuario no existe",
  //   });
  // }

  // //const currentUser = await User.findOne({ id: req.user.id });
  // const follow = new Follow({
  //   followed: user.id,
  //   follower: user.id,
  //   //currentUser.id, // user.id,
  // });

  await follow.save();
  return res.status(200).json({
    message: "El usuario se ha seguido correctamente",
  });
};

const unfollowUser = async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      error: "El usuario no existe",
    });
  }

  // const currentUser = await User.findOne({ id: req.user.id });
  const follow = await Follow.findOne({
    followed: user.id,
    follower: user.id, // currentUser.id,
  });

  if (!follow) {
    return res.status(404).json({
      error: "No sigues a este usuario",
    });
  }

  await follow.delete();
  return res.status(200).json({
    message: "El usuario se ha dejado de seguir correctamente",
  });
};

module.exports = {
  followUser,
  unfollowUser,
};
