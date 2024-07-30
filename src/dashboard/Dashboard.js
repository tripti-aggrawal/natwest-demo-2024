import './Dashboard.css';
import Header from './header/Header';
import Main from './main/Main';
import Sidebar from './sidebar/Sidebar';

function Dashboard() {
  return (
      <div className='container'>
          <div className='sidebar'>
              <Sidebar />
          </div>
          <div className='content-area'>
            <div className='header'>
                <Header />
            </div>
            <div className='main'>
                <Main />
            </div>

          </div>
      </div>

  );
}

export default Dashboard;
