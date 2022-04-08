import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import "./App.css";
import { CameraStream } from "./components/CameraStream";

function CameraSelector(props: { facing: any; onToggle: any }) {
	const [facingDisplay, setFacingDisplay] = useState("Rear Camera");

	useEffect(() => {
		if (props.facing === "environment") {
			setFacingDisplay("Rear Camera");
		} else {
			setFacingDisplay("Front Camera");
		}
	}, [facingDisplay, props.facing]);

	return (
		<Button
			onClick={() => {
				props.onToggle();
			}}
		>
			{facingDisplay}
		</Button>
	);
}

function App() {
	const videoContainer = useRef<HTMLVideoElement>(null);
	const framePreviewContainer = useRef<HTMLCanvasElement>(null);
	const cameraRollContainer = useRef<HTMLDivElement>(null);

	const [facing, setFacing] = useState("environment");

	const videoConstraints = {
		audio: false,
		video: {
			facingMode: facing,
			width: 1280,
			height: 720,
		},
	};

	return (
		<div className="App">
			<CameraSelector
				facing={facing}
				onToggle={() => {
					if (facing === "environment") {
						setFacing("user");
					} else {
						setFacing("environment");
					}
				}}
			/>
			<CameraStream
				framePreviewContainer={framePreviewContainer}
				videoContainer={videoContainer}
				videoConstraints={videoConstraints}
			/>
		</div>
	);
}

export default App;
