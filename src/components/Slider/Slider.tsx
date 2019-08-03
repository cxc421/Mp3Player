import React, { memo, useState } from 'react';
import styled from 'styled-components';
import SliderBox from './SliderBox';

interface SliderProps {
  style?: React.CSSProperties;
  imgList: string[];
  imgIndex: number;
  setImgIndex: (index: number) => void;
}

const SliderWrpaer = styled.div`
  position: relative;
  width: 100%;
  /* background: rgba(255, 0, 0, 0.2); */
  height: calc(100% - 532px);
  /* overflow: hidden; */
`;

function useSliderBoxSize(wrappperRef: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = useState(280);
  const updateSize = React.useCallback(() => {
    const wrapper = wrappperRef.current;
    if (!wrapper) return;

    const { clientHeight, clientWidth } = wrapper;
    const newSize = Math.min(clientHeight, clientWidth - 95);
    setSize(newSize);
    // console.log({ newSize });
  }, [setSize, wrappperRef]);

  React.useEffect(() => {
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, [updateSize]);

  return size;
}

const Slider: React.FC<SliderProps> = ({
  style,
  imgList,
  imgIndex,
  setImgIndex
}) => {
  const offset = 50;
  const [isMobile, setIsMobile] = React.useState(false);
  const [start, setStart] = React.useState<number | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const size = useSliderBoxSize(wrapperRef);

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
      ref={wrapperRef}
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
          size={size}
        />
      ))}
    </SliderWrpaer>
  );
};

export default memo(Slider);
