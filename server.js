import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

let onlineUsers = 0;
let userCounter = 0;
let messages = [];

// Helper to calculate the current 3-hour block index
function getCurrentTimeBlock() {
  const currentHour = new Date().getHours();
  // 3-hour blocks: 00:00, 03:00, 06:00, 09:00, 12:00, 15:00, 18:00, 21:00
  return Math.floor(currentHour / 3);
}

let currentBlock = getCurrentTimeBlock();

// Check every minute if the 3-hour block has changed
setInterval(() => {
  const newBlock = getCurrentTimeBlock();
  if (newBlock !== currentBlock) {
    currentBlock = newBlock;
    messages = []; // Clear chat history
    io.emit('chatCleared'); // Notify all clients
    console.log(`[System] 3-hour boundary crossed. Cleared chat history.`);
  }
}, 60000);

io.on('connection', (socket) => {
  onlineUsers++;
  userCounter++;
  
  // Assign a sequential ID and avatar (1 to 7)
  const myUserId = userCounter;
  const myAvatar = `/user logo${((myUserId - 1) % 7) + 1}.png`;
  const myUsername = `User ${myUserId}`;
  
  console.log(`User connected: ${myUsername}. Total online: ${onlineUsers}`);
  
  // Send the initial state to the newly connected user
  socket.emit('initChat', {
    myUserId,
    myUsername,
    myAvatar,
    messages
  });

  // Handle explicit requests for initChat (e.g., when ChatPopup mounts after connection)
  socket.on('requestInitChat', () => {
    socket.emit('initChat', {
      myUserId,
      myUsername,
      myAvatar,
      messages
    });
  });
  
  // Broadcast the new online count
  io.emit('onlineUsersUpdate', onlineUsers);

  // Handle incoming messages
  socket.on('sendMessage', (text) => {
    if (!text || typeof text !== 'string') return;
    
    // Validate 50 words limit
    const words = text.trim().split(/\s+/);
    if (words.length > 50) {
      socket.emit('chatError', 'Message exceeds 50 words.');
      return;
    }

    const newMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      userId: myUserId,
      username: myUsername,
      avatar: myAvatar,
      text: text.trim(),
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);
    
    // Broadcast message to everyone
    io.emit('newMessage', newMessage);
  });

  socket.on('disconnect', () => {
    onlineUsers--;
    console.log(`${myUsername} disconnected. Total online: ${onlineUsers}`);
    io.emit('onlineUsersUpdate', onlineUsers);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Socket.IO backend server running on http://localhost:${PORT}`);
});
