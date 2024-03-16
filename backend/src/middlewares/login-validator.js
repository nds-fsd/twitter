const validateLogin = async (req, res, next) => {
  const { mail, password } = req.body;

  if (!mail || !password)
    return res.status(400).json({ error: "Missing mail or password." });

  next();
};

module.exports = { validateLogin };
