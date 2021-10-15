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
      ? 'rgb(234, 235, 236)'
      : rewardBracket === LotteryPrizeLevel.SILVER
      ? 'var(--yellow-500)'
      : rewardBracket === LotteryPrizeLevel.BRONZE
      ? 'var(--text-color-secondary)'
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
  rewardBracket,
  ...props
}: TicketNumberLabelProps) => {
  const parts = toLotteryNumbers(number);

  return (
    <Wrapper rewardBracket={rewardBracket} {...props}>
      {parts.map((num: number, index: number) => {
        return (
          <Text key={`${index}`} className="m-2" color="#000">
            {num}
          </Text>
        );
      })}
    </Wrapper>
  );
};

export default TicketNumberLabel;
