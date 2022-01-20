import styled from 'styled-components';

const Text = styled.div<{
  color?: string;
  textAlign?: string;
  fontSize?: string;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}>`
  color: ${({ color = 'inherit' }) => color};
  font-size: ${({ fontSize = '14px' }) => fontSize};
  font-weight: ${({ fontWeight }) => fontWeight ?? '100'};
  text-align: ${({ textAlign = 'left' }) => textAlign};
  line-height: 1.5;
`;

export default Text;
