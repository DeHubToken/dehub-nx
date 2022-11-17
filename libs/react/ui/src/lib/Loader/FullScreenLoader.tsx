import { PageMeta } from '../Layout';
import Loader, { LoaderProps } from './';

interface FullScreenLoaderProps extends LoaderProps {
  baseUrl: string;
  pageTitle: string;
}

const FullScreenLoader = ({
  baseUrl = '',
  pageTitle = '',
  ...loaderProps
}: FullScreenLoaderProps) => {
  return (
    <div>
      <PageMeta baseUrl={baseUrl} title={pageTitle} />
      <Loader {...loaderProps} />
    </div>
  );
};

export default FullScreenLoader;
