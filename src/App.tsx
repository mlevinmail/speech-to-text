// App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import AudioRecorder from './AudioRecorder';
import Settings from './Settings';

function App() {
  const [apiKey, setApiKey] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    const storedApiKey = localStorage.getItem('openaiApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
    }
  }, []);

  const handleApiKeySave = (newApiKey: string) => {
    setApiKey(newApiKey);
    localStorage.setItem('openaiApiKey', newApiKey);
    setShowSettings(false);
  };

  return (
    <div className="App">
      <button onClick={() => setShowSettings(true)}>Settings</button>
      <h1>Audio Recorder</h1>
      <AudioRecorder />
      {showSettings && (
        <Settings
          apiKey={apiKey}
          onApiKeySave={handleApiKeySave}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
