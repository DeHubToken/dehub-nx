import styled from 'styled-components';
import { Box } from '../Layout';
import { Text } from '../Text';

export const UnitContainer = styled(Text)`
  margin-left: 4px;
  text-align: right;
  color: '#bfc2c6';
  white-space: nowrap;
`

export const StyledBalanceInput = styled(Box)<{
  backgroundColor?: string;
  borderColor?: string;
}>`
  background-color: ${({ backgroundColor }) => backgroundColor ?? '#3E4754'};
  border: 1px solid ${({ borderColor }) => borderColor ?? '#545B67'};
  border-radius: 6px;
  padding: 8px 16px;
`;

export const StyledInput = styled.input<{
  color?: string;
  fontSize?: string;
  textAlign?: string
}>`
  background: transparent;
  border-radius: 0;
  box-shadow: none;
  width: 100%;
  padding: 0;
  outline: 0;
  color: ${({ color = '#EAEBEC' }) => color};
  font-size: ${({ fontSize = "14px" }) => fontSize};
  text-align: ${({ textAlign = "right" }) => textAlign};
  border: none;

  ::placeholder {
    color: '#bfc2c6';
  }
  &:focus:not(:disabled) {
    box-shadow: none;
  }
`;