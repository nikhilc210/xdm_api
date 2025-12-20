exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ status: "error", message: "No image file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    res.status(200).json({
      status: "success",
      message: "Image uploaded successfully",
      url: imageUrl,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};
