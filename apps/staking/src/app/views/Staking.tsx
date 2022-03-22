import { Box, Container, Heading } from '@dehub/react/ui';
import { Card } from 'primereact/card';
import styled from 'styled-components';
import { usePools } from '../state/application/hooks';
import { PoolInfo } from '../state/application/types';
import { isComingPool, isLivePool, isPastPool } from '../utils/pool';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';
import PastCard from './components/PastCard';
import StakedInfoBox from './StakedInfoBox';

const StyledBox = styled(Box)`
  padding: 1rem;
`;

export default function Staking() {
  const pools = usePools();

  return (
    <Container>
      <h1>Staking</h1>

      <div className="my-8">
        <Card className="border-neon-1 overflow-hidden mt-5">
          <StyledBox>
            <Heading
              className="py-2 px-3 inline-flex mb-5"
              fontWeight={900}
              fontSize={'34px'}
            >
              Staking Info
            </Heading>
            <StakedInfoBox />
          </StyledBox>
        </Card>
      </div>
      <div className="my-8">
        {pools.map((pool: PoolInfo, poolIndex: number) => {
          if (isComingPool(pool)) {
            return <ComingSoon key={poolIndex} poolIndex={poolIndex} />;
          } else if (isLivePool(pool)) {
            return <LiveCard key={poolIndex} poolIndex={poolIndex} />;
          }
          return null;
        })}
      </div>
      <div className="my-8">
        {pools.filter((pool: PoolInfo) => isPastPool(pool)).length > 0 && (
          <h1>Past Vault</h1>
        )}
        {pools.map((pool: PoolInfo, poolIndex: number) => {
          if (isPastPool(pool)) {
            return <PastCard key={poolIndex} poolIndex={poolIndex} />;
          }
          return null;
        })}
      </div>
    </Container>
  );
}
