// websocket.js

import ReconnectingWebSocket from 'reconnecting-websocket';

const createWebSocket = (cityName) => {
  const ws = new ReconnectingWebSocket(`ws://localhost:3001?city=${cityName}`);

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data);
    // Handle different message types if needed
    console.log('Received message:', data);
  });

  return ws;
};

export default createWebSocket;
