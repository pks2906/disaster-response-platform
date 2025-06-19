import React, { useState } from 'react';
import { verifyImage } from '../api/disaster';

const ImageVerify = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) return;

    setLoading(true);
    setResult(null);
    try {
      const res = await verifyImage(imageUrl);
      setResult(res.data);
    } catch (err) {
      console.error('Image verification failed:', err);
      setResult({ error: 'Failed to verify image.' });
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Image Verification</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          style={{
            width: '70%',
            padding: '0.5rem',
            marginRight: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
          required
        />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Verify
        </button>
      </form>

      {/* Optional Image Preview */}
      {imageUrl && (
        <div style={{ marginTop: '1rem' }}>
          <img
            src={imageUrl}
            alt="Preview"
            style={{
              maxWidth: '100%',
              maxHeight: '300px',
              borderRadius: '8px',
              objectFit: 'cover',
              border: '1px solid #ddd'
            }}
          />
        </div>
      )}

      {/* Response Display */}
      {loading && <p>Analyzing image...</p>}

      {result && (
        <div style={{ marginTop: '1rem' }}>
          {result.error ? (
            <p style={{ color: 'red' }}>{result.error}</p>
          ) : (
            <>
              <p><strong>Authenticity:</strong> {result.authenticity}</p>
              <p><strong>Analysis:</strong> {result.analysis}</p>
              <p>
                <strong>Related to Disaster:</strong>{' '}
                {result.related_to_disaster ? 'Yes ✅' : 'No ❌'}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageVerify;
