import styled from 'styled-components';

export const Header = styled.div<{
  color?: string;
  fontSize?: string;
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
}>`
  color: ${({ color }) => color ?? 'inherit'};
  font-size: ${({ fontSize }) => fontSize ?? '20px'};
  font-weight: ${({ fontWeight }) => fontWeight ?? '600'};
`;

export const Title = styled.div<{
  color?: string;
  fontSize?: string;
}>`
  color: ${({ color }) => color ?? 'inherit'};
  font-size: ${({ fontSize }) => fontSize ?? '30px'};
`;

export default Header;
