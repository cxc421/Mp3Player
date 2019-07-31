import React, { useState } from 'react';
import styled from 'styled-components';
import MobileMask from './components/MobileMask/MobileMask';
import Slider from './components/Slider/Slider';
import songImgSrc_1 from './assets/Jonas_A0_Rectangle_52_pattern@2x_cut.png';
import songImgSrc_2 from './assets/embody_A0_Rectangle_50_pattern@2x.png';
import songImgSrc_3 from './assets/coffee_A0_Path_4_pattern@2x_cut2.png';
// import Test from './components/Test';

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

const Title = styled.h1`
  padding: 0;
  margin: 0;
  font-size: 16px;
  font-weight: normal;
  text-align: center;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  margin-top: 65px;
`;

const App: React.FC = () => {
  const [selectSongIndex, setSelectSongIndex] = useState(1);
  const songImgList = [songImgSrc_1, songImgSrc_2, songImgSrc_3];

  function setNewSongIndex(index: number) {
    if (index >= 0 && index < songImgList.length) {
      setSelectSongIndex(index);
    }
  }

  return (
    <Container>
      <BackgroundMain imgSrc={songImgList[selectSongIndex]} />
      <BackgroundTop />
      <MobileMask />
      <Content>
        <Title>Chill hits</Title>
        <Slider
          imgList={songImgList}
          imgIndex={selectSongIndex}
          style={{ marginTop: 38 }}
          setImgIndex={setNewSongIndex}
        />
      </Content>
      {/* <Test imgIndex={selectSongIndex} setImgIndex={setNewSongIndex} /> */}
    </Container>
  );
};

export default App;
