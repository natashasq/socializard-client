import { requestAction } from "service/friends";
import styled from "styled-components";
import { Button } from "components/Button";
import { Header } from "components/Header";
import { RiUserUnfollowLine, RiUserFollowLine } from "react-icons/ri";

const FriendListWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  align-items: flex-start;
`;

const FriendListHeadline = styled.h3`
  align-self: center;
  color: #8f9093;
  text-transform: uppercase;
  margin-top: 50px;
  font-size: 30px;
`;

const FriendWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const LightButton = styled.button`
  background-color: transparent;
  color: #8f9093;
  border: none;
  cursor: pointer;
  position: relative;
  margin-right: 50px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin-right: 50px;
`;

//Icons
const CancelIcon = styled(RiUserUnfollowLine)`
  height: 20px;
  width: 20px;
  color: #8f9093;
  margin-right: 3px;
`;

const AccpetIcon = styled(RiUserFollowLine)`
 height: 20px;
  width: 20px;
  color: #18191a;
  margin-right: 5px;
`


export function FriendList({ user, userById, friends, setFriends }) {
  async function handleRequestAction(e, action, friend_id) {
    e.preventDefault();
    try {
      const data = await requestAction(action, friend_id);
      console.log("TRY");

      if (action === "accept") {
        setFriends((oldFriends) => {
          const friendIndex = oldFriends.findIndex(
            (friend) => friend.user_id === data.user_id
          );

          return [
            ...oldFriends.slice(0, friendIndex),
            { ...data, Friends: data?.Friends?.[0] },
            ...oldFriends.slice(friendIndex + 1),
          ];
        });
      }

      if (action === "reject" || action === "cancel" || action === "unfriend") {
        setFriends((oldFriends) => {
          const friendIndex = oldFriends.findIndex(
            (friend) => friend.user_id === data.user_id
          );

          console.log(data.user_id);

          return [
            ...oldFriends.slice(0, friendIndex),
            ...oldFriends.slice(friendIndex + 1),
          ];
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (user.user_id === userById.user_id) {
    return (
      <FriendListWrapper>
        <FriendListHeadline>Friends</FriendListHeadline>
        {friends?.length
          ? friends.map((friend, i) => {
              return (
                <FriendWrapper key={i}>
                  <Header
                    imgUrl={friend.img_url}
                    username={friend.user_name}
                    linkProps={{ to: `/profile/${friend.user_id}` }}
                    margin={"0 50px"}
                  />
                  {friend.Friends.status === "accept" && (
                    <ButtonWrapper>
                      <CancelIcon />

                      <LightButton
                        onClick={async (e) => {
                          try {
                            await handleRequestAction(
                              e,
                              "unfriend",
                              friend.user_id
                            );
                          } catch (e) {
                            console.log(e);
                          }
                        }}
                      >
                        Unfriend
                      </LightButton>
                    </ButtonWrapper>
                  )}
                  {!friend.Friends.status &&
                    friend.Friends.friend_id === user.user_id && (
                      <ButtonWrapper>
                        <Button
                          backgroundColor="orange"
                          color="#18191a"
                          margin="0 5px"
                          onClick={async (e) => {
                            try {
                              await handleRequestAction(
                                e,
                                "accept",
                                friend.Friends.user_id
                              );
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                        >
                          <AccpetIcon />
                          Accept
                        </Button>
                      
                        <Button
                          backgroundColor="#3a3b3c"
                          color="#8f9093"
                          margin="0 5px"
                          onClick={async (e) => {
                            try {
                              await handleRequestAction(
                                e,
                                "reject",
                                friend.Friends.user_id
                              );
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                        >
                            <CancelIcon />
                          Reject
                        </Button>
                      </ButtonWrapper>
                    )}
                  {!friend.Friends.status &&
                    friend.Friends.user_id === user.user_id && (
                      <ButtonWrapper>
                      
                        <Button
                          backgroundColor="#3a3b3c"
                          color="#8f9093"
                          margin="0 5px"
                          onClick={async (e) => {
                            try {
                              await handleRequestAction(
                                e,
                                "cancel",
                                friend.Friends.friend_id
                              );
                            } catch (e) {
                              console.log(e);
                            }
                          }}
                        >
                            <CancelIcon />
                          Cancel Request
                        </Button>
                      </ButtonWrapper>
                    )}
                </FriendWrapper>
              );
            })
          : null}
      </FriendListWrapper>
    );
  }
  return null;
}
