export interface LoaderProps {
  title?: string;
  subtitle?: string;
  loaderGif?: string;
}

const Loader = ({
  title = 'Loading...',
  subtitle = '',
  loaderGif = '',
}: LoaderProps) => {
  return (
    <div className="dhb-loader">
      <table>
        <tbody>
          <tr>
            <td>
              <img src={loaderGif} width="180px" alt="DeHub Loader" />
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
