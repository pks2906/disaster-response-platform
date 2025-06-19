import React, { useEffect, useState } from 'react';
import { getSocialMedia } from '../api/disaster';

const SocialFeed = ({ disasterId }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!disasterId) return;

    const fetchPosts = async () => {
      try {
        const res = await getSocialMedia(disasterId);
        console.log("Social feed data:", res.data); // ✅ Debug line
        setPosts(res.data);
      } catch (err) {
        console.error("Error fetching social feed:", err);
      }
    };

    fetchPosts();
  }, [disasterId]);

  return (
    <div>
      <h3>Social Media Posts</h3>
      {posts.length === 0 ? (
        <p>No relevant social posts found.</p>
      ) : (
        <ul>
          {posts.map((p, idx) => (
            <li key={idx}>
              <strong>@{p.user}</strong>: {p.post}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SocialFeed;
