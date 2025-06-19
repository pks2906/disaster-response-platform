import React, { useState } from 'react';
import axios from 'axios';

const API = 'https://disaster-backend-jbk9.onrender.com/api/disasters';

const DisasterForm = () => {
  const [form, setForm] = useState({
    title: '',
    location_name: '',
    description: '',
    tags: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const payload = {
      ...form,
      tags: form.tags.split(',').map((tag) => tag.trim()),
      owner_id: 'admin001' // default owner
    };

    try {
      const res = await axios.post(API, payload);
      setMessage('✅ Disaster created successfully!');
      setForm({ title: '', location_name: '', description: '', tags: '' });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to create disaster.');
    }
  };

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3>Create a New Disaster</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <input
          type="text"
          name="location_name"
          placeholder="Location"
          value={form.location_name}
          onChange={handleChange}
          required
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          rows="3"
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma-separated)"
          value={form.tags}
          onChange={handleChange}
          style={{ display: 'block', marginBottom: '0.5rem', width: '100%' }}
        />
        <button type="submit">Create Disaster</button>
      </form>
      {message && <p style={{ marginTop: '0.5rem' }}>{message}</p>}
    </div>
  );
};

export default DisasterForm;
