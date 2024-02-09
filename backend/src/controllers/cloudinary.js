const cloudinary = require("cloudinary").v2;
const User = require("../schemas/user");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadUserProfilePhoto = async (req, res) => {
  const { username } = req.body;
  const options = {
    overwrite: true,
    folder: "userProfile",
    public_id: `userProfile-${username}`,
  };

  try {
    const userFile = req.file;

    if (!userFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageAsBase64 = `data:${
      userFile.mimetype
    };base64,${userFile.buffer.toString("base64")}`;
    cloudinary.uploader.upload(
      imageAsBase64,
      options,
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Couldn't upload photo" });
        }

        await User.findOneAndUpdate(
          { username },
          { userProfilePhoto: result.secure_url, userProfilePhotoStatus: true }
        );

        return res.status(200).json(result);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const uploadBackgroundProfilePhoto = async (req, res) => {
  const { username } = req.body;
  const options = {
    overwrite: true,
    folder: "backgroundProfile",
    public_id: `backgroundProfile-${username}`,
  };

  try {
    const backgroundFile = req.file;

    if (!backgroundFile) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const imageAsBase64 = `data:${
      backgroundFile.mimetype
    };base64,${backgroundFile.buffer.toString("base64")}`;
    cloudinary.uploader.upload(
      imageAsBase64,
      options,
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Couldn't upload photo" });
        }

        await User.findOneAndUpdate(
          { username },
          {
            backgroundProfilePhoto: result.secure_url,
            backgroundProfilePhotoStatus: true,
          }
        );
        return res.status(200).json(result);
      }
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
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
