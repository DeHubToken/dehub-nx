import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';
import DehubLoaderJson from '@dehub/shared/assets/dehub/dehub-loader-light-blue.json';

/**
 * @todo linear-gradient must be defined as $variable
 */
const LoaderWrapper = styled.div`
  background: linear-gradient(
    45deg,
    #0b1113,
    #051118 46%,
    #060c1d 71%,
    #321338
  );
  position: fixed;
  padding: 0;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99999;
  table {
    width: 100%;
    height: 100%;
  }
`;

const HeaderWrapper = styled.h4`
  text-transfer: uppercase !important;
  font-size: 20px;
  margin-top: -20px;
`;

const TextWrapper = styled.div`
  font-size: 16px;
`;

const Loader = ({
  header = 'LOADING',
  text,
}: {
  header?: string;
  text?: string;
}) => {
  return (
    <LoaderWrapper>
      <table>
        <tbody>
          <tr>
            <td className="align-middle text-center">
              <div className="pt-2 mx-auto">
                <Player
                  src={DehubLoaderJson}
                  background="transparent"
                  speed={1}
                  style={{ width: '180px' }}
                  loop
                  autoplay
                />
              </div>
              <HeaderWrapper className="full-screen-loader-title">
                {header}
              </HeaderWrapper>
              <TextWrapper className="full-screen-loader-subtitle">
                {text ?? ''}
              </TextWrapper>
            </td>
          </tr>
        </tbody>
      </table>
    </LoaderWrapper>
  );
};

export default Loader;
