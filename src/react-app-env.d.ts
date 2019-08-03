/// <reference types="react-scripts" />

declare module 'console' {
  export = typeof import('console');
}

declare module '*.mp3' {
  const src: string;
  export default src;
}
