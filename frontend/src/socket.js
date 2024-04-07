import io from 'socket.io-client';

// establish a connection to socket.io server from a client side application

const socket = io('http://localhost:5000');

// client will attempt to connect to socket.io server running on the local machine at port 5000
export default socket;
