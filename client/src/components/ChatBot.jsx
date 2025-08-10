import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Message from './Message';
import QuickActions from './QuickActions';
import { IoSend, IoCodeSlash, IoLogoGithub, IoLogoLinkedin, IoMail } from 'react-icons/io5';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi! I'm Ravindu S Hemachandra, a Software Engineer and IT student at SLIIT. I'm here to tell you about my projects, skills, and experience. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.post('http://localhost:5001/api/chat/message', {
        message: input
      });

      setTimeout(() => {
        setMessages(prev => [...prev, {
          text: response.data.response,
          sender: 'bot',
          timestamp: new Date()
        }]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        text: "I'm having trouble connecting right now, but I'm still here! I'm a Software Engineer with experience in React, Node.js, and MongoDB. Feel free to reach out at ravindusdc@gmail.com!",
        sender: 'bot',
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }
  };

  const handleQuickAction = (message) => {
    setInput(message);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="header-content">
          <div className="profile-section">
            <div className="profile-pic">
              <IoCodeSlash size={30} />
            </div>
            <div className="profile-info">
              <h2>Ravindu S Hemachandra</h2>
              <span className="status">
                <span className="status-dot"></span>
                Software Engineer • Available
              </span>
            </div>
          </div>
          <div className="social-links">
            <a href="https://github.com/ravindusdc" target="_blank" rel="noopener noreferrer">
              <IoLogoGithub size={20} />
            </a>
            <a href="https://linkedin.com/in/ravindu-hemachandra" target="_blank" rel="noopener noreferrer">
              <IoLogoLinkedin size={20} />
            </a>
            <a href="mailto:ravindusdc@gmail.com">
              <IoMail size={20} />
            </a>
          </div>
        </div>
      </div>

      <QuickActions onAction={handleQuickAction} />

      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message key={index} message={msg} />
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ask about my projects, skills, or experience..."
          className="message-input"
        />
        <button onClick={sendMessage} className="send-button">
          <IoSend size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatBot;