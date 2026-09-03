import React, { useState, useEffect, useRef } from 'react';
import { X, Send, ThumbsUp, Mail, Plus } from 'lucide-react';
import './ChatPopup.css';

const ChatPopup = ({ onClose, socket }) => {
  const [activeTab, setActiveTab] = useState('adda');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [myUserId, setMyUserId] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, activeTab]);

  useEffect(() => {
    if (!socket) return;

    const handleInitChat = (data) => {
      setMyUserId(data.myUserId);
      setMessages(data.messages);
    };

    const handleNewMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const handleChatCleared = () => {
      setMessages([]);
    };

    const handleChatError = (err) => {
      alert(err);
    };

    socket.on('initChat', handleInitChat);
    socket.on('newMessage', handleNewMessage);
    socket.on('chatCleared', handleChatCleared);
    socket.on('chatError', handleChatError);

    // Request initial chat state since we might have missed the initial connection event
    socket.emit('requestInitChat');

    return () => {
      socket.off('initChat', handleInitChat);
      socket.off('newMessage', handleNewMessage);
      socket.off('chatCleared', handleChatCleared);
      socket.off('chatError', handleChatError);
    };
  }, [socket]);

  const sendMessage = () => {
    if (!inputText.trim() || !socket) return;
    
    const words = inputText.trim().split(/\s+/);
    if (words.length > 50) {
      alert('একটি বার্তায় ৫০টি শব্দের বেশি লেখা যাবে না। (Maximum 50 words allowed)');
      return;
    }

    socket.emit('sendMessage', inputText);
    setInputText('');
  };

  const sendLike = () => {
    if (!socket) return;
    socket.emit('sendMessage', '👍');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const handleInputChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);
    // Optionally block typing beyond 50 words, but here we just update state and check on send.
    setInputText(text);
  };

  return (
    <div className="chat-popup-overlay">
      <div className="chat-popup-container">
        {/* Header Section */}
        <div className="chat-popup-header">
          <div className="chat-popup-header-top">
            <h2 className="chat-popup-title-text bengali-text">পূজার আড্ডা</h2>
            <button className="chat-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          
          <div className="chat-popup-tabs-container">
            <div className="chat-popup-tabs bengali-text animation-pop-in">
              <button 
                className={`chat-tab-btn-modern ${activeTab === 'adda' ? 'active' : ''}`}
                onClick={() => setActiveTab('adda')}
              >
                আড্ডা
              </button>
              <button 
                className={`chat-tab-btn-modern ${activeTab === 'group_adda' ? 'active' : ''}`}
                onClick={() => setActiveTab('group_adda')}
              >
                গ্রুপ আড্ডা
              </button>
            </div>
            <div className="chat-popup-tabs bengali-text animation-pop-in">
              <button 
                className={`chat-invite-btn ${activeTab === 'invite' ? 'active' : ''}`}
                onClick={() => setActiveTab('invite')}
              >
                <Mail size={16} />
                আমন্ত্রণ
              </button>
            </div>
          </div>
        </div>

        <div className="chat-warning-message bengali-text">
          <marquee scrollamount="4">বিজ্ঞপ্তি : অশ্লীল ভাষা, গালিগালাজ, কুরুচিপূর্ণ মন্তব্য এবং যৌনতাপূর্ণ ভাষা ব্যবহার কঠোরভাবে নিষিদ্ধ। অন্য ব্যবহারকারীদের প্রতি যেকোনো ধরনের হেনস্থা, বিদ্বেষমূলক বক্তব্য বা হুমকি দেওয়ার মতো আচরণ করলে স্থায়ীভাবে ব্লক করা হবে।</marquee>
        </div>

        {/* Content Section */}
        <div className="chat-popup-content">
          <div className="chat-messages">

            
            {activeTab === 'invite' && (
              <div className="invite-section-container animation-pop-in">
                <h3 className="invite-section-title bengali-text">আমন্ত্রণ আছে?</h3>
                <div className="invite-section-card">
                  <p className="invite-section-text">
                    Got a code from a friend? Join their group to see everyone live.
                  </p>
                  <button className="invite-join-btn">
                    Join with a code
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'adda' && messages.length === 0 && (
              <div className="chat-content-placeholder bengali-text">
                এখনও কোনো বার্তা নেই। আড্ডা শুরু করুন!
              </div>
            )}

            {activeTab === 'adda' && messages.map((msg) => {
              if (msg.isSystemMessage) {
                return (
                  <div key={msg.id} className="chat-system-message-row">
                    <span className={`chat-system-message bengali-text ${msg.isTimeReminder ? 'time-reminder' : ''}`}>
                      {msg.text}
                    </span>
                  </div>
                );
              }

              const isMine = msg.userId === myUserId;
              return (
                <div key={msg.id} className={`chat-message-row ${isMine ? 'mine' : 'theirs'}`}>
                  {!isMine && (
                    <img src={msg.avatar} alt="User Logo" className="chat-avatar" />
                  )}
                  <div className="chat-bubble-wrapper">
                    <div className="chat-bubble bengali-text">
                      {msg.text}
                    </div>
                  </div>
                  {isMine && (
                    <img src={msg.avatar} alt="User Logo" className="chat-avatar" />
                  )}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          
          {activeTab === 'group_adda' && (
            <button className="chat-fab-btn animation-pop-in">
              <Plus size={24} />
            </button>
          )}

          {activeTab === 'adda' && (
            <div className="chat-input-area">
              <div className="chat-input-wrapper">
                <input 
                  type="text" 
                  placeholder="বার্তা লিখুন... (Max 50 words)" 
                  className="chat-input-field bengali-text"
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                />
                <button className="chat-send-btn" onClick={sendMessage}>
                  <Send size={18} />
                </button>
              </div>
              <button className="chat-like-btn" onClick={sendLike}>
                <ThumbsUp size={24} color="#1877F2" fill="#1877F2" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPopup;
