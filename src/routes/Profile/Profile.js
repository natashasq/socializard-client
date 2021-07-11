import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getUser, getUserById } from "service/user";
import { getFriends, requestAction } from "service/friends";
import styled from "styled-components";
import { ProfileOverview } from "./components/ProfileOverview";
import { FriendList } from "./components/FriendList";

const PageWrapper = styled.div`
  display: flex;
  padding-top: 50px;
  height: 100%;
`;

const Separator = styled.span`
  height: 90%;
  width: 1px;
  background: #8f9093;
  margin: auto;
`;

function Profile() {
  const params = useParams();
  const [user, setUser] = useState(null);
  const [userById, setUserById] = useState(null);
  const [friends, setFriends] = useState(null);
  const [value, setValue] = useState({
    user_name: "",
    email: "",
    old_password: "",
    new_password: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUser();
        const userDataById = await getUserById(params.user_id);
        const friendsData = await getFriends();
        setUser(userData);
        setUserById(userDataById);
        setFriends(friendsData); //ovde
        setValue({
          user_name: userData.user_name,
          email: userData.email,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [params.user_id]);

  if (user && userById) {
    return (
      <PageWrapper>
        <ProfileOverview
          user={user}
          userById={userById}
          setUserById={setUserById}
          value={value}
          setValue={setValue}
          paramsUserId={params.user_id}
          friends={friends}
          setFriends={setFriends}
        />
        {user.user_id === userById.user_id && <Separator />}
        <FriendList
          user={user}
          userById={userById}
          friends={friends}
          setFriends={setFriends}
        />
      </PageWrapper>
    );
  }
  return null;
}

export default Profile;
