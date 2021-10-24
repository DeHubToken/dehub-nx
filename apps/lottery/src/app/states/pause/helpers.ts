import {
  getStandardLotteryContract,
  getSpecialLotteryContract,
} from '../../utils/contractHelpers';

const standardLotteryContract = getStandardLotteryContract();
const specialLotteryContract = getSpecialLotteryContract();

export const fetchStandardPaused = async (): Promise<boolean> => {
  try {
    return await standardLotteryContract.paused();
  } catch (error) {
    return true;
  }
};

export const fetchSpecialPaused = async (): Promise<boolean> => {
  try {
    return await specialLotteryContract.paused();
  } catch (error) {
    return true;
  }
};
