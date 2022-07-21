import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html {
    height: 100%;
  }

  body {
    overflow-x: hidden;
    overflow-y: auto;
    height: 100%;
    padding: 32px;
    margin: 0;
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
