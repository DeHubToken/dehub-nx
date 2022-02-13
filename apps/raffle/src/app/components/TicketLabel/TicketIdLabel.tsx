import styled from 'styled-components';

import { Text } from '../Text';

/**
 * @todo set color with freya variables
 */
const Wrapper = styled.div`
  background-color: var(--text-color-secondary);
  border-radius: 8px;
  margin: auto;
  display: flex;
  justify-content: center;
`;

interface TicketIdLabelProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

const TicketIdLabel = ({ id, ...props }: TicketIdLabelProps) => {
  return (
    <Wrapper {...props}>
      <Text className="m-2" color="#000">
        {id}
      </Text>
    </Wrapper>
  );
};

export default TicketIdLabel;
