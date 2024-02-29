const Userpg = require("../schemas/pg/userpg");

const getUserpg = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Userpg.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  getUserpg,
};
