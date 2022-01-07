import { Skeleton } from 'primereact/skeleton';
import { Header } from '../components/Text';

const StakedInfoBox = () => {
  return (
    <>
      <div className="grid">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Total Staked</Header>

              <Skeleton width="100%" height="1.5rem" className="mt-4" />
              <Skeleton width="100%" height="1rem" className="mt-2" />
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Rewards Q1 2022</Header>

              <Skeleton width="100%" height="1.5rem" className="mt-4" />
              <Skeleton width="100%" height="1rem" className="mt-2" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid mt-1 mb-4">
        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full flex flex-column align-items-start">
              <Header className="pb-2">TVL</Header>

              <Skeleton width="100%" height="1.5rem" className="mt-4" />
              <Skeleton width="100%" height="1rem" className="mt-2" />
            </div>
          </div>
        </div>

        <div className="col-12 md:col-6 lg:col-6">
          <div className="card overview-box gray shadow-2">
            <div className="overview-info text-left w-full">
              <Header className="pb-2">Total Rewards</Header>

              <Skeleton width="100%" height="1.5rem" className="mt-4" />
              <Skeleton width="100%" height="1rem" className="mt-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StakedInfoBox;
