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
let lastHourReported = new Date().getHours();

function getBengaliHourString(date) {
  const hours = date.getHours();
  let timePrefix = '';
  if (hours >= 5 && hours < 12) {
    timePrefix = 'সকাল';
  } else if (hours >= 12 && hours < 16) {
    timePrefix = 'দুপুর';
  } else if (hours >= 16 && hours < 18) {
    timePrefix = 'বিকেল';
  } else if (hours >= 18 && hours < 21) {
    timePrefix = 'সন্ধ্যা';
  } else if (hours >= 21 && hours < 24) {
    timePrefix = 'রাত';
  } else if (hours >= 0 && hours < 3) {
    timePrefix = 'মধ্যরাত';
  } else if (hours >= 3 && hours < 5) {
    timePrefix = 'ভোর';
  }
  
  let displayHours = hours % 12;
  displayHours = displayHours ? displayHours : 12;
  
  const bengaliNumbers = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
  };
  
  const strHours = String(displayHours).split('').map(d => bengaliNumbers[d]).join('');
  return `${strHours}:০০ ${timePrefix}`;
}



// Add the initial hourly reminder immediately upon server startup
messages.push({
  id: Date.now() + Math.random().toString(36).substr(2, 9),
  isSystemMessage: true,
  text: getBengaliHourString(new Date()),
  timestamp: new Date().toISOString()
});

// Check every minute if the 3-hour block or hour has changed
setInterval(() => {
  const now = new Date();
  
  // 1. Check for 3-hour boundary (clear chat)
  const newBlock = getCurrentTimeBlock();
  if (newBlock !== currentBlock) {
    currentBlock = newBlock;
    messages = []; // Clear chat history
    
    // Instantly add the current hour's reminder to the clean chat
    const initialTimeMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      isSystemMessage: true,
      text: getBengaliHourString(now),
      timestamp: now.toISOString()
    };
    messages.push(initialTimeMessage);
    
    io.emit('chatCleared'); // Notify all clients
    console.log(`[System] 3-hour boundary crossed. Cleared chat history.`);
  }

  // 2. Check for hour boundary (add time reminder)
  if (now.getHours() !== lastHourReported) {
    lastHourReported = now.getHours();
    
    const timeMessage = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      isSystemMessage: true,
      text: getBengaliHourString(now),
      timestamp: now.toISOString()
    };
    
    messages.push(timeMessage);
    io.emit('newMessage', timeMessage);
    console.log(`[System] Hourly reminder sent: ${timeMessage.text}`);
  }
}, 60000);

let messagesSinceLast5Min = false;

// 5-minute interval for time reminder
setInterval(() => {
  if (messagesSinceLast5Min) {
    const reminder = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      isSystemMessage: true,
      isTimeReminder: true,
      text: "৫ মিনিট আগে",
      timestamp: new Date().toISOString()
    };
    messages.push(reminder);
    io.emit('newMessage', reminder);
    messagesSinceLast5Min = false; // reset for next 5 mins
  }
}, 5 * 60 * 1000);

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

    messagesSinceLast5Min = true;
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
