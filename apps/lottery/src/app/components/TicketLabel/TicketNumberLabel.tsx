import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Text } from '../Text';

const Wrapper = styled.div`
  background-color: var(--text-color-secondary);
  border-radius: 16px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

interface TicketNumberLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number;
}

const TicketNumberLabel = ({ number, ...props }: TicketNumberLabelProps) => {
  const [parts, setParts] = useState<number[]>([]);

  useEffect(() => {
    const splits: number[] = [];
    let temp = number;
    while (temp > 0) {
      splits.push(temp % 100);
      temp = Math.floor(temp / 100);
    }
    setParts(splits);
  }, [number]);

  return (
    <Wrapper {...props}>
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
