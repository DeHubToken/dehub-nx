import Container from '../components/Layout/Container';
import ComingSoon from './components/ComingSoon';
import LiveCard from './components/LiveCard';
import OpenCard from './components/OpenCard';

const StakedBottomInfoBox = () => {
  return (
    <Container>
      <ComingSoon />
      <OpenCard />
      <LiveCard />
    </Container>
  );
};

export default StakedBottomInfoBox;
