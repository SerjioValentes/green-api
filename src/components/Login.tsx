import React, { useState } from 'react';

const Login = ({ onLogin }: any) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onLogin(idInstance, apiTokenInstance);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;