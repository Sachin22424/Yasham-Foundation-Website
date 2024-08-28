import { createContext, useState, useEffect, useCallback } from "react";
import { baseURL, getRequest, postRequest } from "../utils/services";
import { io } from 'socket.io-client';

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    const [potentialChats, setPotentialChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);

    const [messages, setMessages] = useState(null);
    const [isMessagesLoading, setIsMessagesLoading] = useState(false);
    const [messagesError, setMessagesError] = useState(null);

    const [sendTextMessageError, setSendTextMessageError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [allUsers, setAllUsers] = useState([]);

    // console.log("Notificationsddd : " , notifications);

    // console.log("current: ", onlineUsers);
    
    // useEffect(() => {
    //     console.log("New Message: ", newMessage);
    // }, [newMessage]);

    // Initialize socket
    useEffect(() => {
        const newSocket = io("http://localhost:3000");
        setSocket(newSocket);

        return () => newSocket.disconnect();
    }, [user]);

    useEffect(() => {
        if (socket === null) return;

        socket.emit("addNewUser", user?._id);

        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [socket]);

    // Send message to socket
    useEffect(() => {
        if (socket === null || !newMessage) return;

        const recipientId = currentChat?.members.find((member) => member !== user._id);

        socket.emit("sendMessage", { ...newMessage, recipientId });

        return () => {
            socket.off("sendMessage");
        };
    }, [socket, newMessage]);

    // Receive message and notifications from socket
    useEffect(() => {
        if (socket === null) return;

        socket.on("getMessage", (message) => {
            if (currentChat?._id !== message.chatId) return console.error("Message is not for this chat");
            setMessages((prev) => [...prev, message]);
        });

        socket.on("getNotification", (res) => {
            const isChatOpen = currentChat?.members.some(id => id === res.senderId);

            if (isChatOpen) {
                setNotifications((prev) => [{ ...res, isRead: true }, ...prev]);
            } else {
                setNotifications((prev) => [res, ...prev]);
            }
        });

        return () => {
            socket.off("getMessage");
            socket.off("getNotification");
        };
    }, [socket, currentChat]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseURL}/user`);
            if (response.error) {
                return console.error("Error fetching users: ", response.error);
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false;
                if (user?._id === u._id || u.isDeleted) return false;

                if (userChats) {
                    isChatCreated = userChats.some((chat) => {
                        return chat.members.includes(u._id);
                    });
                }

                return !isChatCreated;
            });

            setPotentialChats(pChats);
            setAllUsers(response);
        };

        getUsers();
    }, [user, userChats]);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);

                const response = await getRequest(`${baseURL}/chat/${user._id}`);

                setIsUserChatsLoading(false);

                if (response.error) {
                    setUserChatsError(response.error);
                } else {
                    setUserChats(response.filter(chat => !chat.isDeleted));
                }
            }
        };

        getUserChats();
    }, [user]);

    useEffect(() => {
        const getMessages = async () => {
            setIsMessagesLoading(true);
            setMessagesError(null);

            const response = await getRequest(`${baseURL}/message/${currentChat?._id}`);

            setIsMessagesLoading(false);

            if (response.error) {
                setMessagesError(response.error);
            } else {
                setMessages(response.filter(message => !message.isDeleted));
            }
        };

        if (currentChat) {
            getMessages();
        }
    }, [currentChat]);

    // Send text message
    const sendTextMessage = useCallback(async (textMessage, sender, currentChatId, setTextMessage) => {
        if (!textMessage.trim()) return console.error("Message is empty");

        const response = await postRequest(`${baseURL}/message`, JSON.stringify({ text: textMessage, senderId: sender, chatId: currentChatId }));

        if (response.error) {
            setSendTextMessageError(response.error);
        } else {
            setNewMessage(response);
            setMessages((prev) => [...prev, response]);
            setTextMessage(""); // Ensure setTextMessage is called correctly
        }
    }, []);

    const updateCurrentChat = useCallback((chat) => {
        setCurrentChat(chat);
    }, []);

    const createChat = useCallback(async (firstId, secondId) => {
        const response = await postRequest(`${baseURL}/chat`, JSON.stringify({ firstId, secondId }));

        if (response.error) {
            return console.error("Error creating chat: ", response.error);
        } else {
            setUserChats((prev) => [...prev, response]);
        }
    }, []);

    return (
        <ChatContext.Provider value={{
            userChats, setUserChats,
            isUserChatsLoading, setIsUserChatsLoading,
            userChatsError, setUserChatsError,
            potentialChats, createChat,
            updateCurrentChat, currentChat,
            messages, isMessagesLoading, messagesError, sendTextMessage, sendTextMessageError, newMessage, onlineUsers,
            notifications, setNotifications, allUsers
        }}>
            {children}
        </ChatContext.Provider>
    );
};
