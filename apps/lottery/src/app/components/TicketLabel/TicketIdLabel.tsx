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

interface TicketIdLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  state: "bought" | "claimable" | "claimed";
}

const TicketIdLabel = ({
  id,
  state,
  ...props
} : TicketIdLabelProps) => {
  return (
    <Wrapper state={state} {...props}>
      <Text className="m-2" color="#000">{id}</Text>
    </Wrapper>
  );
}

export default TicketIdLabel;