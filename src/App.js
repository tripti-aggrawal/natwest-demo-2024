import { useState } from 'react';
import './App.css';
import Widget from './Components/Widget';
import b2b from './assets/dashboard_dummy.PNG';
import b2c from './assets/dashboard-b2c.PNG';

function App() {
  const [appState, setAppState] = useState('b2b');
  return (
    <div className="App" style={{backgroundImage: `url(${appState === 'b2b' ? b2b : b2c})`}}>
      <Widget updateAppState={setAppState} />
    </div>
  );
}

export default App;
