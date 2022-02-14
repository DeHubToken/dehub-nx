import { useConnectContext } from '@dehub/react/core';
import { PageMeta } from '../Layout';
import Loader from './';

const FullScreenLoader = ({
  title = 'Loading...',
  subtitle = '',
}: {
  title?: string;
  subtitle?: string;
}) => {
  const { baseUrl, pageTitle } = useConnectContext();

  return (
    <div>
      <PageMeta baseUrl={baseUrl} title={pageTitle} />
      <Loader title={title} subtitle={subtitle} />
    </div>
  );
};

export default FullScreenLoader;
