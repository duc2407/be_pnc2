import cloudinary from 'cloudinary';

let uploadImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    res.json({
      imageUrl: result.secure_url, // URL ảnh từ Cloudinary
      message: 'Image uploaded to Cloudinary!',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to upload image' });
  }
};
module.exports = { uploadImage: uploadImage };
