import { useEffect, useState } from "react";
import { updateUser, updatePassword } from "service/user";
import styled from "styled-components";
import { BiEditAlt } from "react-icons/bi";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { TiUser } from "react-icons/ti";
import { friendStatus, updateStatus, addFriend } from "service/friends";
import {
  RiUserAddLine,
  RiUserUnfollowLine,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";

const ProfileWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin: 0 auto;
`;
const ProfilePhoto = styled.img`
  width: 350px;
  height: 350px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 50px;
  border: 2px solid #8f9093;
`;
const PlaceholderImg = styled(TiUser)`
  width: 350px;
  height: 350px;
  color: #8f9093;
  margin-top: 50px;
`;

const Heading = styled.h4`
  color: white;
  font-size: 20px;
  margin: 15px 0 0 0;
`;

const Edit = styled(BiEditAlt)`
  width: 30px;
  height: 30px;
  color: orange;
  position: absolute;
  right: 60px;
  top: 80px;
  cursor: pointer;
  background-color: #3a3b3c;
  border-radius: 50%;
  padding: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.75);
`;

const ButtonWrapper = styled.div`
  display: flex;
  margin: 15px 0 0 0;
  align-items: center;
`;

const Label = styled.label`
  color: white;
  font-size: 12px;
  margin-top: 15px;
`;

const LightButton = styled.button`
  background-color: transparent;
  color: #8f9093;
  border: none;
  cursor: pointer;
  position: relative;
  margin: 20px 50px;
  font-size: 16px;
`;

//Icons
const AddIcon = styled(RiUserAddLine)`
  height: 20px;
  width: 20px;
  color: #18191a;
  margin-right: 5px;
`;

const CancelIcon = styled(RiUserUnfollowLine)`
  height: 20px;
  width: 20px;
  color: #8f9093;
  margin-right: 2px;
`;

const SubmitIcon = styled(RiCheckLine)`
  height: 20px;
  width: 20px;
  color: #242526;
  margin-right: 2px;
`;

const CancelEditIcon = styled(RiCloseLine)`
  height: 20px;
  width: 20px;
  color: #8f9093;
  margin-right: 2px;
