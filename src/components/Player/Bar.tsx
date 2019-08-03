import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';

interface Percent {
  percent: number;
}

interface BarProps extends Percent {
  style?: React.CSSProperties;
  onChange: (percent: number) => void;
}

const Wrapper = styled.div`
  position: relative;
  height: 16px;
`;

const Rect = styled.div`
  position: absolute;
  height: 3px;
  background: white;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);
`;

const RectColor = styled.div`
  position: absolute;
  height: 3px;
  background: white;
  top: 50%;
  left: 0;
  width: 0;
  transform: translateY(-50%);
  background-image: linear-gradient(
    to right,
    rgb(102, 126, 234),
    rgb(217, 175, 217)
  );
`;

const CircleWrapper = styled.div`
  position: absolute;
  width: calc(100% - 16px);
  height: 100%;
  top: 0;
  left: 0;
`;

const Circle = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;

  &::after {
    content: '';
    width: 8px;
    height: 8px;
    background: rgb(217, 175, 217);
    border-radius: 50%;
  }
`;

const Bar: React.FC<BarProps> = ({ style, percent, onChange }) => {
  const rangerRef = useRef<HTMLDivElement>(null);
  const [moving, setMoving] = useState(false);
  const percentStr = `${percent}%`;

  if (percent < 0 || percent > 100) {
    throw new Error('Ranger: percent oveflow! percent=' + percent);
  }

  useEffect(() => {
    const onDocumentMouseMove = (event: MouseEvent) => {
      const ranger = rangerRef.current;
      if (!ranger) return;
      const rect = ranger.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const width = rect.width;
      const percent = (x * 100) / width;

      onChange(percent);
    };

    const onDocumentMouseUp = () => {
      setMoving(false);
    };

    if (moving) {
      document.addEventListener('mousemove', onDocumentMouseMove);
      document.addEventListener('mouseup', onDocumentMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
    };
  }, [rangerRef, moving, onChange]);

  function onMouseDown(event: React.MouseEvent) {
    const ranger = rangerRef.current;
    if (!ranger) return;
    const rect = ranger.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.width;
    const percent = (x * 100) / width;

    onChange(percent);
    setMoving(true);
  }

  return (
    <Wrapper style={style} onMouseDown={onMouseDown} ref={rangerRef}>
      <Rect />
      <RectColor style={{ width: percentStr }} />
      <CircleWrapper>
        <Circle style={{ left: percentStr }} />
      </CircleWrapper>
    </Wrapper>
  );
};

export default React.memo(Bar);
