import React, { useContext } from "react";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import "bootstrap/dist/css/bootstrap.min.css";
import { ChatContext } from '../context/ChatContext';
import profile from '../assets/profile2.png';
import useFetchLatestMessage from "../hooks/useFetchLatestMessage";
import moment from "moment";

const UserChat = ({ chat, user: currentUser, onlineUsers }) => {
  const { recipientUser } = useFetchRecipientUser(chat, currentUser);
  const { updateCurrentChat, notifications } = useContext(ChatContext);

  const isOnline = onlineUsers?.some((user) => user?.userId === recipientUser?._id);

  const unreadCount = notifications.filter(notification => 
    notification.senderId === recipientUser?._id && !notification.isRead
  ).length;

  const {latestMessage} = useFetchLatestMessage(chat);

  const truncateText = (text) => {
    let shortText = text.substring(0, 20);

    if(text.length > 20) {
      shortText += "...";
    }

    return shortText;
  }

  // console.log("Latest Messagessin frontend: ", latestMessage);

  return (
    <>
      <style>
        {`
          .profile-icon {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .user-online {
            background-color: #00ff00;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            position: absolute;
            margin-left: -10px;
            margin-top: 10px;
          }
          .notification-count {
            background-color: #097969;
            border-radius: 50%;
            color: white;
            width: 25px;
            height: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 43px;
            margin-top: 5px;
          }
        `}
      </style>
      <div className="user-card" onClick={() => updateCurrentChat(chat)}>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <img src={profile} alt="Profile" className="profile-icon" />
            {isOnline && <div className="user-online"></div>}
            <div className="text-content">
              <div className="name">{recipientUser?.name || chat.name}</div>
              <div className="text"> {
                latestMessage?.text &&(
                  <span>{truncateText(latestMessage?.text)}</span>
                )  
              } </div>
            </div>
          </div>
          <div className="date">{moment(latestMessage?.createdAt).calendar()}</div>
          {unreadCount > 0 && (
            <div className="notification-count">{unreadCount}</div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserChat;
