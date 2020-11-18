import React, { useEffect } from 'react';
import io from 'socket.io-client';
import Login from './pages/Login';

function App() {

  useEffect(() => {

  }, [])

  const socket = io('http://localhost:3333', {
    autoConnect: false
  });

  function conectar() {
    console.log("conectando")
    if(!socket.connected) {
      socket.connect();
    }

    socket.on('hello', (msg) => console.log(msg));
    socket.on("chat message", (msg) => console.log("mensagem: ", msg))
  }

  return (
    <div className="container">
      <Login/>
    </div>
  );
}

export default App;
