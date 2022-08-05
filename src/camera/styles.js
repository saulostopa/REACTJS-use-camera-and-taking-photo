import styled, { keyframes, css } from "styled-components";
// import truck from "./../assets/images/truck.png";
import truck_ford from "./../assets/images/truck_ford.png";

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
  position: relative;
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
  ${'' /* box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.1); */} */}
  ${'' /* border: 2px solid #ffffff; */}
  border-radius: 10px;

  opacity: 0.2;
  background-image: url('${truck_ford}');
  ${'' /* background: url("./assets/images/truck.png") no-repeat center center; */}
  background-repeat: no-repeat;
  background-position: 50% 0;
  background-size: cover;
`;

export const Video = styled.video`
  position: absolute;
  z-index: -1;

  &::-webkit-media-controls-play-button {
    display: none !important;
    -webkit-appearance: none;
  }
`;

export const Overlay = styled.div`
  position: absolute;
  top: 50px;
  right: 75px;
  bottom: 146px;
  left: 75px;
  ${'' /* box-shadow: 0px 0px 20px 56px rgba(0, 0, 0, 0.1); */}
  ${'' /* border: 2px solid #ffffff; */}
  ${'' /* border-radius: 10px; */}
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
  width: 75%;
  min-width: 100px;
  max-width: 250px;
  margin-top: 24px;
  padding: 12px 24px;
  ${'' /* background: silver; */}
`;
