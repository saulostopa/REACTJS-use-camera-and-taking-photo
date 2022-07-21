import React, { useState, useRef } from "react";
import Measure from "react-measure";
import { useUserMedia } from "../hooks/use-user-media";
import { useCardRatio } from "../hooks/use-card-ratio";
import { useOffsets } from "../hooks/use-offsets";
import {
  Video,
  Canvas,
  Wrapper,
  Container,
  Flash,
  Overlay,
  Button
} from "./styles";

const CAPTURE_OPTIONS = {
  audio: false,
  video: { 
    facingMode: "user",
    width: { min: 1280 },
    height: { min: 720 }
  }
};

export function Camera({ onCapture, onClear }) {
  const canvasRef = useRef();
  const videoRef = useRef();

  const [container, setContainer] = useState({ width: 0, height: 0});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [minWidth, setMinWidth] = useState(false);
  const [minHeight, setMinHeight] = useState(false);
  // const [minHeightCanvas, setMinHeightCanvas] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);
  const canvasPedding = 20;

  console.log("minHeight", minHeight);

  const mediaStream = useUserMedia(CAPTURE_OPTIONS);
  const [aspectRatio, calculateRatio] = useCardRatio(1.586);
  const offsets = useOffsets(
    videoRef.current && videoRef.current.videoWidth,
    videoRef.current && videoRef.current.videoHeight,
    container.width,
    container.height
  );

  if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
    videoRef.current.srcObject = mediaStream;
  }

  function setupVideoCanvas(orientation) {
    if ( orientation === "portrait" ) {
      videoRef.current.style.width = "414px";
      videoRef.current.style.height = "auto";
      setMinWidth(414);
      setMinHeight(715);
      setIsPortrait(true);
    }

    if ( orientation === "landscape" ) {
      videoRef.current.style.width = "665px"; // 896px
      videoRef.current.style.height = "auto";
      setMinWidth(665);
      // setMinHeightCanvas(364);
      setMinHeight(414);
    }
  }

  function handleResize(contentRect) {

    if (window.matchMedia("(orientation: portrait)").matches) {
      setupVideoCanvas('portrait');
    }
    
    if (window.matchMedia("(orientation: landscape)").matches) {
      setupVideoCanvas('landscape');
    }

    setContainer({
      width: contentRect.bounds.width,
      height: Math.round(contentRect.bounds.width / aspectRatio)
    });
  }

  function handleCanPlay() {
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth);
    setIsVideoPlaying(true);
    videoRef.current.play();
  }

  let video = document.querySelector(".videoBG");
  let canvas = document.querySelector(".canvas");
  

  console.log('canvas', canvas);
  

  function handleCapture() {
    const context = canvasRef.current.getContext("2d");
    if ( isPortrait ) {
      console.log('portrait');
      context.drawImage(
        video, -canvasPedding, -canvasPedding, canvas.width+canvasPedding, canvas.height+canvasPedding
      );
    } else {
      const adjustProportionally = 221;
      context.drawImage(
        video, -canvasPedding, -canvasPedding, canvas.width-adjustProportionally, canvas.height+canvasPedding
      );
    }

    canvasRef.current.toBlob(blob => onCapture(blob), "image/jpeg", 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
  }

  function handleClear() {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setIsCanvasEmpty(true);
    onClear();
  }

  if (!mediaStream) {
    return null;
  }

  return (
    <Measure bounds onResize={handleResize}>
      {({ measureRef }) => (
        <Wrapper>
          <Container
            ref={measureRef}
            maxWidth={videoRef.current && videoRef.current.videoWidth}
            // maxWidth={720}
            // maxHeight={videoRef.current && videoRef.current.videoHeight}
            
            style={{
              // height: `${container.height}px`
              // height: `90%`
            }}
          >

            {isVideoPlaying && (
              <Button className="btnTakePicture" onClick={isCanvasEmpty ? handleCapture : handleClear}>
                {isCanvasEmpty ? "Take a Picture" : "Take another picture"}
              </Button>
            )}
            
            <Video
              className="videoBG"
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              width={minWidth-40}
              height={minHeight-40}
              style={{
                top: `-${offsets.y}px`,
                left: `-${offsets.x}px`,
                width: `${minWidth}px`,
                height: `${minHeight}px`
                // width: `${container.width}px`,
                // minWidth: `${roteteW}px`,
                // minHeight: `${roteteH}px`,
                // width: `${container.width}px`,
                // height: `${container.height}px`
              }}
            />

            <Overlay className="overlay" hidden={!isVideoPlaying} />
            
            <Canvas
              className="canvas"
              ref={canvasRef}
              // width={`${container.width-40}`} /* 414-40 (paddings canvas) = 374 */
              // width={374} /* 414-40 (paddings canvas) = 374 */
              // height={videoRef.current.videoHeight-40} /* 720-40 (paddings canvas) = 660 */
              // height={minHeight}

              width={minWidth-40}
              height={minHeight-40}
              style={{
                // position: 'fixed',
                top:canvasPedding,
                left:canvasPedding,
                // minWidth: `${minWidth}px`,
                // minHeight: `${minHeight}px`,
              }}
            />

            <Flash
              flash={isFlashing}
              onAnimationEnd={() => setIsFlashing(false)}
            />
          </Container>
        </Wrapper>
      )}
    </Measure>
  );
}
