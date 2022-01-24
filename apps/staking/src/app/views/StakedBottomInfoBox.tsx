import moment from 'moment';
import { useEffect, useState } from 'react';
import Container from '../components/Layout/Container';
import { FIRST_LAUNCH_DATE } from '../config/constants';
import { useStakingContract } from '../hooks/useContract';
import useCurrentTime from '../hooks/useTimer';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';
import PausedCard from './components/PausedCard';

const StakedBottomInfoBox = () => {
  useCurrentTime();
  const [paused, setPaused] = useState<boolean>(false);
  const stakingContract = useStakingContract();
  const isIn2022Q1 = moment().quarter() === 1 && moment().year() === 2022;

  useEffect(() => {
    const fetchPausedData = async () => {
      const paused = await stakingContract?.paused();
      setPaused(paused);
    };

    fetchPausedData();
  }, [stakingContract]);

  const isLiveCard = () => {
    return (
      (!paused && isIn2022Q1 && moment().isAfter(moment(FIRST_LAUNCH_DATE))) ||
      (!paused && !isIn2022Q1 && moment().isAfter(moment().startOf('quarter')))
    );
  };

  const isComingSoon = () => {
    return (
      (!paused && isIn2022Q1 && moment().isBefore(moment(FIRST_LAUNCH_DATE))) ||
      (!paused && !isIn2022Q1 && moment().isAfter(moment().startOf('quarter')))
    );
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
