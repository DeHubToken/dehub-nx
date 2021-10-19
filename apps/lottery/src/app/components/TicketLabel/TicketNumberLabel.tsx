import styled from 'styled-components';

import { Text } from '../Text';
import { toLotteryNumbers } from '../../utils/numbers';

import { LotteryPrizeLevel } from '../../config/constants/types';

/**
 * @todo set color with freya variables
 */
const Wrapper = styled.div<{
  rewardBracket?: number;
}>`
  background-color: ${({ rewardBracket = LotteryPrizeLevel.NONE }) =>
    rewardBracket === LotteryPrizeLevel.GOLD
      ? 'var(--pink-800)'
      : rewardBracket === LotteryPrizeLevel.SILVER
      ? 'var(--teal-800)'
      : rewardBracket === LotteryPrizeLevel.BRONZE
      ? 'var(--yellow-800)'
      : 'var(--text-color-secondary)'};
  border-radius: 16px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

interface TicketNumberLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number;
  rewardBracket?: number;
}

const TicketNumberLabel = ({
  number,
  rewardBracket = -1,
  ...props
}: TicketNumberLabelProps) => {
  const parts = toLotteryNumbers(number);

  return (
    <Wrapper rewardBracket={rewardBracket} {...props}>
      {parts.map((num: number, index: number) => {
        return (
          <Text
            key={`${index}`}
            className={`m-2 text-center ${
              index <= rewardBracket ? 'font-bold' : ''
            }`}
            color={
              rewardBracket < 0 || rewardBracket === LotteryPrizeLevel.NONE
                ? 'var(--surface-a)'
                : 'var(--text-color)'
            }
            style={{ width: '16px' }}
          >
            {num}
          </Text>
        );
      })}
    </Wrapper>
  );
};

export default TicketNumberLabel;
