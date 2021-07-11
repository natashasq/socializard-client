import { Route } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styled, { css } from "styled-components";
import { RiChatDeleteLine, RiNeteaseCloudMusicFill } from "react-icons/ri";
import { Input } from "components/Input";
import { RiSendPlane2Fill } from "react-icons/ri";
import { getMessagesCount, getMessages, updateIsRead } from "service/messages";
import { Header } from "components/Header";
import { getFriends } from "service/friends";
import { useParams } from "react-router";
import { formatDate } from "utils/formatDate";
import { FaUserCircle } from "react-icons/fa";
import { getUser } from "service/user";

// Socket
import io from "socket.io-client";

const NEW_MESSAGE = "newMessage";

const InboxWrapper = styled.div`
  display: flex;
  padding-top: 50px;
  height: 100%;
`;

const Chat = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  position: relative;
  margin: 50px;
`;
const MessageList = styled.div`
  width: 25%;
  display: flex;
`;
const InputWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const ChatImg = styled(RiChatDeleteLine)`
  width: 600px;
  height: 600px;
  color: #242526;
`;

const SendBtn = styled(RiSendPlane2Fill)`
  height: 40px;
  width: 40px;
  color: orange;
  cursor: pointer;
  ${({ color }) => {
    if (color) {
      return css`
        color: ${color};
      `;
    }
  }};
  ${({ cursor }) => {
    if (cursor) {
      return css`
        cursor: ${cursor};
      `;
    }
  }};
`;

const FriendList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px;
`;

const FriendWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 300px;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 31px;
  margin-bottom: 10px;
  background-color: #242526;
  ${({ active }) => {
    if (active) {
      return css`
        background-color: orange;
        h4 {
          color: #242526;
        }
        svg {
          color: rgb(36, 37, 38)
        }
      `;
    }
  }};
`;

const StyledHeader = styled(Header)`
  margin-bottom: 0;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: auto;
  margin: 20px 0;
`;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-bottom: 5px;
  ${({ align }) => {
    if (align) {
      return css`
        align-self: ${align};
      `;
    }
  }};
`;

const MessageImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 10px;
  object-fit: cover;
`;

const PlaceholderImg = styled(FaUserCircle)`
  height: 40px;
  width: 40px;
  margin-right: 10px;
  color: #8f9093;
  ${({ color }) => {
    if (color) {
      return css`
        color: ${color};
      `;
    }
  }};
`;

const MessageContent = styled.p`
  font-size: 14px;
  margin: 0;
  color: white;
  ${({ color }) => {
    if (color) {
      return css`
        color: ${color};
      `;
    }
  }};
`;
const MessageTimeStamp = styled.span`
  margin-right: auto;
  font-size: 12px;
  color: #8f9093;
  ${({ margin }) => {
    if (margin) {
      return css`
        margin: ${margin};
      `;
    }
  }};
`;
const MessageContentWrapper = styled.div`
  background-color: #242526;
  padding: 7px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  ${({ backgroundColor }) => {
    if (backgroundColor) {
      return css`
        background-color: ${backgroundColor};
      `;
    }
  }};
`;

const Separator = styled.span`
  height: 90%;
  width: 1px;
  background: #8f9093;
  margin: auto;
`;

function HeaderWrapper({ count, setCount, friendId, ...rest }) {
  useEffect(() => {
    setCount(count);
  }, []);

  async function handleIsRead() {
    try {
      await updateIsRead(friendId);
      setCount(null);
    } catch (e) {
      console.log(e);
    }
  }

  return <StyledHeader onClick={handleIsRead} count={count} {...rest} />;
}

function Inbox() {
  const socketRef = useRef();

  const params = useParams();
  const [friends, setFriends] = useState(null);
  const [messages, setMessages] = useState(null);
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("");
  const [count, setCount] = useState(null);

  useEffect(() => {
    if (user) {
      const roomId = [user.user_id, params.id].sort().join("");

      socketRef.current = io(process.env.REACT_APP_API_PATH, {
        query: { roomId, userId: user.user_id },
        path: "/inbox",
      });

      socketRef.current.on(NEW_MESSAGE, (message) => {
        setMessages((oldMessages) => {
          return [...oldMessages, message];
        });
      });
    }
  }, [params.id, user]);

  function postMessage(content, friend_id, user_id) {
    const body = JSON.stringify({ content, friend_id, user_id });

    socketRef.current.emit(NEW_MESSAGE, { body });
  }

  useEffect(() => {
    (async () => {
      try {
        const messagesCountData = await getMessagesCount();
        const friendsData = await getFriends();
        const userData = await getUser();
        setUser(userData);

        const friendsWithCount = friendsData.map((friend) => {
          const messages = messagesCountData.find(
            (message) => message.user_id === friend.user_id
          );
          return messages
            ? {
                ...friend,
                count: messages.count,
              }
            : friend;
        });

        setFriends(friendsWithCount);

        if (params.id) {
          const messagesData = await getMessages(params.id);

          setMessages(messagesData);
        } else {
          setMessages(null);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [params.id]);

  return (
    <InboxWrapper>
      <MessageList>
        <FriendList>
          {friends?.length
            ? friends.map((friend) => (
                <FriendWrapper
                  active={params.id === friend.user_id}
                  key={friend.user_id}
                >
                  <HeaderWrapper
                    setCount={setCount}
                    count={friend.count}
                    friendId={friend.user_id}
                    imgUrl={friend.img_url}
                    username={friend.user_name}
                    linkProps={{ to: `/inbox/${friend.user_id}` }}
                    width={"100%"}
                  />
                </FriendWrapper>
              ))
            : null}
        </FriendList>
      </MessageList>
      <Separator />
      <Chat>
        {!messages && <ChatImg />}
        {messages && (
          <MessageContainer>
            {messages?.length
              ? messages.map((message, i) => {
                  if (message.user_id === params.id) {
                    return (
                      <MessageWrapper key={i}>
                        <MessageContentWrapper>
                          {message.userData.img_url ? (
                            <MessageImg src={message.userData.img_url} />
                          ) : (
                            <PlaceholderImg />
                          )}

                          <MessageContent>{message.content}</MessageContent>
                        </MessageContentWrapper>
                        <MessageTimeStamp marginRight="auto">
                          {formatDate(message.updatedAt)}
                        </MessageTimeStamp>
                      </MessageWrapper>
                    );
                  } else {
                    return (
                      <MessageWrapper align="flex-end" key={i}>
                        <MessageContentWrapper backgroundColor="orange">
                          {message.userData.img_url ? (
                            <MessageImg src={message.userData.img_url} />
                          ) : (
                            <PlaceholderImg />
                          )}

                          <MessageContent color="#242526">
                            {message.content}
                          </MessageContent>
                        </MessageContentWrapper>
                        <MessageTimeStamp margin="0 0 0 auto">
                          {formatDate(message.updatedAt)}
                        </MessageTimeStamp>
                      </MessageWrapper>
                    );
                  }
                })
              : null}
          </MessageContainer>
        )}

        {!params.id ? (
          <InputWrapper>
            <Input width="80%" backgroundColor="#242526" />
            <SendBtn color="#242526" cursor="auto" />
          </InputWrapper>
        ) : (
          <InputWrapper>
            <Input
              placeholder="Type something..."
              width="80%"
              value={value}
              onChange={(e) => setValue(e.currentTarget.value)}
            />
            <SendBtn
              onClick={() => postMessage(value, params.id, user.user_id)}
            />
          </InputWrapper>
        )}
      </Chat>
    </InboxWrapper>
  );
}

export default Inbox;
