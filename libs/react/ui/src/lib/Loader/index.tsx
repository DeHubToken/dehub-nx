import DehubLoaderJson from '@dehub/shared/asset/dehub/dehub-loader-light-blue.json';
import Lottie from 'react-lottie-player';

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
              <div
                className="pt-2 flex justify-content-center"
                style={{ height: 'fit-content' }}
              >
                <Lottie
                  loop
                  animationData={DehubLoaderJson}
                  play
                  speed={1}
                  style={{ width: '180px' }}
                ></Lottie>
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
