import styled from 'styled-components';
import { Card as UIKitCard } from '@dehub/react/pcsuikit';

const Card = styled(UIKitCard)`
  border-radius: 6px;
  background: linear-gradient(
    128deg,
    #0b1113 0%,
    rgba(26, 50, 63, 0.8) 25%,
    rgba(50, 19, 56, 0.8) 100%
  );
`;

export default Card;
