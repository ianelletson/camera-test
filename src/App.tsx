import { useRef } from "react";
import "./App.css";
import { CameraStream } from "./components/CameraStream";

function App() {
	const videoContainer = useRef<HTMLVideoElement>(null);
	const framePreviewContainer = useRef<HTMLCanvasElement>(null);
	const cameraRollContainer = useRef<HTMLDivElement>(null);

	return (
		<div className="App">
			<CameraStream
				framePreviewContainer={framePreviewContainer}
				videoContainer={videoContainer}
			/>
		</div>
	);
}

export default App;
