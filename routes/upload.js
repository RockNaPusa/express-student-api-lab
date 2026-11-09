const express = require('express');
const router = express.Router();
const cloudinary = require('../config/cloudinary');
const upload = require('../middleware/upload');
const requireAuth = require('../middleware/auth');

router.post('/', requireAuth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'lesson7_uploads' },
        (error, result) => (error ? reject(error) : resolve(result))
      );
      stream.end(req.file.buffer);
    });

    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//the extra task -delete /api/upload/:publicId --- delete file from coudinary

router.delete('/:folder/:id', requireAuth, async (req, res) => {
  try {
    const publicId = `${req.params.folder}/${req.params.id}`;

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      return res.status(404).json({ error: 'File not found or already deleted', cloudinaryResult: result });
    }

    res.json({ message: 'File deleted successfully', publicId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;