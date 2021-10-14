export const toLotteryNumbers = (wrapped: number): number[] => {
  const splits: number[] = [0, 0, 0, 0];
  let temp = wrapped;
  let index = 3;
  while (temp > 0 && index >= 0) {
    splits[index--] = temp % 18 + 1;
    temp = Math.floor(temp / 100);
  }
  return splits;
}