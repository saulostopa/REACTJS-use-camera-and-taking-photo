import React, { Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { Camera } from "./camera";
import { IconOpenCamera } from "./components/Icons/IconOpenCamera";
import { IconCloseCamera } from "./components/Icons/IconCloseCamera";
import { Root, Preview, Footer, GlobalStyle } from "./styles";

function App() {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cardImage, setCardImage] = useState();

  return (
    <React.StrictMode>
    <Fragment>
      <Root>
        {isCameraOpen && (
          <Camera
            onCapture={blob => setCardImage(blob)}
            onClear={() => setCardImage(undefined)}
          />
        )}

        {cardImage && (
          <div className="preview" style={{display: 'none'}}>
            <Preview src={cardImage && URL.createObjectURL(cardImage)} />
          </div>
        )}

        <Footer>
          <button className="iconOpenCamera" style={{
            margin: '0px 15px',
            top: '10px',
            position: 'absolute',
            display: 'block',
            borderStyle: 'unset',
            backgroundColor: 'transparent',
          }} onClick={() => setIsCameraOpen(true)}><IconOpenCamera /></button>

          <button className="iconCloseCamera" style={{
            margin: '0px 15px',
            top: '60px',
            position: 'absolute',
            display: 'block',
            borderStyle: 'unset',
            backgroundColor: 'transparent',
          }} onClick={() => {
              setIsCameraOpen(false);
              setCardImage(undefined);
            }}><IconCloseCamera /></button>

        </Footer>
      </Root>
      <GlobalStyle />
    </Fragment>
    </React.StrictMode>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
