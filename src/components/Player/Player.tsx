import React from 'react';
import styled from 'styled-components';
import {
  MdPause,
  MdRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md';
import AnlyzerGraph from './AnalyzerGraph';
import Bar from './Bar';

interface PlayerProps {
  style?: React.CSSProperties;
}

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 221px;
`;

const AnlyzerArea = styled.div`
  height: 50px;
  width: 100%;
  padding: 0 16px;
  /* background: rgba(255, 100, 100, 0.2); */
`;

const TimeArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  color: white;
  font-size: 12px;
`;

const BtnArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 55px;
  align-items: center;
  color: white;
  transform: translateY(-5px);
`;

const PuasePlayBtnOuter = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    font-size: 36px;
    display: block;
  }
`;

const Player: React.FC<PlayerProps> = ({ style }) => {
  return (
    <Wrapper style={style}>
      <AnlyzerArea>
        <AnlyzerGraph />
      </AnlyzerArea>
      <Bar style={{ marginTop: 40 }} percent={50} />
      <TimeArea>
        <span>02:35</span>
        <span>03:24</span>
      </TimeArea>
      <BtnArea>
        <MdRepeat size={24} />
        <MdSkipPrevious size={36} />
        <PuasePlayBtnOuter>
          <MdPause />
        </PuasePlayBtnOuter>
        <MdSkipNext size={36} />
        <MdShuffle size={24} />
      </BtnArea>
    </Wrapper>
  );
};

export default Player;
