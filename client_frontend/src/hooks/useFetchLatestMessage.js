import { useContext, useEffect, useState } from 'react'; 
import { ChatContext } from '../context/ChatContext';
import { baseURL, getRequest } from '../utils/services';

export const useFetchLatestMessage = (chat) => {
    const { newMessage, notifications } = useContext(ChatContext);
    const [latestMessage, setLatestMessage] = useState(null);

    // console.log("Chatssss : ", chat);
    // console.log("New Messagesssssss : ", newMessage);
    // console.log("Notificationssssss : ", notifications);
    // console.log("Latest Messagesssssss : ", latestMessage);

    useEffect(() => {
        const getMessages = async () => {
            // if (!chat?._id) return;

            const response = await getRequest(`${baseURL}/message/${chat._id}`);

            if (response.error) {
                console.error("Error getting messages...", response.error);
                return;
            }

            const lastMessage = response[response?.length - 1];
            setLatestMessage(lastMessage);
        };

        getMessages();
    }, [newMessage, notifications]);

    return {latestMessage};
};

export default useFetchLatestMessage;