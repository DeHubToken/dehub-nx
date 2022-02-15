import DehubLoaderJson from '@dehub/shared/asset/dehub/dehub-loader-light-blue.json';
import { Player } from '@lottiefiles/react-lottie-player';

const Loader = ({
  title = 'Loading...',
  subtitle = '',
}: {
  title?: string;
  subtitle?: string;
}) => {
  return (
    <div className="dhb-loader">
      <table>
        <tbody>
          <tr>
            <td>
              <div className="pt-2 mx-auto" style={{ height: 'fit-content' }}>
                <Player
                  src={DehubLoaderJson}
                  background="transparent"
                  speed={1}
                  style={{ width: '180px' }}
                  loop
                  autoplay
                />
              </div>
              <h4 className="dhb-loader-title">{title}</h4>
              <div className="dhb-loader-subtitle">{subtitle}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Loader;
