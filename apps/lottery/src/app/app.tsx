import styles from './app.module.scss';

export function App() {
  return (
    <div className="layout-main">
      <div className="layout-content">
        <div className="p-col-12">
          <div className="notification">
            <h6>👋  Hello! Welcome to Hit! Before start please complete your profile to know you better. <button className="p-link">Profile settings <i className="pi pi-arrow-up"></i></button></h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
