const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// Hardcoded mock social media posts
const MOCK_POSTS = [
  { user: "citizen1", post: "#flood Need help near Andheri", tags: ["flood"] },
  { user: "volunteer2", post: "Water rising fast in Guwahati!", tags: ["flood"] },
  { user: "teamRelief", post: "Supplies delivered at Itanagar", tags: ["relief"] },
  { user: "citizen3", post: "Aftershock in Guwahati after earthquake", tags: ["earthquake"] },
];

router.get('/disasters/:id/social-media', async (req, res) => {
  const { id } = req.params;

  try {
    // Get the disaster from Supabase
    const { data: disaster, error } = await supabase
      .from('disasters')
      .select('tags')
      .eq('id', id)
      .single();

    if (error || !disaster) {
      return res.status(404).json({ error: 'Disaster not found' });
    }

    const tags = disaster.tags || [];

    // Filter posts that match any tag
    const filteredPosts = MOCK_POSTS.filter((post) =>
      post.tags.some((tag) => tags.includes(tag))
    );

    // Real-time update via WebSocket
    global.io.emit('social_media_updated', { disaster_id: id, posts: filteredPosts });

    res.json(filteredPosts);
  } catch (err) {
    console.error('Social media route error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
