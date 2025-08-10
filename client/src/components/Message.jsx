import React from 'react';
import './Message.css';

const Message = ({ message }) => {
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`message ${message.sender}`}>
      <div className="message-content">
        <p>{message.text}</p>
        <span className="message-time">{formatTime(message.timestamp)}</span>
      </div>
    </div>
  );
};

export default Message;