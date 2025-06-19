const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');


const MOCK_ARTICLES = [
  {
    title: "Flood Relief Efforts Underway in Guwahati",
    source: "NDTV",
    url: "https://ndtv.com/guwahati-flood",
    tags: ["flood", "guwahati"],
  },
  {
    title: "Earthquake Aftershocks Shake Assam",
    source: "The Hindu",
    url: "https://thehindu.com/assam-earthquake",
    tags: ["earthquake", "assam"],
  },
  {
    title: "Cyclone Alert in Odisha",
    source: "Times of India",
    url: "https://timesofindia.indiatimes.com/cyclone-odisha",
    tags: ["cyclone"],
  }
];

router.get('/disasters/:id/official-updates', async (req, res) => {
  const { id } = req.params;

  try {
    const { data: disaster, error } = await supabase
      .from('disasters')
      .select('tags')
      .eq('id', id)
      .single();

    if (error || !disaster) {
      return res.status(404).json({ error: 'Disaster not found' });
    }

    const tags = disaster.tags || [];

    const filteredArticles = MOCK_ARTICLES.filter((article) =>
      article.tags.some((tag) => tags.includes(tag))
    );

    global.io.emit('official_updates', { disaster_id: id, articles: filteredArticles });

    res.json(filteredArticles);
  } catch (err) {
    console.error('Official update error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
