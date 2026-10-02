const supabase = require("../config/supabase");
const mediaModel = require("../models/mediaModel");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image file provided"
      });
    }

    const file = req.file;

    // Create a safe unique filename
    const fileName = `${Date.now()}-${file.originalname.replace(
      /[^a-zA-Z0-9.-]/g,
      "_"
    )}`;

    // Location inside the Supabase Storage bucket
    const filePath = `portfolio/${fileName}`;

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("portfolio-media")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (uploadError) {
      console.error("Supabase upload error:", uploadError);

      return res.status(500).json({
        success: false,
        message: "Failed to upload image to storage",
        error: uploadError.message
      });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("portfolio-media")
      .getPublicUrl(filePath);

    const fileUrl = publicUrlData.publicUrl;

    // Save image information in database
    const media = await mediaModel.createMedia({
      filename: file.originalname,
      file_url: fileUrl,
      file_type: file.mimetype,
      file_size: file.size
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      media
    });
  } catch (error) {
    console.error("Upload image error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message
    });
  }
};

const getMedia = async (req, res) => {
  try {
    const media = await mediaModel.getAllMedia();

    res.json({
      success: true,
      media
    });
  } catch (error) {
    console.error("Get media error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch media"
    });
  }
};

module.exports = {
  uploadImage,
  getMedia
};