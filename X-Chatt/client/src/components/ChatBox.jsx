import React, { useContext, useState } from "react";
import { useFetchRecipientUser } from "../hooks/useFetchRecipient";
import { Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import CloseButton from "./CloseButton";

export default function ChatBox({ chat, user, show, handleClose }) {
  const { recipientUser } = useFetchRecipientUser(chat, user);

  const { onlineUsers } = useContext(ChatContext);

  return (
    <div>
      <Offcanvas
        show={show}
        onHide={handleClose}
        responsive="lg"
        style={{ color: "aliceblue", backgroundColor: "rgb(47 47 47)" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Available Chats</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
                  onlineUsers?.some(
                    (user) => user?.userId === recipientUser?._id
                  )
                    ? "user-online"
                    : ""
                }
              ></span>
            </div>
          </Stack>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
