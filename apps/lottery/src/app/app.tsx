import Footer from './components/Footer';
import Header from './components/Header';
import Card from './components/Layout/Card';
import DeGrand from './views/DeGrand';
import DeLotto from './views/DeLotto';

export function App() {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-main">
        <div className="layout-content">
          <Card
            className="mx-auto text-center"
            style={{ width: '300px', height: '100px' }}
          >
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
