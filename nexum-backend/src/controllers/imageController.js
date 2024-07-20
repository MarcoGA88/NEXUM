const Image = require('../models/Image');
const fs = require('fs');
const path = require('path');

exports.uploadImage = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;
    const image = await Image.create({
      name: originalname,
      data: buffer,
    });
    res.status(201).json(image);
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
};

exports.getImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.set('Content-Type', 'image/jpeg');
    res.send(image.data);
  } catch (error) {
    res.status(500).json({ error: 'Error getting image' });
  }
};
