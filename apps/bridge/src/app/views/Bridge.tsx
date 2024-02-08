import { Container } from '@dehub/react/ui';
import MyBridgeBox from './MyBridgeBox';

export default function Bridge() {
  return (
    <Container>
      <h1 className="text-center">Token Bridge</h1>
      <div className="mt-10">
        <MyBridgeBox />
      </div>
    </Container>
  );
}
