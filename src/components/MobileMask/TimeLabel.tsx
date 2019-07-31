import React, { useReducer, useEffect, memo } from 'react';
import styled from 'styled-components';
import { strPad2 } from '../../helpers/time';

const TimeLableWrapper = styled.div`
  font-family: 'SF-Pro-Text-Semibold';
  width: 54px;
  text-align: center;
  font-size: 15px;
`;

function getCurTimeStr() {
  const date = new Date();
  const hours = strPad2(date.getHours());
  const mins = strPad2(date.getMinutes());
  return `${hours}:${mins}`;
}

const inititalState = {
  timeStr: getCurTimeStr()
};

type TimeState = typeof inititalState;

type ActionType = { type: 'update' };

function reducer(state: TimeState, action: ActionType): TimeState {
  if (action.type === 'update') {
    return {
      timeStr: getCurTimeStr()
    };
  }
  return state;
}

const TimeLabel = () => {
  const [state, dispatch] = useReducer(reducer, inititalState);

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'update' });
    });
    return () => clearInterval(id);
  }, [dispatch]);

  return <TimeLableWrapper>{state.timeStr}</TimeLableWrapper>;
};

export default memo(TimeLabel);
