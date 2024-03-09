import React, { useContext } from "react";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";

export default function ChatBox({ chat, user }) {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  const { onlineUsers } = useContext(ChatContext);

  return (
    <Stack
      direction="horizontal"
      className="user-card align-items-center p-2 justify-content-between"
      gap={3}
      role="button"
      style={{ width: "100%" }}
    >
      <div className="d-flex">
        <div className="me-2 d-flex align-items-center">
          <i
            className="fa-solid fa-user"
            style={{
              color: "aliceblue",

              fontSize: "16px",
            }}
          ></i>
        </div>
        <div className="text-content">
          <div className="name">{recipientUser?.name}</div>
        </div>
      </div>
      <div className="d-flex align-items-end flex-column">
        <span
          className={
            onlineUsers?.some((user) => user?.userId === recipientUser?._id)
              ? "user-online"
              : ""
          }
        ></span>
      </div>
    </Stack>
  );
}
