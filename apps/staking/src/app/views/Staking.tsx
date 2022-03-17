import { Container } from '@dehub/react/ui';
import StakedBottomInfoBox from './StakedBottomInfoBox';
import StakedTopInfoBox from './StakedTopInfoBox';

export default function Staking() {
  return (
    <>
      <Container>
        <h1>Staking</h1>
      </Container>
      <div className="my-8">
        <StakedTopInfoBox />
      </div>
      <div className="my-8">
        <StakedBottomInfoBox />
      </div>
    </>
  );
}
