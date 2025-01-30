import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleLogin = (id: any, token: any) => {
    setIdInstance(id);
    setApiTokenInstance(token);
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
      )}
    </div>
  );
};

export default App;