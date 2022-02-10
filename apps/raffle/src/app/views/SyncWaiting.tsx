import { Container, Heading, Text } from '@dehub/react/ui';
import { Card } from 'primereact/card';
import { LoadingStatus } from '../config/constants/types';

const SyncWaiting = ({ loadingStatus }: { loadingStatus: LoadingStatus }) => {
  return (
    <Container>
      <Card className="h-30rem pt-8 border-neon-1">
        {loadingStatus === LoadingStatus.LOADING ? (
          <>
            <div className="fa-3x pb-5 text-center">
              <i className="fad fa-circle-notch fa-spin"></i>
            </div>
            <Heading className="text-center">Loading</Heading>
          </>
        ) : loadingStatus === LoadingStatus.SYNCHRONIZING ? (
          <>
            <div className="fa-3x pb-5 text-center">
              <i className="fad fa-circle-notch fa-spin"></i>
            </div>
            <Heading className="text-center">
              Syncing with $DeHub Contract
            </Heading>
            <Text className="text-center">Please give it a second.</Text>
          </>
        ) : loadingStatus === LoadingStatus.PAUSED ? (
          <Heading className="text-center">
            Raffle is paused for a while. Please wait...
          </Heading>
        ) : (
          <Heading className="text-center">Welcome to DeHub Raffle!</Heading>
        )}
      </Card>
    </Container>
  );
};

export default SyncWaiting;
