import { useEffect, useState } from 'react';
import uniqueId from 'lodash/uniqueId';
import styled from 'styled-components';
import { Text } from '../Text';

const Wrapper = styled.div<{
  state: string
}>`
  background-color: ${({ state = "bought" }) =>
    state === "bought" ?
    'rgb(234, 235, 236)' :
    state === "claimable" ?
    'var(--yellow-500)' : 'var(--text-color-secondary)'};
  border-radius: 16px;
  margin: auto;
  display: flex;
  justify-content: center;
`

interface TicketNumberLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  number: number;
  state: "bought" | "claimable" | "claimed";
}

const TicketNumberLabel = ({
  number,
  state,
  ...props
} : TicketNumberLabelProps) => {
  const [parts, setParts] = useState<number[]>([]);

  useEffect(() => {
    const splits: number[] = [];
    let temp = number;
    while (temp > 0) {
      splits.push(temp % 100);
      temp = Math.floor(temp / 100);
    }
    setParts(splits);
  }, [number])

  return (
    <Wrapper state={state} {...props}>
      {
        parts.map((num: number, index: number) => {
          return (
            <Text key={uniqueId()} className="m-2" color="#000">{num}</Text>
          )
        })
      }
    </Wrapper>
  );
}

export default TicketNumberLabel;