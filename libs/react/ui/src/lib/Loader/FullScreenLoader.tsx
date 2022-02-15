import { PageMeta } from '../Layout';
import Loader from './';

const FullScreenLoader = ({
  baseUrl = '',
  pageTitle = '',
  title = 'Loading...',
  subtitle = '',
}: {
  baseUrl: string;
  pageTitle: string;
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div>
      <PageMeta baseUrl={baseUrl} title={pageTitle} />
      <Loader title={title} subtitle={subtitle} />
    </div>
  );
};

export default FullScreenLoader;
