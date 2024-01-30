const Meow = require("../schemas/meow");
const User = require("../schemas/user");
const Follow = require("../schemas/follow");
const mongoose = require("mongoose");

// ------------------------------------Funciones--------------------------------------------------------------------------------
const incrementRepostCounterRecursive = async (meowId) => {
  const meow = await Meow.findOne({ _id: meowId });

  if (meow) {
    // Incrementa el contador de reposts del meow actual
    await Meow.updateOne({ _id: meowId }, { $inc: { reposts: 1 } });

    if (meow.repostedMeowId) {
      // Llama recursivamente para el meow que está siendo reposteado
      await incrementRepostCounterRecursive(meow.repostedMeowId);
    }
  }
};
const getOriginalMeowId = async (meowId) => {
  // Función para obtener el ID del meow original
  let currentMeowId = meowId;
  let currentMeow = null;

  while (true) {
    currentMeow = await Meow.findOne({ _id: currentMeowId });

    if (!currentMeow || !currentMeow.repostedMeowId) {
      // Cuando no hay más reposts o el meow original es alcanzado
      break;
    }

    // Sigue buscando el meow original
    currentMeowId = currentMeow.repostedMeowId;
  }

  return currentMeowId;
};

// ------------------------------------------------------------------------------------------------------------------------------

const getAllMeows = async (req, res) => {
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

    const meowsToSend = meowsYouFollow.concat(ownMeows);

    function compararPorFecha(a, b) {
      return a.date - b.date;
    }

    meowsToSend.sort(compararPorFecha);

    return res.status(200).json(meowsToSend);
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
    return res.status(500).json(error.message);
  }
};

const createMeow = async (req, res) => {
  try {
    const body = req.body;
    const userId = req.jwtPayload.id;
    console.log(body.repostedMeowId);

    const meow = {
      text: body.meow,
      date: body.date,
      author: userId,
    };

    let originalMeowId;

    if (body.repostedMeowId) {
      originalMeowId = await getOriginalMeowId(body.repostedMeowId);

      // Incrementa el contador de reposts para todos los meows en la cadena
      await incrementRepostCounterRecursive(originalMeowId);

      meow.repostedMeowId = originalMeowId;
    }

    const meowToSave = new Meow(meow);
    await meowToSave.save();

    // Incrementa el contador de reposts para el meow recién creado
    if (meow.repostedMeowId) {
      await incrementRepostCounterRecursive(meowToSave._id);
    }

    // Incrementa el contador de meows del usuario
    await User.updateOne({ _id: userId }, { $inc: { meowCounter: 1 } });

    return res
      .status(201)
      .json({ message: "Meow created successfully", meowId: meowToSave._id });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const updateMeow = async (req, res) => {
  try {
    const { id } = req.params;
    const meowFound = await Meow.findById(id);

    if (meowFound) {
      const { text } = req.body;
      const meowUpdated = await Meow.findByIdAndUpdate(id, text, { new: true });
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
      res.status(201).json({ message: "Successfully deleted meow" });
    } else {
      res.status(404).json({ error: "Meow not found" });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getAllMeows,
  getMeowById,
  createMeow,
  updateMeow,
  deleteMeow,
};
