import styled from 'styled-components';

const Header = styled.div<{
  color?: string,
  fontSize?: string
}>`
  color: ${( { color }) => color ?? 'inherit'};
  font-size: ${( { fontSize }) => fontSize ?? '20px'};
`;

export default Header;