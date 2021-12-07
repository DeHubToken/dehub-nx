declare module '*.svg' {
  const content: string;
  export default content;
}

interface Navigator extends Navigator {
  /** IE support */
  msMaxTouchPoints: number;
}
