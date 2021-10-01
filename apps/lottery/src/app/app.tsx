import styles from './app.module.scss';

import Header from './components/Header';
import Footer from './components/Footer';
import Card from './components/Layout/Card';
import Container from './components/Layout/Container';
import DeLotto from './views/DeLotto';
import DeGrand from './views/DeGrand';

export function App() {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-main">
        <div className="layout-content">
            <Card className="mx-auto text-center" style={{ width: '300px', height: '100px' }}>
              <h1>Lottery LOGO</h1>
            </Card>
          <div className="my-8">
            <DeLotto />
          </div>
          <div className="my-8">
            <DeGrand />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
