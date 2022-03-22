import { Container } from '@dehub/react/ui';
import { usePools } from '../state/application/hooks';
import { PoolInfo } from '../state/application/types';
import { isComingPool, isLivePool } from '../utils/pool';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';
import PastCard from './components/PastCard';

const StakedBottomInfoBox = () => {
  const pools = usePools();

  return (
    <Container>
      {pools.map((pool: PoolInfo, poolIndex: number) => {
        if (isComingPool(pool)) {
          return <ComingSoon key={poolIndex} poolIndex={poolIndex} />;
        } else if (isLivePool(pool)) {
          return <LiveCard key={poolIndex} poolIndex={poolIndex} />;
        } else {
          return <PastCard key={poolIndex} poolIndex={poolIndex} />;
        }
      })}
    </Container>
  );
};

export default StakedBottomInfoBox;
