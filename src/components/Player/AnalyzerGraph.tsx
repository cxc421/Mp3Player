import React from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

class AnalyzerGraph extends React.PureComponent {
  canvasRef = React.createRef<HTMLCanvasElement>();

  draw() {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // update size
    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);
    // clear background
    ctx.clearRect(0, 0, w, h);

    // draw one bar
    const barWidth = 6;
    // const barHeight = 30;
    const barDistance = 2;
    const borderRadius = barWidth / 2;
    // ctx.fillRect(0, h, barWidth, -barHeight);
    const barHeightList = [
      16,
      23,
      18,
      25,
      23,
      36,
      29,
      42,
      25,
      15,
      32,
      29,
      39,
      23,
      29,
      47,
      42,
      25,
      17,
      20,
      12,
      16,
      27,
      21,
      35,
      25,
      32,
      14,
      27,
      19,
      9,
      14,
      20,
      13,
      16,
      25,
      20,
      35,
      16,
      22,
      5,
      12,
      20
    ];
    console.log('barHeightList.length = ' + barHeightList.length);

    barHeightList.forEach((barHeight, index) => {
      const xPos = (barWidth + barDistance) * index;
      if (barHeight > barWidth) {
        ctx.beginPath();
        ctx.moveTo(xPos + barWidth, h - borderRadius);
        ctx.arc(
          xPos + borderRadius,
          h - borderRadius,
          borderRadius,
          0,
          Math.PI
        );
        ctx.lineTo(xPos, h - (barHeight - barWidth));
        ctx.arc(
          xPos + borderRadius,
          h - (barHeight - barWidth),
          borderRadius,
          Math.PI,
          Math.PI * 2
        );
        ctx.closePath();
        const gradient = ctx.createLinearGradient(0, h, 0, h - barHeight);
        gradient.addColorStop(0, 'rgb(102, 126, 234)');
        gradient.addColorStop(1, 'rgb(217, 175, 217)');
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.ellipse(
          xPos + borderRadius,
          h - barHeight / 2,
          borderRadius,
          barHeight / 2,
          0,
          0,
          Math.PI * 2
        );
        const gradient = ctx.createLinearGradient(0, h, 0, h - barHeight);
        gradient.addColorStop(0, 'rgb(102, 126, 234)');
        gradient.addColorStop(1, 'rgb(217, 175, 217)');
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    });
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return <Canvas ref={this.canvasRef} />;
  }
}

export default AnalyzerGraph;
