import FlexLine from './components/FlexLine';
import DeGrand from './DeGrand';
import DeLotto from './DeLotto';

export default function Lottery({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <FlexLine className="md:flex-column align-items-center justify-content-between">
        <img
          src={`${baseUrl}/assets/img/prize-draw-logo.png`}
          className="anim-float-1"
          alt="Prize Draw Logo"
          style={{ maxWidth: '300px' }}
        />
      </FlexLine>
      <div className="my-8">
        <DeLotto />
      </div>
      <div className="my-8">
        <DeGrand />
      </div>
    </>
  );
}
