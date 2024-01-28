import { PageMeta } from '../Layout';
import Loader, { LoaderProps } from './';

interface FullScreenLoaderProps extends LoaderProps {
  baseUrl: string;
}

const FullScreenLoader = ({
  baseUrl = '',
  ...loaderProps
}: FullScreenLoaderProps) => {
  return (
    <div>
      <PageMeta baseUrl={baseUrl} />
      <Loader {...loaderProps} />
    </div>
  );
};

export default FullScreenLoader;
