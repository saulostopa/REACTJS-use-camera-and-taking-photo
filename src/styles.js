import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html,body {
    width:100vw;
    height: 100vh;
    margin: 0;

    @media only screen 
      and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) and (orientation: landscape),
      only screen and (min--moz-device-pixel-ratio: 2),
      only screen and (-o-min-device-pixel-ratio: 2/1),
      only screen and (min-device-pixel-ratio: 2)
    {
      
    }
  }

  /*html { height: 100%; }*/

  body {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    padding: 32px;
    padding: 0;
  }

  div#root {
    height: 100%;
  }
`;

export const Root = styled.main`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0px;
  
  .btnTakePicture {
    position: absolute;
    display: flex;
    width: 160px;
    margin: 60px 80px;
    height: 40px;
    padding: 10px;
    align-items: center;
    border-radius: 8px;
    background-color: #f85731;
    transition: background-color .3s;
    color: #fff;
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
    border-style: unset;
    z-index: 1;
    justify-content: center;
  }
`;

export const Preview = styled.img`
  width: 100%;
  height: auto;
`;

export const Footer = styled.footer`
  position: absolute;
  top: 11px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 140px;
  ${'' /* background: silver; */}

  button {
    margin: 0 10px;
  }

  .btnFooter {
    width: 180px;
    margin: 10px 10px;
    display: flex;
    height: 40px;
    padding: 0 40px;
    align-items: center;
    border-radius: 8px;
    background-color: #f85731;
    transition: background-color .3s;
    color: #fff;
    font-size: 14px;
    line-height: 24px;
    font-weight: 600;
    border-style: unset;
    z-index: 1;
  }
`;
