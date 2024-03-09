import React, { useContext } from "react";
import { Container, Stack } from "react-bootstrap";
import { ChatContext } from "../context/ChatContext";
import ChatBox from "../components/ChatBox";
import { AuthContext } from "../context/AuthContext";
import PotentialChats from "../components/PotentialChats";
import ChatArea from "../components/ChatArea";

export default function Chat() {
  const { user } = useContext(AuthContext);
  const { userChats, IsuserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <div>
      <Container>
        <PotentialChats />
        {userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack
              className="message-box flex-grow-0 pe-3"
              gap={3}
              style={{ width: "30vw" }}
            >
              {IsuserChatsLoading && <p>Chats Loading...</p>}
              {userChats?.map((chat, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      updateCurrentChat(chat);
                    }}
                  >
                    <ChatBox chat={chat} user={user} />
                  </div>
                );
              })}
            </Stack>
            <ChatArea />
          </Stack>
        )}
      </Container>
    </div>
  );
}
