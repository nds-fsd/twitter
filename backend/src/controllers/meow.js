const Meow = require("../schemas/meow");

const User = require("../schemas/user");

const Follow = require("../schemas/follow");
const { default: mongoose } = require("mongoose");
const { fi } = require("date-fns/locale");

//hola
const getFeedMeows = async (req, res) => {
  try {
    const id = req.jwtPayload.id;

    const resultado = await Follow.find({ follower: id });

    const meowsYouFollow = await Meow.find({
      author: {
        $in: resultado.map((follow) =>
          mongoose.Types.ObjectId(follow.followed)
        ),
      },
    });
    const ownMeows = await Meow.find({ author: id });

    const meowsToSend = meowsYouFollow.concat(ownMeows).filter((meow) => {
      return !meow.parentMeow;
    });

    function compararPorFecha(a, b) {
      return a.date - b.date;
    }

    // Ordenar el array 'arrayObjetos' utilizando la función de comparación
    meowsToSend.sort(compararPorFecha);

    // Ordenar el array 'elementos' utilizando la función de comparación

    res.status(200).json(meowsToSend);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getMeowById = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);

    if (meowFound) {
      res.status(200).json(meowFound);
    } else {
      res.status(404).json({ error: "Meow not found" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getMeowReplies = async (req, res) => {
  try {
    const { id } = req.params;

    const meowReplies = await Meow.find({ parentMeow: id });

    if (meowReplies.length > 0) {
      // Obtener IDs únicos de los autores
      const uniqueAuthorIds = [
        ...new Set(meowReplies.map((meow) => meow.author)),
      ];

      // Buscar usernames correspondientes a los IDs
      const authorDetails = await User.find(
        { _id: { $in: uniqueAuthorIds } },
        "username"
      );

      // Crear un mapa para acceder fácilmente a los usernames por ID
      const authorMap = authorDetails.reduce((map, user) => {
        map[user._id] = user.username;
        return map;
      }, {});

      // Mapear los usernames a los meows
      const meowRepliesWithUsernames = meowReplies.map((meow) => {
        return {
          ...meow.toObject(),
          authorUsername: authorMap[meow.author] || "Unknown User",
        };
      });

      res.status(200).json(meowRepliesWithUsernames.reverse());
    } else {
      res.status(404).json({
        message: "No replies found.",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createMeow = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.jwtPayload.id;
    console.log(req.jwtPayload);

    const meow = {
      text: body.meow,
      date: body.date,
      author: userId,
    };
    if (body.parentMeow) {
      meow.parentMeow = body.parentMeow;
    }

    const meowToSave = new Meow(meow);
    await meowToSave.save();
    res.status(201).json(meowToSave);
    await User.updateOne({ _id: userId }, { $inc: { meowCounter: 1 } });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const updateMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);
    if (meowFound) {
      const body = req.body;
      const meowUpdated = await Meow.findByIdAndUpdate(id, body, { new: true });
      res.status(201).json(meowUpdated);
    } else {
      res.status(404).json({ error: "Meow not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);
    if (meowFound) {
      await Meow.findByIdAndDelete(id);
    } else {
      res.status(404).json("Meow not found");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getFeedMeows,
  getMeowById,
  createMeow,
  updateMeow,
  deleteMeow,
  getMeowReplies,
};
