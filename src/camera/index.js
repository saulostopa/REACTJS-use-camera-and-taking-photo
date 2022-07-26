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
  Overlay
} from "./styles";
import { IconUploadPicture } from "./../components/Icons/IconUploadPicture";
import { IconTakePicture } from "./../components/Icons/IconTakePicture";
import { IconRetakePicture } from "./../components/Icons/IconRetakePicture";


const CAPTURE_OPTIONS = {
  audio: false,
  video: { 
    facingMode: "environment",
    width: { min: 896 },
    // width: { min: 812, ideal: 812, max: 812 },
    // width: { min: 812, ideal: 1280 },
    // height: { min: 720, idal: 720, max: 720 }
  }
};

export function Camera({ onCapture, onClear }) {
  const canvasRef = useRef();
  const videoRef = useRef();

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isTakedPicture, setIsTakedPicture] = useState(false);
  
  const canvasPedding = 50;

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

  function handleResize(contentRect) {
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

  function handleCapture() {
    const context = canvasRef.current.getContext("2d");

    context.drawImage(
      videoRef.current,
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      -canvasPedding-27,
      -canvasPedding-2,
      container.width,
      container.height
    );

    canvasRef.current.toBlob(blob => onCapture(blob), "image/jpeg", 1);
    setIsCanvasEmpty(false);
    setIsFlashing(true);
    setIsTakedPicture(true);
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
            maxHeight={videoRef.current && videoRef.current.videoHeight}
            maxWidth={videoRef.current && videoRef.current.videoWidth}
            style={{
              height: `${container.height}px`
            }}
          >

            {isVideoPlaying && (
              <button className="btnTakePicture_" style={{
                position: 'absolute',
                left: '0',
                right: '0',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '30%',
                borderStyle: 'unset',
                backgroundColor: 'transparent',
                zIndex: '1',
              }} 
                onClick={isCanvasEmpty ? handleCapture : handleClear}>
                {isCanvasEmpty ? <IconTakePicture /> : <IconRetakePicture />}
              </button>
            )}

            {isTakedPicture && (
              <button className="IconUploadPicture" style={{
                margin: '0px 15px',
                top: '120px',
                position: 'absolute',
                display: 'block',
                borderStyle: 'unset',
                backgroundColor: 'transparent',
                zIndex: '1',
              }} onClick={isCanvasEmpty ? handleCapture : handleClear}><IconUploadPicture /></button>
            )}

            <Video
              ref={videoRef}
              hidden={!isVideoPlaying}
              onCanPlay={handleCanPlay}
              autoPlay
              playsInline
              muted
              style={{
                top: `-${offsets.y}px`,
                left: `-${offsets.x}px`
              }}
            />

            {/* <Overlay hidden={!isVideoPlaying} /> */}

            <Canvas
              ref={canvasRef}
              width={container.width-154}
              height={container.height-200}
              style={{
                top:canvasPedding,
                left:canvasPedding+25,
                borderRadius: "10px",
                // backgroundColor: "rgba(0,0,0,0.5)",
                border: "2px solid #fff"
                // width: 796px;
                // height: 304px;
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
