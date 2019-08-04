import React from 'react';
import styled from 'styled-components';
import {
  AudioContext,
  IAnalyserNode,
  IAudioContext
} from 'standardized-audio-context';

interface GraphProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  startAnimating?: boolean;
}

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

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

class AnalyzerGraph extends React.PureComponent<GraphProps> {
  canvasRef = React.createRef<HTMLCanvasElement>();
  audio: null | HTMLAudioElement = null;
  loopKey: number | null = null;
  analyzer: IAnalyserNode<IAudioContext> | null = null;
  fbcArray: Uint8Array = new Uint8Array();
  bufferLength = 0;

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

  draw2() {
    const canvas = this.canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const bufferLength = this.bufferLength;
    const fbcArray = this.fbcArray;
    // update size
    const w = (canvas.width = canvas.clientWidth);
    const h = (canvas.height = canvas.clientHeight);
    // clear background
    ctx.clearRect(0, 0, w, h);

    // ctx.fillStyle = '#00CCFF'; // Color of the bars
    // const barWidth = 6;
    // for (let i = 0; i < bufferLength; i++) {
    //   const x = 3 + (barWidth + 2) * i;
    //   const barHeight = fbcArray[i] / 6;
    //   ctx.fillRect(x, h - barHeight, barWidth, barHeight);
    // }

    const barWidth = 6;
    const borderRadius = barWidth / 2;
    for (let i = 0; i < bufferLength; i++) {
      const xPos = 0 + (barWidth + 2) * i;
      const barHeight = fbcArray[i] / 6;
      // const barHeight = Math.pow(fbcArray[i], 2) / 1250;
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
    }
  }

  loop = () => {
    this.loopKey = requestAnimationFrame(this.loop);
    const analyer = this.analyzer;
    const fbcArray = this.fbcArray;
    if (analyer) {
      analyer.getByteFrequencyData(fbcArray);
      this.draw2();
    }
  };

  computeFftSize(): number {
    const canvas = this.canvasRef.current;
    if (!canvas) return 128;

    const proxyBufferLength = Math.ceil(((canvas.clientWidth * 3) / 2 + 2) / 8);
    const pow2 = Math.ceil(Math.log(proxyBufferLength) / Math.log(2));
    return Math.pow(2, pow2 + 1);
  }

  updateFftSize = () => {
    const analyzer = this.analyzer;
    if (analyzer) {
      analyzer.fftSize = this.computeFftSize();
      const bufferLength = analyzer.frequencyBinCount;
      const fbcArray = new Uint8Array(bufferLength);
      console.log({ bufferLength });

      // save global variable
      this.analyzer = analyzer;
      this.fbcArray = fbcArray;
      this.bufferLength = bufferLength;
    }
  };

  componentDidMount() {
    window.addEventListener('resize', this.updateFftSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateFftSize);
  }

  componentDidUpdate(prevPops: GraphProps) {
    if (
      prevPops.startAnimating !== this.props.startAnimating &&
      this.props.startAnimating
    ) {
      const audio = this.props.audioRef.current;
      const canvas = this.canvasRef.current;
      if (!audio || !canvas) return;

      const audioContext = new AudioContext();
      const analyzer = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);
      source.connect(analyzer);
      analyzer.connect(audioContext.destination);

      analyzer.fftSize = this.computeFftSize();
      const bufferLength = analyzer.frequencyBinCount;
      const fbcArray = new Uint8Array(bufferLength);
      console.log({ bufferLength });

      // save global variable
      this.analyzer = analyzer;
      this.fbcArray = fbcArray;
      this.bufferLength = bufferLength;

      // start loop
      this.loop();
    }
  }

  render() {
    return <Canvas ref={this.canvasRef} />;
  }
}

export default AnalyzerGraph;
