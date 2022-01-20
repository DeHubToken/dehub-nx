import moment from 'moment';
import Container from '../components/Layout/Container';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';
import useCurrentTime from '../hooks/useTimer';
import { FIRST_LAUNCH_DATE } from '../config/constants';

const StakedBottomInfoBox = () => {
  useCurrentTime();
  const isIn2022Q1 = moment().quarter() === 1 && moment().year() === 2022;

  return (
    <Container>
      {((isIn2022Q1 && moment().isBefore(moment(FIRST_LAUNCH_DATE))) ||
        (!isIn2022Q1 && moment().isAfter(moment().startOf('quarter')))) && (
        <ComingSoon />
      )}
      {((isIn2022Q1 && moment().isAfter(moment(FIRST_LAUNCH_DATE))) ||
        (!isIn2022Q1 && moment().isAfter(moment().startOf('quarter')))) && (
        <LiveCard />
      )}
    </Container>
  );
};

export default StakedBottomInfoBox;
