import React, { useEffect, useState } from 'react';
import { getDisasters } from '../api/disaster';

const DisasterList = ({ onSelect }) => {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    fetchDisasters();
  }, []);

  const fetchDisasters = async () => {
    try {
      const res = await getDisasters();
      setDisasters(res.data);
    } catch (err) {
      console.error('Failed to fetch disasters:', err);
    }
  };

  return (
    <div>
      <h2>All Reported Disasters</h2>
      <ul>
        {disasters.map((d) => (
          <li
            key={d.id}
            onClick={() => onSelect(d)}  // 🔥 This was missing
            style={{ cursor: 'pointer', marginBottom: '1rem' }}
          >
            <strong>{d.title}</strong><br />
            <small>{d.location_name}</small><br />
            <em>{d.description}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisasterList;
