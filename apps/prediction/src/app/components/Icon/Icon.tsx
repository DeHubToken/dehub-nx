import styled from 'styled-components';

const Icon = styled.i<{
  color?: string;
  size?: string;
}>`
  color: ${({ color = 'inherit' }) => color};
  font-size: ${({ size = '14px' }) => size};
`;

export default Icon;
