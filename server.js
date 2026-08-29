import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Allow all origins for local network mobile testing
    methods: ["GET", "POST"]
  }
});

let onlineUsers = 0;

io.on('connection', (socket) => {
  onlineUsers++;
  console.log(`User connected. Total online: ${onlineUsers}`);
  
  // Broadcast the new count to all connected clients
  io.emit('onlineUsersUpdate', onlineUsers);

  socket.on('disconnect', () => {
    onlineUsers--;
    console.log(`User disconnected. Total online: ${onlineUsers}`);
    // Broadcast the updated count
    io.emit('onlineUsersUpdate', onlineUsers);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO backend server running on http://localhost:${PORT}`);
});
