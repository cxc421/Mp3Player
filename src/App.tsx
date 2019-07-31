import React from 'react';
import styled from 'styled-components';
import MobileMask from './components/MobileMask/MobileMask';

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
`;

const App: React.FC = () => {
  return (
    <Container>
      <MobileMask />
    </Container>
  );
};

export default App;
