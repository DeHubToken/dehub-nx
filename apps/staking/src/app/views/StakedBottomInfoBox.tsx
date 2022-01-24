import moment from 'moment';
import { useEffect, useState } from 'react';
import Container from '../components/Layout/Container';
import { useStakingContract } from '../hooks/useContract';
import useCurrentTime from '../hooks/useTimer';
import { usePoolInfo } from '../state/application/hooks';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';
import PausedCard from './components/PausedCard';

const StakedBottomInfoBox = () => {
  useCurrentTime();
  const [paused, setPaused] = useState<boolean>(false);
  const stakingContract = useStakingContract();
  const poolInfo = usePoolInfo();
  const openTimeStamp = poolInfo ? Number(poolInfo.openTimeStamp) * 1000 : 0;
  const closeTimeStamp = poolInfo ? Number(poolInfo.closeTimeStamp) * 1000 : 0;

  useEffect(() => {
    const fetchPausedData = async () => {
      const paused = await stakingContract?.paused();
      setPaused(paused);
    };

    fetchPausedData();
  }, [stakingContract]);

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
