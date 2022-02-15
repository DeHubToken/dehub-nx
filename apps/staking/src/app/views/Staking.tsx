import { Container } from '@dehub/react/ui';
import StakedBottomInfoBox from './StakedBottomInfoBox';
import StakedTopInfoBox from './StakedTopInfoBox';

export default function Staking() {
  return (
    <>
      <Container>
        <h1>
          <span style={{ fontSize: '42px' }}>DeHub</span>
          <br />
          <span style={{ fontSize: '62px' }}>Staking</span>
        </h1>
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
