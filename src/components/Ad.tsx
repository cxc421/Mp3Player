import React from 'react';
import styled from 'styled-components';
import AdImg from '../assets/imgs/ad.png';

interface AdProp {
  onClickCloseBtn: () => void;
  onClickApplyBtn: () => void;
}

const AdWrapper = styled.div`
  position: absolute;
  background: rgba(255, 255, 255, 0.7);
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
`;

const AdDialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 324px;
  width: 323px;
  max-height: 100%;
  max-width: calc(100% - 52px);
  background-color: white;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.64),
      rgba(0, 0, 0, 0.64)
    ),
    url(${AdImg});
  background-size: cover;
`;

const CloseBtn = styled.div`
  position: absolute;
  font-size: 16px;
  top: 9px;
  right: 16px;
  color: white;
  cursor: pointer;
`;

const AdParagh = styled.p`
  padding: 0;
  margin: 0;
  font-size: 24px;
  text-align: center;
  margin-top: 69px;
  color: white;
  line-height: 35px;
`;

const ApplyBtnRow = styled.div`
  margin-top: 94px;
  text-align: center;
`;

const ApplyBtn = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 205px;
  height: 58px;
  border-radius: 29px;
  border: 5px solid rgb(102, 126, 234);
  color: rgb(209, 171, 218);
  font-size: 24px;
  cursor: pointer;
`;

const Ad: React.FC<AdProp> = ({ onClickApplyBtn, onClickCloseBtn }) => {
  return (
    <AdWrapper>
      <AdDialog>
        <CloseBtn onClick={onClickCloseBtn}>關閉</CloseBtn>
        <AdParagh>
          每月享 NTD 109 吃到飽
          <br />
          滿足您的聽覺饗宴！
        </AdParagh>
        <ApplyBtnRow>
          <ApplyBtn onClick={onClickApplyBtn}>我想體驗</ApplyBtn>
        </ApplyBtnRow>
      </AdDialog>
    </AdWrapper>
  );
};

export default Ad;
