import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import {
  MdPlayArrow,
  MdPause,
  MdRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious
} from 'react-icons/md';
import AnlyzerGraph from './AnalyzerGraph';
import Bar from './Bar';
import { secToTimeText } from '../../helpers/time';

interface PlayerProps {
  style?: React.CSSProperties;
  src: string;
  loop: boolean;
  randomPlay: boolean;
  toggleRandomPlay: () => void;
  toggleLoop: () => void;
  toNextSong: () => void;
  toPrevSong: () => void;
}

enum PlayerStatus {
  Play,
  Pause
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
  margin-top: 2px;
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

const Player: React.FC<PlayerProps> = ({
  style,
  src,
  toNextSong,
  toPrevSong,
  loop,
  toggleLoop,
  randomPlay,
  toggleRandomPlay
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playIfDurationChange, setPlayIfDurationChange] = useState(false);
  const [status, setStatus] = useState(PlayerStatus.Pause);
  const [curSec, setCurSec] = useState(0);
  const [totalSec, setTotalSec] = useState(0);
  const percent = totalSec > 0 ? 100 * (curSec / totalSec) : 0;
  const curTimeText = secToTimeText(Math.round(curSec));
  const totalTimeText = secToTimeText(Math.round(totalSec));

  function onAudioPlay() {
    setStatus(PlayerStatus.Play);
  }

  function onAudioPause() {
    setStatus(PlayerStatus.Pause);
  }

  function onClickIcon() {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setPlayIfDurationChange(true);
    } else {
      audio.pause();
      setPlayIfDurationChange(false);
    }
  }

  function onAudioDurationChange() {
    const audio = audioRef.current;
    if (!audio) return;

    setTotalSec(audio.duration);
    if (playIfDurationChange && audio.duration > 0) {
      audio.play();
    }
  }

  function onAudioTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;

    setCurSec(audio.currentTime);
  }

  function onRangerChange(newPercent: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const newCurTime = (totalSec * newPercent) / 100;
    if (newCurTime <= totalSec && newCurTime >= 0) {
      audio.currentTime = newCurTime;
    }
  }

  function onAudionEnded() {
    const audio = audioRef.current;
    if (!audio) return;

    toNextSong();
  }

  return (
    <Wrapper style={style}>
      <audio
        src={src}
        ref={audioRef}
        onPlay={onAudioPlay}
        onPause={onAudioPause}
        onDurationChange={onAudioDurationChange}
        onTimeUpdate={onAudioTimeUpdate}
        onEnded={onAudionEnded}
      />
      <AnlyzerArea>
        <AnlyzerGraph />
      </AnlyzerArea>
      <Bar
        style={{ marginTop: 40 }}
        percent={percent}
        onChange={onRangerChange}
      />
      <TimeArea>
        <span>{curTimeText}</span>
        <span>{totalTimeText}</span>
      </TimeArea>
      <BtnArea>
        <MdRepeat
          size={24}
          style={{
            color: loop ? '#00c2ff' : 'white'
          }}
          onClick={toggleLoop}
        />
        <MdSkipPrevious size={36} onClick={toPrevSong} />
        <PuasePlayBtnOuter onClick={onClickIcon}>
          {status === PlayerStatus.Pause ? <MdPlayArrow /> : <MdPause />}
        </PuasePlayBtnOuter>
        <MdSkipNext size={36} onClick={toNextSong} />
        <MdShuffle
          size={24}
          style={{
            color: randomPlay ? '#00c2ff' : 'white'
          }}
          onClick={toggleRandomPlay}
        />
      </BtnArea>
    </Wrapper>
  );
};

export default Player;
