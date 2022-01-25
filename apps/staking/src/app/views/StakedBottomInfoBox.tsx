import moment from 'moment';
import Container from '../components/Layout/Container';
import { useStakingContract } from '../hooks/useContract';
import useCurrentTime from '../hooks/useTimer';
import { usePoolInfo } from '../state/application/hooks';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';

const StakedBottomInfoBox = () => {
  useCurrentTime();
  const stakingContract = useStakingContract();
  const poolInfo = usePoolInfo();

  const openTimeStamp = poolInfo ? Number(poolInfo.openTimeStamp) * 1000 : 0;
  const closeTimeStamp = poolInfo ? Number(poolInfo.closeTimeStamp) * 1000 : 0;

  const isLiveCard = () => {
    return (
      moment().isAfter(moment(new Date(openTimeStamp))) &&
      moment().isBefore(moment(new Date(closeTimeStamp)))
    );
  };

  const isComingSoon = () => {
    return moment().isBefore(moment(new Date(openTimeStamp)));
  };

  return (
    <Container>
      {isComingSoon() && <ComingSoon />}
      {isLiveCard() && <LiveCard />}
    </Container>
  );
};

export default StakedBottomInfoBox;
