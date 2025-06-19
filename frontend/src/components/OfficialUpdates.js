import React, { useEffect, useState } from 'react';
import { getOfficialUpdates } from '../api/disaster';

const OfficialUpdates = ({ disasterId }) => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    if (!disasterId) return;

    const fetchUpdates = async () => {
      try {
        const res = await getOfficialUpdates(disasterId);
        setUpdates(res.data);
      } catch (err) {
        console.error("Failed to fetch official updates:", err);
      }
    };

    fetchUpdates();
  }, [disasterId]);

  return (
    <div>
      <h3>Official News Updates</h3>
      {updates.length === 0 ? (
        <p>No news articles found.</p>
      ) : (
        <ul>
          {updates.map((article, idx) => (
            <li key={idx} style={{ marginBottom: '0.8rem' }}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                <strong>{article.title}</strong>
              </a>
              <br />
              <small>{article.source}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OfficialUpdates;
