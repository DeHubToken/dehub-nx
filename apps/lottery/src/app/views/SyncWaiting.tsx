import { Card } from 'primereact/card';

import Container from '../components/Layout/Container';
import { Header, Text } from '../components/Text';
import { LoadingStatus } from '../config/constants/types';

const SyncWaiting = ({ loadingStatus }: { loadingStatus: LoadingStatus }) => {
  return (
    <Container>
      <Card className="h-30rem pt-8">
        {loadingStatus === LoadingStatus.LOADING ? (
          <>
            <div className="fa-3x pb-5 text-center">
              <i className="fad fa-circle-notch fa-spin"></i>
            </div>
            <Header className="text-center">Loading</Header>
          </>
        ) : loadingStatus === LoadingStatus.SYNCHRONIZING ? (
          <>
            <div className="fa-3x pb-5 text-center">
              <i className="fad fa-circle-notch fa-spin"></i>
            </div>
            <Header className="text-center">
              Syncing with $DeHub Contract
            </Header>
            <Text className="text-center">Please give it a second.</Text>
          </>
        ) : loadingStatus === LoadingStatus.PAUSED ? (
          <Header className="text-center">
            Raffle is paused for a while. Please wait...
          </Header>
        ) : (
          <Header className="text-center">Welcome to DeHub Raffle!</Header>
        )}
      </Card>
    </Container>
  );
};

export default SyncWaiting;
