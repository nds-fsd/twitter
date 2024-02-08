const cloudinary = require("cloudinary").v2;
const User = require("../schemas/user");
require("dotenv").config();
const Multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
}).single("file");

async function handleUpload(file, options) {
  try {
    const res = await cloudinary.uploader.upload(file, options);
    return res;
  } catch (error) {
    throw new Error(`Error uploading file to Cloudinary: ${error.message}`);
  }
}

const uploadUserProfilePhoto = async (req, res) => {
  const { username } = req.body;
  const options = {
    overwrite: true,
    folder: "userProfile",
    public_id: `userProfile-${username}`,
  };

  try {
    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = req.file;

      if (!file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const cldRes = await handleUpload(file.buffer, options);

      await User.findOneAndUpdate(
        { username },
        { userProfilePhoto: cldRes.secure_url },
        { userProfilePhotoStatus: true }
      );

      return res.status(200).json(cldRes);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadBackgroundProfilePhoto = async (req, res) => {
  const { image, username } = req.body;
  const options = {
    overwrite: true,
    folder: "backgroundProfile",
    public_id: `backgroundProfile-${username}`,
  };

  try {
    const update = await cloudinary.uploader.upload(image, options);
    await User.findOneAndUpdate(
      username,
      { backgroundProfilePhoto: update.secure_url },
      { backgroundProfilePhotoStatus: true }
    );
    return res.status(200);
  } catch (error) {
    console.error(error);
  }
};

const deleteProfilePhoto = async (req, res) => {
  const { public_id } = req.body;

  try {
    await cloudinary.uploader.destroy(public_id);
    return res.status(200).json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  uploadUserProfilePhoto,
  uploadBackgroundProfilePhoto,
  deleteProfilePhoto,
};
