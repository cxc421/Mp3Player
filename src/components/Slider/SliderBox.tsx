import React from 'react';
import styled from 'styled-components';

interface SliderBoxProps {
  imgSrc: string;
  isSelect?: boolean;
  posDiff: number;
  size: number;
}

interface WrapperProps {
  isSelect?: boolean;
}

const Wrapper = styled.div<WrapperProps>`
  width: 280px;
  height: 280px;
  background: black;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background-size: cover;
  background-position: center center;
  transition: transform 0.4s;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: ${props => (props.isSelect ? 0 : 0.7)};
    transition: transform 0.4s;
  }
`;

const SliderBox: React.FC<SliderBoxProps> = ({
  imgSrc,
  isSelect = false,
  posDiff,
  size
}) => {
  const style: React.CSSProperties = {
    width: size,
    height: size,
    transformOrigin: posDiff > 0 ? 'left center' : 'right center',
    transform: `translateX(${(size + 20) * posDiff}px) scale(${
      posDiff !== 0 ? 0.71429 : 1
    })`,
    backgroundImage: `url(${imgSrc})`
  };

  return (
    <Wrapper isSelect={isSelect} style={style}>
      box
    </Wrapper>
  );
};

export default React.memo(SliderBox);
