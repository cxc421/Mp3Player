import React from 'react';
import styled from 'styled-components';
import { FaSignal, FaWifi, FaBatteryFull } from 'react-icons/fa';
import TimeLabel from './TimeLabel';

const MobileMaskWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 155, 155, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopRow = styled.div`
  padding: 12px 18px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div:last-child {
    display: flex;
    align-items: center;

    > * {
      margin-left: 6px;
      display: block;
    }
  }
`;

const BottomRow = styled.div`
  padding: 12px 18px;
  text-align: center;
  &::after {
    content: '';
    display: inline-block;
    width: 134px;
    height: 5px;
    border-radius: 100px;
    background: white;
  }
`;

const MobileMask = () => {
  return (
    <MobileMaskWrapper>
      <TopRow>
        <div>
          <TimeLabel />
        </div>
        <div>
          <FaSignal size={15} />
          <FaWifi size={16} />
          <FaBatteryFull size={22} />
        </div>
      </TopRow>
      <BottomRow />
    </MobileMaskWrapper>
  );
};

export default MobileMask;
