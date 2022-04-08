import { RefObject, useEffect, useRef, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";

function GetVideo(video: HTMLVideoElement, constraints: { video: boolean }) {
	navigator.mediaDevices
		.getUserMedia(constraints)
		.then((mediaStream) => {
			const updatedVideoElement = video;
			updatedVideoElement.srcObject = mediaStream;
			updatedVideoElement.play();
		})
		.catch((err) => {
			console.dir(err);
		});
}

function CameraStream(props: {
	videoContainer: RefObject<HTMLVideoElement>;
	videoConstraints: { video: any };
	framePreviewContainer: RefObject<HTMLCanvasElement>;
}) {
	const cameraRollContainer = useRef<HTMLDivElement>(null);
	const [mostRecentImage, setMostRecentImage] = useState<string>("");

	useEffect(() => {
		GetVideo(props.videoContainer.current!, props.videoConstraints);
	});

	return (
		<>
			<Container>
				<video
					onCanPlay={() =>
						DrawVideoToCanvas(
							props.videoContainer.current!,
							props.framePreviewContainer.current!,
							{ width: 1280, height: 720 }
						)
					}
					ref={props.videoContainer}
				/>
				<Button
					onClick={() =>
						CaptureFrame(
							props.framePreviewContainer.current!,
							cameraRollContainer.current!,
							{ fileType: "image/jpeg", fileName: "download" },
							setMostRecentImage
						)
					}
				>
					Capture Still
				</Button>
			</Container>
			<canvas ref={props.framePreviewContainer} hidden />
			<div ref={cameraRollContainer} hidden />
			<div>
				<Container fluid="sm">
					<a href={mostRecentImage} download={"downloadedImage"}>
						<Image fluid thumbnail src={mostRecentImage} />
					</a>
				</Container>
			</div>
		</>
	);
}

function CaptureFrame(
	framePreview: HTMLCanvasElement,
	cameraRoll: HTMLDivElement,
	imageProperties: { fileType: string; fileName: string },
	onFrameCaptured: any
) {
	const data = framePreview.toDataURL(imageProperties.fileType);

	const link = document.createElement("a");
	link.href = data;
	link.setAttribute("download", imageProperties.fileName);
	link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;

	cameraRoll.insertBefore(link, cameraRoll.firstChild);
	onFrameCaptured(data);
}

function DrawVideoToCanvas(
	video: HTMLVideoElement,
	framePreview: HTMLCanvasElement,
	captureSize: { width: number; height: number }
) {
	const context = framePreview.getContext("2d");

	// TODO
	const w = captureSize.width;
	const h = captureSize.height;
	framePreview.width = w;
	framePreview.height = h;

	return setInterval(() => {
		context?.drawImage(video, 0, 0, w, h);
	}, 200);
}

export { CameraStream };
