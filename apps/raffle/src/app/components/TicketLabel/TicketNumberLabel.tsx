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
  background: ${({ rewardBracket = LotteryPrizeLevel.NONE }) =>
    rewardBracket === LotteryPrizeLevel.GOLD
      ? 'linear-gradient(50deg, rgba(89,70,0,1) 0%, rgba(234,201,89,1) 48%, rgba(89,70,0,1) 100%)'
      : rewardBracket === LotteryPrizeLevel.SILVER
      ? 'linear-gradient(50deg, rgba(46,59,78,1) 0%, rgba(158,198,223,1) 48%, rgba(46,59,78,1) 100%)'
      : rewardBracket === LotteryPrizeLevel.BRONZE
      ? 'linear-gradient(50deg, rgba(89,63,46,1) 0%, rgba(179,109,45,1) 48%, rgba(89,63,46,1) 100%)'
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
            className="m-2"
            textAlign="center"
            fontWeight={index <= rewardBracket ? 900 : 100}
            color={
              rewardBracket < 0 || rewardBracket === LotteryPrizeLevel.NONE
                ? 'var(--surface-a)'
                : 'var(--text-color)'
            }
            style={{ width: '16px' }}
          >
            {index <= rewardBracket
              ? index === 0
                ? rewardBracket === 0
                  ? `[${num}]`
                  : `[${num}`
                : index === rewardBracket
                ? `${num}]`
                : `${num}`
              : `${num}`}
          </Text>
        );
      })}
    </Wrapper>
  );
};

export default TicketNumberLabel;
