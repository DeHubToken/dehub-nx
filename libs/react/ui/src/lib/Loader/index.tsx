import styled from 'styled-components';
import { Player } from '@lottiefiles/react-lottie-player';

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

const Loader = () => {
  return (
    <LoaderWrapper>
      <table>
        <tbody>
          <tr>
            <td className="align-middle text-center">
              <div className="pt-2 mx-auto">
                <Player
                  src="assets/dehub/dehub-loader-light-blue.json"
                  background="transparent"
                  speed={1}
                  style={{ width: '180px' }}
                  loop
                  autoplay
                />
              </div>
              <h4
                className="full-screen-loader-title text-uppercase f-20 text-monospace"
                style={{ marginTop: '-20px' }}
              >
                Loading
              </h4>
              <span className="full-screen-loader-subtitle"></span>
            </td>
          </tr>
        </tbody>
      </table>
    </LoaderWrapper>
  );
};

export default Loader;
