import { RefObject, useEffect } from "react";

function GetVideo(videoElement: HTMLVideoElement, constraints: { video: boolean }) {
    navigator.mediaDevices
    .getUserMedia(constraints)
    .then((mediaStream) => {
        const updatedVideoElement = videoElement;
        updatedVideoElement.srcObject = mediaStream;
        updatedVideoElement.play();
    })
    .catch((err) => {
        console.dir(err);
    })
}

function Webcam(props: { videoContainer: RefObject<HTMLVideoElement> }) {

    useEffect(() => {
        GetVideo(props.videoContainer.current!, {video: true});
    });

    return (
        <video ref={props.videoContainer} />
    );
}

export { Webcam }
