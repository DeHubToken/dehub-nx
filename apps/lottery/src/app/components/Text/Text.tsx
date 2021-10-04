import styled from 'styled-components';

const Text = styled.div<{
  color?: string;
  textAlign?: string;
  fontSize?: string
}>`
  color: ${({ color = 'inherit' }) => color};
  font-size: ${({ fontSize = '14px' }) => fontSize};
  text-align: ${({ textAlign = 'left' }) => textAlign};
  line-height: 1.5;
`;

export default Text;