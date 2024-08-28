import { useEffect, useState } from "react";
import { baseURL, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat, user) => {
  const [recipientUser, setRecipientUser] = useState(null);
  const [error, setError] = useState(null);

  // Ensure chat and user are defined before accessing their properties
  const recipientId = chat?.members?.find((id) => id !== user?._id);

  // console.log("chat: ", chat);

  useEffect(() => {
    const getUser = async () => {
      if (!recipientId) return;

      try {
        const response = await getRequest(`${baseURL}/user/find/${recipientId}`);

        if (response.error) {
          setError(response.error);
          return;
        }

        setRecipientUser(response);
      } catch (err) {
        setError(err.message);
      }
    };

    getUser();
  }, [recipientId]); // Added recipientId to the dependency array

  return { recipientUser, error }; // Also return error to handle it outside the hook
};

// export default useFetchRecipientUser;