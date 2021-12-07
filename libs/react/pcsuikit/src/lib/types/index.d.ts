declare module '*.svg' {
  const content: string;
  export default content;
}

export interface IENavigator extends Navigator {
  /** IE support */
  msMaxTouchPoints: number;
}
