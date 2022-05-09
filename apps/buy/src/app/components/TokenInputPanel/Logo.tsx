import styled from 'styled-components';

type LogoProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Logo = ({ src, alt, ...props }: LogoProps) => {
  return <img src={src} alt={alt} {...props} />;
};

export const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
`;
