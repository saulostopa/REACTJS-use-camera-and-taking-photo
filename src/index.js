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

        {console.log(cardImage)}

        
          <div className="preview" id="preview"
            style={{position: 'absolute', top: '0', left: '0', right: '0', bottom: '0', overflow: 'scroll'}}>
            {cardImage && (
            <Preview src={cardImage && URL.createObjectURL(cardImage)} />
            )}
          </div>
        

        <Footer>
          {/* <button onClick={scrollToElement}>Trigger the scroll</button> */}
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