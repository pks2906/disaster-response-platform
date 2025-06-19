const express = require('express');
const router = express.Router();

const MOCK_RESPONSES = {
  "https://i.imgur.com/disaster1.jpg": {
    authenticity: "Verified",
    analysis: "Image shows clear signs of flooding and emergency responders.",
    related_to_disaster: true
  },
  "https://i.imgur.com/fakeai1.png": {
    authenticity: "Suspicious",
    analysis: "Signs of AI-generated content (blurry textures, distorted faces).",
    related_to_disaster: false
  }
};

router.post('/image-verify', async (req, res) => {
  const { image_url } = req.body;

  if (!image_url) {
    return res.status(400).json({ error: 'image_url is required' });
  }

  const result = MOCK_RESPONSES[image_url] || {
    authenticity: "Unknown",
    analysis: "Could not determine image content. It may not relate to a disaster.",
    related_to_disaster: false
  };

  global.io.emit('image_verified', { image_url, ...result });

  res.json({ image_url, ...result });
});

module.exports = router;
