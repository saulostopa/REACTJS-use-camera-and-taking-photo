import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  html,body {
    width:100vw;
    height: 100vh;
    margin: 0;
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
  padding: 0px 0 100px;

  .btnTakePicture {
    position: absolute;
    display: flex;
    margin: 40px 40px;
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

export const Preview = styled.img`
  width: 100%;
  height: auto;
`;

export const Footer = styled.footer`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  background: none; /* silver */

  button {
    margin: 0 10px;
  }

  .btnFooter {
    display: flex;
    margin: 20px 5px;
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
