const webpush = require("web-push");

webpush.setVapidDetails(
  "mailto:test@meower.com",
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

const subscription = async (req, res) => {
  console.log(req.body);
  res.status(200).json();
};

module.exports = {
  subscription,
};
