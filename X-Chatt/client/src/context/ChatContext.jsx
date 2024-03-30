import { baseUrl, getRequest, postRequest } from "../utils/services";
import { createContext, useCallback, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setuserChats] = useState(null);
  const [IsuserChatsLoading, setIsuserChatsLoading] = useState(false);
  const [userChatsError, setuserChatsError] = useState(null);
  const [potentialChats, setpotentialChats] = useState([]);
  const [currentChat, setcurrentChat] = useState(null);
  const [messages, setmessages] = useState(null);
  const [IsMessageLoading, setIsMessageLoading] = useState(null);
  const [MessagesError, setMessagesError] = useState(null);
  const [SendTextMessagesError, setSendTextMessagesError] = useState(null);
  const [NewMessage, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setonlineUsers] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.emit("addNewUser", user?.id);
    socket.on("getOnlineUsers", (res) => {
      setonlineUsers(res);
    });

    return () => {
      socket.off("getOnlineUsers");
    };
  }, [socket]);

  useEffect(() => {
    if (socket === null) {
      return;
    }
    const recipientId = currentChat?.members.find((id) => id !== user?.id);
    socket.emit("sendMessage", { ...NewMessage, recipientId });
  }, [NewMessage]);

  useEffect(() => {
    if (socket === null) {
      return;
    }
    socket.on("getMessage", (res) => {
      if (currentChat?._id !== res.chatId) return;
      setmessages((prev) => [...prev, res]);
    });

    return () => {
      socket.off("getMessage");
    };
  }, [socket, currentChat]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        console.log(response, "Error fetching Users..");
        return setuserChatsError(response.error);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;
        if (user?.id === u._id) {
          return false;
        }

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === user._id || chat.members[1] === u._id;
          });
        }

        return !isChatCreated;
      });

      setpotentialChats(pChats);
    };

    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?.id) {
        setIsuserChatsLoading(true);

        const response = await getRequest(`${baseUrl}/chats/${user?.id}`);

        setIsuserChatsLoading(false);
        if (response.error) {
          return setuserChatsError(response.error);
        }

        setuserChats(response);
      }
    };
    getUserChats();
  }, [user]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessageLoading(true);
      setMessagesError(null);
      const response = await getRequest(
        `${baseUrl}/message/${currentChat?._id}`
      );
      setIsMessageLoading(false);
      if (response.error) {
        return setMessagesError(response.error);
      }

      setmessages(response);
    };
    getMessages();
  }, [currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, settextMessage) => {
      if (!textMessage) {
        console.log("write something...");
        return;
      }

      const response = await postRequest(
        `${baseUrl}/message`,
        JSON.stringify({
          chatId: currentChatId,
          senderId: sender.id, //can change this
          text: textMessage,
        })
      );

      if (response.error) {
        return setSendTextMessagesError(response);
      }

      setNewMessage(response);
      setmessages((prev) => [...prev, response]);
      settextMessage("");
    },
    []
  );

  const updateCurrentChat = useCallback((chat) => {
    setcurrentChat(chat);
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    // Create a chat between two users
    const response = await postRequest(
      `${baseUrl}/chats/`,
      JSON.stringify({ firstId, secondId })
    );

    if (response.error) {
      console.log(response, "Error Creating Chats");
      return response.error;
    }

    // Update the userChats state by adding the newly created chat object
    setuserChats((prev) => [...prev, response]);
  }); // Ensure to include dependencies if any

  return (
    <ChatContext.Provider
      value={{
        userChats,
        IsuserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        IsMessageLoading,
        MessagesError,
        sendTextMessage,
        onlineUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
