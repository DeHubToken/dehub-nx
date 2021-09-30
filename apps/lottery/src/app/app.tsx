import styles from './app.module.scss';

import Header from './components/Header';
import Footer from './components/Footer';

export function App() {
  return (
    <div className="layout-wrapper">
      <Header />
      <div className="layout-main">
        <div className="layout-content">
          
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
