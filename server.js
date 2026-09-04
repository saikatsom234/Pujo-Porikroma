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
let groups = [];

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
  }
}, 60000);

let idleTimeout = null;

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
    socket.emit('initGroups', groups);
  });
  
  // Handle creating a new group
  socket.on('createGroup', (groupName) => {
    if (!groupName || typeof groupName !== 'string') return;
    
    // Enforce max 3 groups per user
    const userGroupCount = groups.filter(g => g.creatorId === myUserId).length;
    if (userGroupCount >= 3) {
      socket.emit('chatError', 'You can only create up to 3 groups at a time.');
      return;
    }

    const shortCode = Math.random().toString(36).substr(2, 6).toUpperCase();
    const newGroup = {
      id: shortCode,
      name: groupName.trim(),
      creatorId: myUserId,
      creatorName: myUsername,
      creatorAvatar: myAvatar,
      members: [myUserId],
      membersCount: 1, // Start with 1 (the creator)
      timestamp: new Date().toISOString()
    };
    groups.push(newGroup);
    io.emit('newGroup', newGroup);
  });
  
  // Handle joining a group via code
  socket.on('joinGroup', (code) => {
    if (!code || typeof code !== 'string') return;
    
    // Check if group exists
    const group = groups.find(g => g.id === code.toUpperCase());
    if (!group) {
      socket.emit('chatError', 'Group not found with this code.');
      return;
    }

    // Check if already a member
    if (group.members.includes(myUserId)) {
      socket.emit('chatError', 'You are already in this group.');
      return;
    }

    // Check max joined groups limit
    const joinedGroupsCount = groups.filter(g => g.creatorId !== myUserId && g.members.includes(myUserId)).length;
    if (joinedGroupsCount >= 3) {
      socket.emit('chatError', 'You can only join up to 3 groups created by others.');
      return;
    }

    // Check max members per group (the UI says "holds up to 3 members")
    if (group.members.length >= 3) {
      socket.emit('chatError', 'This group is already full (max 3 members).');
      return;
    }

    // Join the group
    group.members.push(myUserId);
    group.membersCount = group.members.length;
    
    io.emit('groupUpdated', group);
  });

  // Handle deleting a group
  socket.on('deleteGroup', (groupId) => {
    const groupIndex = groups.findIndex(g => g.id === groupId);
    if (groupIndex === -1) return;
    if (groups[groupIndex].creatorId !== myUserId) return; // Only creator can delete
    
    groups.splice(groupIndex, 1);
    io.emit('groupDeleted', groupId);
  });

  // Handle leaving a group
  socket.on('leaveGroup', (groupId) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    const memberIndex = group.members.indexOf(myUserId);
    if (memberIndex === -1) return;
    
    group.members.splice(memberIndex, 1);
    group.membersCount = group.members.length;
    io.emit('groupUpdated', group);
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
    io.emit('newMessage', newMessage);
    
    // Set exactly 5-minute relative timeout for inactivity
    if (idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
      const reminder = {
        id: Date.now() + Math.random().toString(36).substr(2, 9),
        isSystemMessage: true,
        isTimeReminder: true,
        text: "৫ মিনিট আগে",
        timestamp: new Date().toISOString()
      };
      messages.push(reminder);
      io.emit('newMessage', reminder);
    }, 5 * 60 * 1000);
  });

  socket.on('disconnect', () => {
    onlineUsers--;
    console.log(`${myUsername} disconnected. Total online: ${onlineUsers}`);
    io.emit('onlineUsersUpdate', onlineUsers);
  });
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, '0.0.0.0', () => {
  console.log(`Socket.IO backend server running on http://0.0.0.0:${PORT}`);
});
