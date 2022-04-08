import { useRef } from "react";
import "./App.css";
import { CameraStream } from "./components/CameraStream";

function App() {
	const videoContainer = useRef<HTMLVideoElement>(null);
	const framePreviewContainer = useRef<HTMLCanvasElement>(null);
	const cameraRollContainer = useRef<HTMLDivElement>(null);

	const videoConstraints = {
		audio: false,
		video: {
			facingMode: "environment",
			width: 1280,
			height: 720,
		},
	};

	return (
		<div className="App">
			<CameraStream
				framePreviewContainer={framePreviewContainer}
				videoContainer={videoContainer}
				videoConstraints={videoConstraints}
			/>
		</div>
	);
}

export default App;
