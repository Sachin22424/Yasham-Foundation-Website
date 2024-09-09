import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import "../assets/Chat.css";
import slider1 from '../assets/slider1.png';
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import UserChat from "../components/UserChat";
import ChatBox from "../components/ChatBox";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat, potentialChats, createChat, onlineUsers } = useContext(ChatContext);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleTextChatClick = () => {
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className="container-fluid chat-container">
      {user ? (
        <div className="users-column">
          <div className="all-users p-3">
            {isUserChatsLoading && <p>Loading Chats...</p>}
            {userChats?.length > 0 ? (
              userChats.map((chat, index) => (
                <div key={index} onClick={() => updateCurrentChat(chat)}>
                  <UserChat chat={chat} user={user} onlineUsers={onlineUsers} />
                </div>
              ))
            ) : (
              <p>No chats available</p>
            )}
            <h3>Potential Chats</h3>
            {potentialChats.map((potentialChat, index) => (
              <div key={index} className="user-card" onClick={() => createChat(user._id, potentialChat._id)}>
                <UserChat chat={potentialChat} user={user} onlineUsers={onlineUsers} />
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="chat-column">
        {user ? (
          <div className="d-flex flex-column">
            <div className="chat-header p-3">
              <ChatBox />
            </div>
          </div>
        ) : (
          <div className="min-vh-100 d-flex flex-column justify-content-center align-items-center text-white">
            <div className="container">
              <div className="row">
                <div className="col-md-6 text-center mb-5" id="one">
                  <h1 className="display-4 font-weight-bold">
                    Talk to Anyone<br />Make friends!
                  </h1>
                  <p className="lead">
                    Experience a random chat alternative to find friends, connect with people, and chat with strangers from all over the world!
                  </p>
                  <div className="d-flex justify-content-center mt-4">
                    <button 
                      className="btn btn-primary-custom btn-lg d-flex align-items-center"
                      onClick={handleTextChatClick} // Add the onClick event handler
                    >
                      <FontAwesomeIcon icon={faCommentDots} className="mr-2" />
                      <span style={{ marginLeft: '8px' }}>Text Chat</span>
                    </button>
                  </div>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <img src={slider1} alt="Chat" className="img-fluid reduced-size" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
