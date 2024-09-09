import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/ChatBox.css';
import profile from '../assets/profile1.png';
import moment from 'moment';
import { Stack } from 'react-bootstrap';
import InputEmoji from 'react-input-emoji';
import send from '../assets/send1.png';

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading, sendTextMessage, notifications, setNotifications } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const [textMessage, setTextMessage] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (recipientUser) {
      setNotifications(prevNotifications =>
        prevNotifications.map(n =>
          n.senderId === recipientUser._id ? { ...n, isRead: true } : n
        )
      );
    }
  }, [recipientUser, setNotifications]);

  if (!recipientUser) {
    return (
      <div className="text-center w-100 p-3 dark-mode">
        <p>No chats selected</p>
      </div>
    );
  }

  if (isMessagesLoading) {
    return (
      <div className="text-center w-100 p-3 dark-mode">
        <p>Loading messages...</p>
      </div>
    );
  }

  return (
    <>
      <div className="text-center w-100 p-3 dark-mode">
        <div className="d-flex align-items-center justify-content-start">
          <img src={profile} alt="Profile" className="profile-icon" />
          <h4 className="mx-2 mt-1">{recipientUser.name}</h4>
        </div>
      </div>
      <div className="messages-container">
        <Stack gap={3} className="messages">
          {messages && messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.senderId === user._id ? 'sent' : 'received'}`}
            >
              <div className="message-text">{message.text}</div>
              <div className="message-time">{moment(message.createdAt).calendar()}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
      </div>

      <div className="message-input-container">
        <div className="d-flex align-items-center input-group-custom">
          <InputEmoji
            value={textMessage}
            onChange={setTextMessage}
            cleanOnEnter
            onEnter={() => {
              sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
              setTextMessage("");
              scrollToBottom();
            }}
            placeholder="Type a message"
            className="input-emoji"
          />
          <button className="button-emoji" onClick={() => {
            sendTextMessage(textMessage, user, currentChat._id);
            setTextMessage("");
            scrollToBottom();
          }}>
            <img src={send} alt="send image" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
