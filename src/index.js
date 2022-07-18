import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera";
import { Root, Preview, Footer, GlobalStyle } from "./styles";
import { Header } from './components/Header';
import {
  Button
} from "./camera/styles";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();

  return (
    <Fragment>
      <Root>
        <Header className="App-header"></Header>
        {/* <h3 style={{alignItems:'center', fontFamily:'Poppins,sans-serif', fontSize:'14px'}}>Image Overlay</h3> */}
        {isCameraOpen && (
          <Camera
            onCapture={blob => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}

        {cardImage && (
          <div style={{display:'contents'}}>
            <h2 style={{alignItems:'center', fontFamily:'Poppins,sans-serif', fontSize:'14px'}}>Preview</h2>
            <Preview src={cardImage && URL.createObjectURL(cardImage)} />
            <Button onClick={() => {setIsCameraOpen(false); setCardImage(undefined); }}>Upload Picture</Button>
          </div>
        )}

        <Footer>
          <Button onClick={() => setIsCameraOpen(true)}>Open Camera</Button>
          <Button
            onClick={() => {
              setIsCameraOpen(false);
              setCardImage(undefined);
            }}
          >
            Close Camera
          </Button>
        </Footer>
      </Root>
      <GlobalStyle />
    </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
