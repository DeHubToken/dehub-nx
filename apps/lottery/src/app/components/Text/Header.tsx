import styled from 'styled-components';

export const Header = styled.div<{
  color?: string;
  fontSize?: string;
}>`
  color: ${({ color }) => color ?? 'inherit'};
  font-size: ${({ fontSize }) => fontSize ?? '20px'};
`;

export const Title = styled.div<{
  color?: string;
  fontSize?: string;
}>`
  color: ${({ color }) => color ?? 'inherit'};
  font-size: ${({ fontSize }) => fontSize ?? '30px'};
`;

export default Header;
