const NUMBER_COUNT = 4;
const LIMIT_NUMBER = 100000000;

export const toLotteryNumbers = (wrapped: number): number[] => {
  const splits: number[] = Array(NUMBER_COUNT).fill(0);
  let temp = wrapped > LIMIT_NUMBER ? wrapped - LIMIT_NUMBER : wrapped;
  let index = NUMBER_COUNT - 1;
  while (temp > 0 && index >= 0) {
    splits[index--] = (temp % 100 - 1) % 18 + 1;
    temp = Math.floor(temp / 100);
  }
  return splits.reverse();
}

export const toWrappedNumber = (numbers: number[]): number => {
  return numbers.reverse().reduce((
    previousValue: number, currentValue: number
  ) => previousValue * 100 + currentValue) + LIMIT_NUMBER;
}

const random = (minNumber: number, maxNumber: number): number => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

export const generateLotteryNumber = (): number => {
  let num = 0;
  for (let idx = 0; idx < NUMBER_COUNT; idx++) {
    num = num * 100 + random(1, 18);
  }
  return num + LIMIT_NUMBER;
}