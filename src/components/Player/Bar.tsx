import React from 'react';
import styled from 'styled-components';

interface Percent {
  percent: number;
}

interface BarProps extends Percent {
  style?: React.CSSProperties;
}

const Wrapper = styled.div`
  position: relative;
  height: 16px;
`;

const Rect = styled.div<Percent>`
  position: absolute;
  height: 3px;
  background: white;
  top: 50%;
  left: 0;
  width: 100%;
  transform: translateY(-50%);

  &::after {
    content: '';
    display: block;
    height: 100%;
    width: ${props => props.percent}%;
    background-image: linear-gradient(
      to right,
      rgb(102, 126, 234),
      rgb(217, 175, 217)
    );
  }
`;

const CircleWrapper = styled.div`
  position: absolute;
  width: calc(100% - 16px);
  height: 100%;
  top: 0;
  left: 0;
`;

const Circle = styled.div<Percent>`
  position: absolute;
  left: ${props => props.percent}%;
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

const Bar: React.FC<BarProps> = ({ style, percent }) => {
  return (
    <Wrapper style={style}>
      <Rect percent={percent} />
      <CircleWrapper>
        <Circle percent={percent} />
      </CircleWrapper>
    </Wrapper>
  );
};

export default React.memo(Bar);
