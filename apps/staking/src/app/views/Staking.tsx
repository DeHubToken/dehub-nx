import { Container } from '@dehub/react/ui';
import MyStakingBox from './MyStakingBox';
import StakedInfoBox from './StakedInfoBox';

export default function Staking() {
  return (
    <Container>
      <h1 className="text-center">Staking</h1>

      <div className="my-8">
        <StakedInfoBox />
      </div>
      <div className="mt-4">
        <MyStakingBox />
      </div>
    </Container>
  );
}
