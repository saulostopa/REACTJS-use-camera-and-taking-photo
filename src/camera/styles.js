import styled, { keyframes, css } from "styled-components";

const flashAnimation = keyframes`
  from {
    opacity: 0.75;
  }

  to {
    opacity: 0;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
`;

export const Container = styled.div`
  /* position: relative; */
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth && `${maxWidth}px`};
  max-height: ${({ maxHeight }) => maxHeight && `${maxHeight}px`};
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const Video = styled.video`
  /* position: absolute; */
  /* display: block; */
  z-index: -1;
  width: 100%;
  height: auto;
  ${'' /* padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left); */}

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }

  

  @media (min-aspect-ratio: 16/9) {
    #videoBG {
        width:100%;
        height: auto;
        display: block;
    }
  }

  @media (max-aspect-ratio: 16/9) {
    #videoBG { 
        width:auto;
        height: 100%;
        display: block;
    }
  }

  @media (max-width: 767px) {
    #videoBG {
        display: none;
    }
    body {
        background: url('logo.svg');
        background-size: cover;
    }
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  bottom: 20px;
  left: 20px;
  box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.4);
  border: 1px solid #ffffff;
  border-radius: 10px;

  /* width: 80%;
  height: 80%; */
`;

export const Flash = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  opacity: 0;

  ${({ flash }) => {
    if (flash) {
      return css`
        animation: ${flashAnimation} 750ms ease-out;
      `;
    }
  }}
`;

export const Button = styled.button`
  ${'' /* width: 75%;
  min-width: 100px;
  max-width: 250px;
  margin-top: 24px;
  padding: 12px 24px;
  background: silver; */}
`;
