import React, { memo } from 'react';
import styled from 'styled-components';

interface SliderProps {
  style?: React.CSSProperties;
  imgList: string[];
  imgIndex: number;
  setImgIndex: (index: number) => void;
}

interface SliderBoxProps {
  imgSrc: string;
  isSelect?: boolean;
  posDiff: number;
}

const SliderWrpaer = styled.div`
  position: relative;
  width: 100%;
  /* background: rgba(255, 0, 0, 0.2); */
  perspective: 1000px;
  transform-style: preserve-3d;
  height: 280px;
  overflow: hidden;
`;

const SliderBox = styled.div<SliderBoxProps>`
  width: 280px;
  height: 280px;
  background: black;
  transform: translate3d(
    ${props => props.posDiff * 380}px,
    0,
    ${props => (props.posDiff === 0 ? 0 : -400)}px
  );
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  background-image: url(${prop => prop.imgSrc});
  background-size: cover;
  background-position: center center;
  transition: all 0.4s;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    opacity: ${props => (props.isSelect ? 0 : 0.7)};
    transition: all 0.4s;
  }
`;

const Slider: React.FC<SliderProps> = ({
  style,
  imgList,
  imgIndex,
  setImgIndex
}) => {
  const offset = 50;
  const [isMobile, setIsMobile] = React.useState(false);
  const [start, setStart] = React.useState<number | null>(null);

  function onMouseDown(event: React.MouseEvent) {
    if (isMobile) return;
    setStart(event.clientX);
  }

  function onMouseMove(event: React.MouseEvent) {
    if (isMobile || start === null) return;
    const end = event.clientX;

    if (end > start + offset) {
      setStart(null);
      setImgIndex(imgIndex - 1);
      return;
    }
    if (end < start - offset) {
      setStart(null);
      setImgIndex(imgIndex + 1);
      return;
    }
  }

  function onTouchStart(event: React.TouchEvent) {
    setIsMobile(true);
    const item = event.touches.item(0);
    if (item) {
      setStart(item.clientX);
    } else {
      setStart(null);
    }
  }

  function onTouchMove(event: React.TouchEvent) {
    const item = event.changedTouches.item(0);
    if (start !== null && item) {
      const end = item.clientX;

      if (end > start + offset) {
        setStart(null);
        setImgIndex(imgIndex - 1);
        return;
      }
      if (end < start - offset) {
        setStart(null);
        setImgIndex(imgIndex + 1);
        return;
      }
    }
  }

  function onTouchEnd(event: React.TouchEvent) {
    setIsMobile(false);
  }

  return (
    <SliderWrpaer
      style={style}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      {imgList.map((imgSrc, index) => (
        <SliderBox
          key={index}
          imgSrc={imgSrc}
          isSelect={index === imgIndex}
          posDiff={index - imgIndex}
        />
      ))}
    </SliderWrpaer>
  );
};

export default memo(Slider);
