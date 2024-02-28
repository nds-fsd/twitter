const User = require("../schemas/mongo/user");
const Like = require("../schemas/mongo/like");
const Follow = require("../schemas/mongo/follow");
const Bookmark = require("../schemas/mongo/bookmark");
const Meow = require("../schemas/mongo/meow");
const Notification = require("../schemas/mongo/notification");
const Userpg = require("../schemas/pg/userpg");
const { sendWelcomeEmail } = require("../service/email-service");

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
const searchUsers = async (req, res) => {
  try {
    const { substring } = req.params;

    // Dividir el substring en palabras separadas
    const keywords = substring.split(" ");

    // Crear un arreglo de expresiones regulares para cada palabra clave
    const regexKeywords = keywords.map(keyword => new RegExp(`^${keyword}`, 'i'));

    // Crear una expresión regular para buscar coincidencias en name y surname
    const regexNameSurname = new RegExp(`^${substring}`, 'i'); 

    // Buscar usuarios que coincidan con el substring en name, surname o username
    const users = await User.find({
      $or: [
        { name: { $in: regexKeywords } },
        { surname: { $in: regexKeywords } },
        { username: regexNameSurname }
      ]
    });

    // Filtrar usuarios únicos basados en su ID
    const uniqueUsers = users.filter((user, index, self) => 
      index === self.findIndex((u) => (
        u._id === user._id
      ))
    );

    res.status(200).json(uniqueUsers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const body = req.body;
    const newUser = new User(body);
    console.log(newUser);

    const createdUser = await newUser.save();

    // >> crear usuario en postgres
    try {
      const mongoUserId = createdUser._id.toString();
      await Userpg.create({
        mongo_user_id: mongoUserId,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json(error.message);
    }
    // <<

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
    /*  if(createdUser){
      await sendWelcomeEmail({name: createdUser.name, email: createdUser.mail});
    } */
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
      // Obtener IDs de Meows en los que el parentMeow ha sido eliminado
      const deletedParentMeowsIds = await Meow.distinct("_id", {
        parentMeow: { $nin: await Meow.find({}, "_id") },
      });

      // Obtener IDs de Meows que han sido eliminados por su repostedMeowId
      const deletedRepostedMeowsIds = await Meow.distinct("_id", {
        repostedMeowId: { $nin: await Meow.find({}, "_id") },
      });

      // Obtener IDs de Bookmarks que se deben eliminar
      const deletedBookmarkIds = await Bookmark.distinct("_id", {
        meowId: { $nin: await Meow.find({}, "_id") },
      });

      // Obtener IDs de Likes que se deben eliminar
      const deletedLikeIds = await Like.distinct("_id", {
        meowId: { $nin: await Meow.find({}, "_id") },
      });

      // Eliminar todos los Bookmarks y Likes relacionados con Meows que ya no existen
      await Bookmark.deleteMany({ _id: { $in: deletedBookmarkIds } });
      await Like.deleteMany({ _id: { $in: deletedLikeIds } });

      // Eliminar todos los Bookmark donde el usuario sea el userId o el meowId pertenezca a un Meow publicado por el usuario
      await Bookmark.deleteMany({
        $or: [
          { userId: userFound._id },
          {
            meowId: { $in: await Meow.find({ author: userFound._id }, "_id") },
          },
        ],
      });

      // Eliminar todos los Likes donde el usuario sea el userId o el meowId pertenezca a un Meow publicado por el usuario
      await Like.deleteMany({
        $or: [
          { userId: userFound._id },
          {
            meowId: { $in: await Meow.find({ author: userFound._id }, "_id") },
          },
        ],
      });

      // Eliminar todas las Notificaciones relacionadas con el usuario
      await Notification.deleteMany({
        $or: [{ recipient: userFound._id }, { sender: userFound._id }],
      });

      // Eliminar todos los Follows del usuario y restar 1 a los contadores de seguidores y seguidos
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

      // Eliminar todos los Meows del usuario y los que ha reposteado
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

      // Eliminar usuario de Postgres SQL
      try {
        const mongoUserId = userFound._id.toString();
        await Userpg.destroy({
          where: { mongo_user_id: mongoUserId },
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
      }

      // Eliminar el usuario
      await userFound.remove();

      res.status(201).json({ message: "Successfully deleted user" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const welcomeEmail = async (req, res) => {
  await sendWelcomeEmail({
    name: "Cecilia",
    email: "cecilia.lorenzo.galarza@gmail.com",
  });
  return res.status(200).send();
};

module.exports = {
  getAllUsers,
  getUserByUsername,
  getUserById,
  searchUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  welcomeEmail,
};
