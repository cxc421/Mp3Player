import React, { Component } from 'react';
import styled from 'styled-components';

interface TestProps {
  imgIndex: number;
  setImgIndex: (index: number) => void;
}

const Wrapper = styled.div`
  width: 100%;
  height: 80px;
  font-size: 20px;
  text-align: center;
  position: absolute;
  top: 400px;
`;

class Test extends Component<TestProps> {
  state = {
    text: 'Hello'
  };
  start: null | number = null;

  onTouchStart = (event: TouchEvent) => {
    const item = event.touches.item(0);
    if (item) {
      this.start = item.clientX;
      this.setState({ text: 'touch start=' + this.start });
    } else {
      this.setState({ text: 'touch node not exist' });
      this.start = null;
    }
  };

  onTouchEnd = (event: TouchEvent) => {
    const offset = 50;
    const item = event.changedTouches.item(0);
    if (this.start !== null && item) {
      const end = item.clientX;

      if (end > this.start + offset) {
        this.setState({ text: 'to right' });
      }

      if (end < this.start - offset) {
        this.setState({ text: 'to left' });
      }
    }
  };

  onTouchMove = (event: TouchEvent) => {
    const offset = 60;
    const item = event.changedTouches.item(0);
    if (this.start !== null && item) {
      const end = item.clientX;

      if (end > this.start + offset) {
        this.setState({ text: 'to right' });
        this.props.setImgIndex(this.props.imgIndex - 1);
        this.start = null;
        return;
      }
      if (end < this.start - offset) {
        this.setState({ text: 'to left' });
        this.props.setImgIndex(this.props.imgIndex + 1);
        this.start = null;
        return;
      }
    }
  };

  componentDidMount() {
    window.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove);
  }

  componentWillUnmount() {
    window.removeEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchmove', this.onTouchMove);
  }

  render() {
    return (
      <Wrapper>
        <h1>{this.state.text}</h1>
      </Wrapper>
    );
  }
}

export default Test;
