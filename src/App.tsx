import React, { useState } from 'react';
import styled from 'styled-components';

import { playList as defaultPlayList } from './PlayList';

// import songImgSrc_1 from './assets/imgs/Jonas_A0_Rectangle_52_pattern@2x_cut.png';
// import songImgSrc_2 from './assets/imgs/embody_A0_Rectangle_50_pattern@2x.png';
// import songImgSrc_3 from './assets/imgs/coffee_A0_Path_4_pattern@2x_cut2.png';
import heartImgSrc from './assets/imgs/heart.png';
import manuAddImgSrc from './assets/imgs/manu_add.png';
import uploadImgSrc from './assets/imgs/upload.png';

import MobileMask from './components/MobileMask/MobileMask';
import Slider from './components/Slider/Slider';
import Player from './components/Player/Player';

type PlayListType = typeof defaultPlayList;

interface ImgSrc {
  imgSrc: string;
}

const Container = styled.div`
  position: relative;
  width: 375px;
  height: 812px;
  width: 100%;
  height: 100%;
  background: black;
  max-height: 100%;
  max-width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
`;

const BackgroundMain = styled.div<ImgSrc>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(1.1);
    background: url(${props => props.imgSrc});
    background-size: cover;
    background-position: center top;
    filter: brightness(1.55) blur(30px);
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 1)
    );
    opacity: 0.6;
  }
`;

const BackgroundTop = styled.div`
  background: rgba(255, 255, 255, 0.18);
  height: 96px;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PlayListName = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  color: white;
  margin-top: 65px;
`;

const SongName = styled.h2`
  padding: 0;
  margin: 0;
  font-size: 24px;
  font-weight: normal;
  text-align: center;
  color: white;
  margin-top: 26px;
`;

const ArtistName = styled.h3`
  padding: 0;
  margin: 0;
  font-size: 18px;
  font-weight: normal;
  text-align: center;
  color: white;
  margin-top: 12px;
`;

const BtnRow = styled.div`
  margin-top: 26px;
  display: flex;
  justify-content: space-around;
`;

const CircleBtn = styled.div`
  border-radius: 50%;
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    transition: 0ms background;
    background: rgba(255, 255, 255, 0.5);
  }

  @media only screen and (min-width: 769px) {
    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
`;

const App: React.FC = () => {
  const [playList, setPlayList] = useState(Array.from(defaultPlayList));
  const [loop, setLopp] = useState(false);
  const [randomPlay, setRandomPlay] = useState(false);
  const [selectSongIndex, setSelectSongIndex] = useState(1);
  const song = playList[selectSongIndex];
  const songImgList = React.useMemo(() => playList.map(list => list.imgSrc), [
    playList
  ]);

  function setNewSongIndex(index: number) {
    if (index >= 0 && index < playList.length) {
      setSelectSongIndex(index);
    }
  }

  function toNextSong() {
    let nextIndex = selectSongIndex + 1;
    if (nextIndex < playList.length) {
      setSelectSongIndex(nextIndex);
    } else if (loop) {
      setSelectSongIndex(0);
    }
  }

  function toPrevSong() {
    let nextIndex = selectSongIndex - 1;
    if (nextIndex >= 0) {
      setSelectSongIndex(nextIndex);
    } else if (loop) {
      setSelectSongIndex(playList.length - 1);
    }
  }

  function toggleLoop() {
    setLopp(!loop);
  }

  function toggleRandomPlay() {
    const newRandomPlay = !randomPlay;
    setRandomPlay(newRandomPlay);

    if (newRandomPlay) {
      const copyPlayList = Array.from(defaultPlayList);
      const newPlayList: PlayListType = [];
      // first put current song to first index
      const [curSong] = copyPlayList.splice(selectSongIndex, 1);
      newPlayList.push(curSong);
      // then random retive song
      while (copyPlayList.length > 0) {
        const songIndex = Math.floor(Math.random() * copyPlayList.length);
        const [song] = copyPlayList.splice(songIndex, 1);
        newPlayList.push(song);
      }
      // set new playlsit & update songIndex
      setPlayList(newPlayList);
      setSelectSongIndex(0);
      console.log('Now is random:');
      console.log(newPlayList);
    } else {
      const newPlayList = Array.from(defaultPlayList);
      const curSong = playList[selectSongIndex];
      const newIndex = newPlayList.findIndex(song => song.id === curSong.id);
      // set new playlsit & update songIndex
      setPlayList(newPlayList);
      setSelectSongIndex(newIndex);
      console.log('Now is normal playlsit');
      console.log(newPlayList);
      console.log({ newIndex });
    }
  }

  return (
    <Container>
      <BackgroundMain imgSrc={playList[selectSongIndex].imgSrc} />
      <BackgroundTop />
      <MobileMask />
      <Content>
        <PlayListName>Chill hits</PlayListName>
        <Slider
          imgList={songImgList}
          imgIndex={selectSongIndex}
          style={{ marginTop: 38 }}
          setImgIndex={setNewSongIndex}
        />
        <SongName>{song.musicName}</SongName>
        <ArtistName>{song.artist}</ArtistName>
        <BtnRow>
          <CircleBtn>
            <img
              src={uploadImgSrc}
              alt=""
              style={{ width: 16.27, marginTop: -4, marginRight: -2 }}
            />
          </CircleBtn>
          <CircleBtn>
            <img src={heartImgSrc} alt="" style={{ width: 21 }} />
          </CircleBtn>
          <CircleBtn>
            <img
              src={manuAddImgSrc}
              alt=""
              style={{ width: 22, marginBottom: -4, marginRight: -5 }}
            />
          </CircleBtn>
        </BtnRow>
        <Player
          src={song.musicSrc}
          toNextSong={toNextSong}
          toPrevSong={toPrevSong}
          loop={loop}
          toggleLoop={toggleLoop}
          randomPlay={randomPlay}
          toggleRandomPlay={toggleRandomPlay}
        />
      </Content>
    </Container>
  );
};

export default App;
