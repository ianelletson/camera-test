import React, { useEffect, useRef } from 'react';
import './App.css';
import { Webcam } from './components/Webcam';

function App() {
  const videoContainer = useRef<HTMLVideoElement>(null);

  return (
    <div className="App">
      <Webcam videoContainer={videoContainer}/>
    </div>
  );
}

export default App;
