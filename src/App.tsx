import { useRef } from 'react';
import './App.css';
import { CameraStream } from './components/CameraStream';

function App() {
  const videoContainer = useRef<HTMLVideoElement>(null);

  return (
    <div className="App">
      <CameraStream videoContainer={videoContainer}/>
    </div>
  );
}

export default App;
