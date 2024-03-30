import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { Button } from "react-bootstrap";

export default function PotentialChats({ handleShow }) {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat, onlineUsers } = useContext(ChatContext);

  return (
    <div>
      <div className="all-users">
        <Button
          variant="primary"
          className="d-lg-none ms-2 me-2"
          onClick={handleShow}
        >
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </Button>
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div
                className="single-user"
                key={index}
                onClick={() => {
                  createChat(user.id, u._id);
                }}
              >
                {u.name}
                <span
                  className={
                    onlineUsers?.some((user) => user?.userId === u?._id)
                      ? "user-online"
                      : ""
                  }
                ></span>
              </div>
            );
          })}
      </div>
    </div>
  );
}
