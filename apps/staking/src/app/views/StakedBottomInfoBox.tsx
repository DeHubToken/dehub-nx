import moment from 'moment';
import Container from '../components/Layout/Container';
import { useStakingContract } from '../hooks/useContract';
import { useStakePaused } from '../hooks/usePaused';
import useCurrentTime from '../hooks/useTimer';
import { usePoolInfo } from '../state/application/hooks';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';
import PausedCard from './components/PausedCard';

const StakedBottomInfoBox = () => {
  useCurrentTime();
  const stakingContract = useStakingContract();
  const poolInfo = usePoolInfo();
  const paused = useStakePaused();
  
  const openTimeStamp = poolInfo ? Number(poolInfo.openTimeStamp) * 1000 : 0;
  const closeTimeStamp = poolInfo ? Number(poolInfo.closeTimeStamp) * 1000 : 0;

  const isLiveCard = () => {
    return (
      !paused &&
      moment().isAfter(moment(new Date(openTimeStamp))) &&
      moment().isBefore(moment(new Date(closeTimeStamp)))
    );
  };

  const isComingSoon = () => {
    return !paused && moment().isBefore(moment(new Date(openTimeStamp)));
  };

  return (
    <Container>
      {paused && <PausedCard />}
      {isComingSoon() && <ComingSoon />}
      {isLiveCard() && <LiveCard />}
    </Container>
  );
};

export default StakedBottomInfoBox;
