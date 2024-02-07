const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const uploadPhoto = async (req, res) => {
    // const { public_id, imagePath } = req.body;
    const { imagePath } = req.body;
    const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: false,
  };

  try {
    // await cloudinary.uploader.destroy(public_id);
    const update = await cloudinary.uploader.upload(imagePath, options);
    return res.status(200).json({
      url: update.secure_url,
      public_id: update.public_id,
    });
  } catch (error) {
    console.error(error);
  }
};

const deletePhoto = async (req, res) => {
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
  uploadPhoto,
  deletePhoto,
};
