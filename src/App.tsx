import React from 'react';
import './App.css';
import './components/Connect.css';

import { Wallet } from './components/Web3/WalletConnect';

function App() {
  return (
    <div className="App">
          <Wallet /> {/* Most of the App build is handled in WalletConnect */}
    </div>
  );
}

export default App;
