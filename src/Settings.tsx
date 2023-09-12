// Settings.tsx

import React, { useState, useEffect } from 'react';

interface SettingsProps {
  apiKey: string;
  onApiKeySave: (newApiKey: string) => void;
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ apiKey, onApiKeySave, onClose }) => {
  const [localApiKey, setLocalApiKey] = useState<string>(apiKey);

  useEffect(() => {
    setLocalApiKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    onApiKeySave(localApiKey);
    onClose();
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Settings</h2>
        <label>
          OpenAI API Key:
          <input
            type="text"
            value={localApiKey}
            onChange={(e) => setLocalApiKey(e.target.value)}
          />
        </label>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  const modalStyle: React.CSSProperties = {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  };

  
export default Settings;