`;

export function ProfileOverview({
  user,
  userById,
  setUserById,
  value,
  setValue,
  paramsUserId,
  friends,
  setFriends,
}) {
  const [edit, setEdit] = useState(false);
  const [change, setChange] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(async () => {
    try {
      const statusData = await friendStatus(paramsUserId);
      setStatus(statusData);
      console.log(statusData);
    } catch (e) {
      console.log(e);
    }
  }, [paramsUserId]);

  function handleChange(key, val) {
    setValue({ ...value, [key]: val });
  }

  async function handleUpdateUser(e) {
    e.preventDefault();
    try {
      const data = await updateUser(value.user_name, value.email);
      setUserById(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleUpdatePassword(e) {
    e.preventDefault();
    try {
      const data = await updatePassword(value.old_password, value.new_password);
      setUserById(data);
    } catch (e) {
      console.log(e);
    }
  }

  async function handleRequestAction(e, action, friend_id) {
    e.preventDefault();
    try {
      const data = await updateStatus(action, friend_id);
      console.log(data, "iz status update");
      if (action === "accept") {
        setStatus(data);
        return data;
      }

      if (action === "reject" || action === "cancel" || action === "unfriend") {
        setStatus(data);
        return data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function handleAddFriend(e, friend_id) {
    e.preventDefault();
    try {
      const data = await addFriend(friend_id);
      setStatus(data);

      return data;
    } catch (e) {
      console.log(e);
    }
  }

  if (user && userById) {
    return (
      <ProfileWrapper>
        {user.user_id === userById.user_id && (
          <Edit onClick={() => setEdit(!edit)} />
        )}
        {userById.img_url ? (
          <ProfilePhoto src={userById.img_url} />
        ) : (
          <PlaceholderImg />
        )}

        {edit ? (
          <>
            <Input
              value={value.user_name}
              onChange={(e) => handleChange("user_name", e.currentTarget.value)}
              margin="15px 0 0 0"
              width="60%"
            />
            <Input
              value={value.email}
              onChange={(e) => handleChange("email", e.currentTarget.value)}
              margin="15px 0 0 0"
              width="60%"
            />
            <ButtonWrapper>
              <Button
                backgroundColor="orange"
                color="#18191a"
                margin="0 5px"
                onClick={async (e) => {
                  try {
                    await handleUpdateUser(e, value.user_name, value.email);
                    setEdit(false);
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <SubmitIcon />
                Submit
              </Button>
              <Button
                backgroundColor="#3a3b3c"
                color="#8f9093"
                margin="0 5px"
                onClick={() => setEdit(false)}
              >
                <CancelEditIcon />
                Cancel
              </Button>
            </ButtonWrapper>

            <Button
              backgroundColor="#3a3b3c"
              color="#8f9093"
              margin="30px 0 0 0"
              onClick={() => setChange(!change)}
            >
              Change password
            </Button>
            {change ? (
              <>
                <Label>Old password:</Label>
                <Input
                  type="password"
                  value={value.old_password}
                  onChange={(e) =>
                    handleChange("old_password", e.currentTarget.value)
                  }
                  width="60%"
                />
                <Label>New password:</Label>
                <Input
                  type="password"
                  onChange={(e) =>
                    handleChange("new_password", e.currentTarget.value)
                  }
                  width="60%"
                />
                <ButtonWrapper>
                  <Button
                    backgroundColor="orange"
                    color="#18191a"
                    margin="0 5px"
                    onClick={async (e) => {
                      try {
                        await handleUpdatePassword(
                          e,
                          value.old_password,
                          value.new_password
                        );
                        setEdit(false);
                      } catch (e) {
                        console.log(e);
                      }
                    }}
                  >
                    <SubmitIcon />
                    Submit
                  </Button>
                  <Button
                    backgroundColor="#3a3b3c"
                    color="#8f9093"
                    margin="0 5px"
                    onClick={() => setChange(false)}
                  >
                    <CancelEditIcon />
                    Cancel
                  </Button>
                </ButtonWrapper>
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <Heading>{userById.user_name}</Heading>
            <Heading>{userById.email}</Heading>
          </>
        )}
        {user.user_id !== userById.user_id && (
          <>
            {!status && (
              <ButtonWrapper>
                <Button
                  backgroundColor="orange"
                  color="#18191a"
                  margin="20px 5px"
                  onClick={async (e) => {
                    try {
                      await handleAddFriend(e, userById.user_id);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  <AddIcon />
                  Add as a friend
                </Button>
              </ButtonWrapper>
            )}
            {status.status === "accept" && (
              <ButtonWrapper>
                <CancelIcon />
                <LightButton
                  onClick={async (e) => {
                    try {
                      await handleRequestAction(
                        e,
                        "unfriend",
                        userById.user_id
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
            {!status.status && status.friend_id === user.user_id && (
              <ButtonWrapper>
                <Button
                  backgroundColor="orange"
                  color="#18191a"
                  margin="0 5px"
                  onClick={async (e) => {
                    try {
                      await handleRequestAction(e, "accept", userById.user_id);
                    } catch (e) {
                      console.log(e);
                    }
                  }}
                >
                  Accept
                </Button>

                <Button
                  backgroundColor="#3a3b3c"
                  color="#8f9093"
                  margin="0 5px"
                  onClick={async (e) => {
                    try {
                      await handleRequestAction(e, "reject", userById.user_id);
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
            {!status.status && status.user_id === user.user_id && (
              <ButtonWrapper>
                <Button
                  backgroundColor="#3a3b3c"
                  color="#8f9093"
                  margin="20px 5px"
                  onClick={async (e) => {
                    try {
                      await handleRequestAction(e, "cancel", userById.user_id);
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
          </>
        )}
      </ProfileWrapper>
    );
  }
  return null;
}
