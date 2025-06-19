const express = require('express');
const router = express.Router();

const MOCK_RESPONSES = {
  "Flood in Andheri, Mumbai": {
    location_name: "Andheri, Mumbai",
    lat: 19.1197,
    lng: 72.8468
  },
  "Earthquake near Guwahati, Assam": {
    location_name: "Guwahati, Assam",
    lat: 26.1445,
    lng: 91.7362
  },
  "Cyclone warning in Odisha": {
    location_name: "Odisha",
    lat: 20.9517,
    lng: 85.0985
  }
};

router.post('/geocode', async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'Description is required' });
  }

  const result = MOCK_RESPONSES[description] || {
    location_name: "Unknown",
    lat: null,
    lng: null
  };

  res.json(result);
});

module.exports = router;
