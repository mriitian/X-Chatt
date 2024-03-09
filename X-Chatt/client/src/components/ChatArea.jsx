import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment";
import InputEmoji from "react-input-emoji";

export default function ChatArea() {
  const { user } = useContext(AuthContext);
  const {
    currentChat,
    messages,
    IsMessageLoading,
    MessagesError,
    sendTextMessage,
  } = useContext(ChatContext);

  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  const [textMessage, settextMessage] = useState("");

  if (!recipientUser) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        No Chats Selected Yet
      </p>
    );
  }
  if (IsMessageLoading) {
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Loading Conversation...
      </p>
    );
  }

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong className="">{recipientUser?.name}</strong>
      </div>
      <Stack className="messages" gap={3}>
        {messages &&
          messages.map((message, index) => {
            return (
              <div
                key={index}
                className={
                  message.senderId !== user.id
                    ? "message" // Change to "message" if not the user's message
                    : "self message" // Change to "self-message" if the user's message
                }
              >
                <span>{message.text}</span>
                <span style={{ fontSize: "10px" }}>
                  {moment(message.createdAt).calendar()}
                </span>
              </div>
            );
          })}
      </Stack>
      <Stack direction="horizontal" gap={3} className="chat-input flex-grow-0">
        <InputEmoji value={textMessage} onChange={settextMessage} />
        <button
          className="send-btn"
          onClick={() => {
            sendTextMessage(textMessage, user, currentChat._id, settextMessage);
          }}
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </Stack>
    </Stack>
  );
}
