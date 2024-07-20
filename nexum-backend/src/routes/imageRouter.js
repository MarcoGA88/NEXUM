const express = require('express');
const multer = require('multer');
const { Image } = require('../models/Image');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const { userId, description } = req.body;

    const newImage = await Image.create({
      user_id: userId,
      file_data: buffer,
      file_name: originalname,
      description: description
    });

    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
});

module.exports = router;
