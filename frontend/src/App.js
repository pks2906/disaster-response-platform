import React, { useState } from 'react';
import DisasterList from './components/DisasterList';
import SocialFeed from './components/SocialFeed';
import OfficialUpdates from './components/OfficialUpdates'; 
import ImageVerify from './components/ImageVerify';
import DisasterForm from './components/DisasterForm';

import './App.css';
function App() {
  const [selectedDisaster, setSelectedDisaster] = useState(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Disaster Response Coordination Platform</h1>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <DisasterList onSelect={setSelectedDisaster} />
        </div>

        
        <div style={{ flex: 2 }}>
  <DisasterForm />
  
  {selectedDisaster ? (
    <>
      <h2>{selectedDisaster.title}</h2>
      <p>{selectedDisaster.description}</p>
      <p><strong>Location:</strong> {selectedDisaster.location_name}</p>

      <SocialFeed disasterId={selectedDisaster.id} />
      <OfficialUpdates disasterId={selectedDisaster.id} />
      <ImageVerify />
    </>
  ) : (
    <p>Select a disaster to view more details.</p>
  )}
</div>

      </div>
    </div>
  );
}

export default App;
