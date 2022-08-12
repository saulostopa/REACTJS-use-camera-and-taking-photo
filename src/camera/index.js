import React, { useState, useRef, useEffect } from "react";
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
// import { IconInstructionsSideRight } from "./../components/Icons/IconInstructionsSideRight";
import bgSideOverlay from "./../assets/images/truck_left_side.png";
import bgFrontOverlay from "./../assets/images/truck_front.png";

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
  // const bgOverlay = bgSideOverlay;
  

  const [container, setContainer] = useState({ width: 0, height: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isCanvasEmpty, setIsCanvasEmpty] = useState(true);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isTakedPicture, setIsTakedPicture] = useState(false);
  const [bgOverlay, setBgOverlay] = useState(false);
  const [textInstructions, setTextInstructions] = useState(false);
  const [textUpload, setTextUpload] = useState(false);
  
  const canvasPedding = 0;
  
  const TextInstructionsSideRight  = "Close the passenger's door and align the truck’s right side profile according to this illustration. Please fit the truck within these lines.";
  const TextInstructionsSideFront  = "Close the passenger's door and align the truck’s front side profile according to this illustration. Please fit the truck within these lines."

  const textUploadPre = "Upload Picture";
  const textUploadClicked = "Uploading...";

  // const [count, setCount] = useState(0);
  // const [countInTimeout, setCountInTimeout] = useState(0);


  // useEffect(() => {
  //   setTimeout(() => {
  //     setCountInTimeout(count); // count is 0 here
  //   }, 3000);
  //   setCount(5); // Update count to be 5 after timeout is scheduled
  // }, []);


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
    calculateRatio(videoRef.current.videoHeight, videoRef.current.videoWidth)
    setIsVideoPlaying(true)
    setTextUpload(textUploadPre)
    setBgOverlay(bgSideOverlay)
    setTextInstructions(TextInstructionsSideRight)
    videoRef.current.play();
  }

  function handleCapture() {
    const context = canvasRef.current.getContext("2d");
    setTextUpload(textUploadPre)

    context.drawImage(
      videoRef.current,
      offsets.x,
      offsets.y,
      container.width,
      container.height,
      -canvasPedding,
      -canvasPedding,
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

  function setBgOverlayFront() {
    setTextUpload(textUploadClicked)
    
    setTimeout(() => {
      setBgOverlay(bgFrontOverlay)
      setTextInstructions(TextInstructionsSideFront)
      handleClear();
    }, 3000);

    
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
              <div>
              <button className="btnTakePicture" style={{
                position: 'absolute',
                left: '0',
                right: '0',
                marginLeft: '80px',
                marginRight: 'auto',
                marginTop: '290px',
                borderStyle: 'unset',
                backgroundColor: 'transparent',
                zIndex: '1',
              }}>
                <div style={{
                  "width": "290px",
                  "opacity": "0.7",
                  "display": "flex",
                  "height": "50px",
                  "padding": "0px 10px",
                  "flexWrap": "nowrap",
                  "alignItems": "center",
                  "borderRadius": "8px",
                  "backgroundColor": "rgb(65, 80, 119)",
                  "color": "rgb(255, 255, 255)",
                  "fontSize": "11px",
                  "textAlign": "left"
                }}>
                  {textInstructions}
              </div>
              </button>
              
              <button className="btnTakePicture" style={{
                position: 'absolute',
                width: '200px',
                left: '0',
                right: '0',
                marginLeft: '400px',
                marginRight: 'auto',
                marginTop: '298px',
                borderStyle: 'unset',
                backgroundColor: 'transparent',
                zIndex: '1',
              }} 
                onClick={isCanvasEmpty ? handleCapture : handleClear}>
                {isCanvasEmpty ? <IconTakePicture /> : <IconRetakePicture />}
              </button>
              </div>
            )}

            {isTakedPicture && (
              <div>
              <button className="btnUploadImg" style={{
                "position": "absolute",
                "marginTop": "298px",
                "borderStyle": "unset",
                "backgroundColor": "transparent",
                "zIndex": "1",
                "width": "200px",
                "left": "640px"
              }} 
                onClick={() => setBgOverlayFront(true)}>
                {isCanvasEmpty ? '' : <IconUploadPicture text={textUpload} />}
              </button>
              </div>
            )}

            {/* {isTakedPicture && (
              <button className="IconUploadPicture" style={{
                margin: '0px 15px',
                top: '120px',
                position: 'absolute',
                display: 'block',
                borderStyle: 'unset',
                backgroundColor: 'transparent',
                zIndex: '1',
              }} onClick={isCanvasEmpty ? handleCapture : handleClear}><IconUploadPicture /></button>  
            )} */}

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

            <Overlay hidden={!isVideoPlaying} 
              style={{
                // opacity:0.2
                }} 
            />

            <Canvas
              ref={canvasRef}
              // width={container.width-154}
              // height={container.height-200}
              width={container.width}
              height={container.height}
              style={{
                backgroundImage: `url("${bgOverlay}")`,
                backgroundPositionY: '-35px',
                // top:canvasPedding,
                top:0,
                opacity:0.2,
                // left:canvasPedding+25,
                left:0,
                borderRadius: "10px",
                // backgroundColor: "rgba(0,0,0,0.5)",
                // border: "2px solid #fff"
                // width: 796px;
                // height: 304px;

                // left: -webkit-calc(100% - 350px);
                // left: -moz-calc(100% - 350px);
                // left:"calc(100% - 650px)",
                // transform: "translateX(-250px)",
                // transitionProperty: "right, left",
                // animationDirection: "reverse",
                // transition:"2s"
                // transition: "visibility 3s, opacity 0.2s linear"
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
