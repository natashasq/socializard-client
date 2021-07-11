import { lazy, useEffect, useState } from "react";
import styled from "styled-components";
import { MdChat, MdHome } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";

import PrivateRoute from "components/PrivateRoute";
import { Link, useParams } from "react-router-dom";
import { logout } from "service/logout";
import { useAuthDispatch } from "contexts/AuthContext";
import { getUser } from "service/user";
import { getMessagesCountTotal } from "service/messages";

import { Button } from "components/Button";

const Home = lazy(() => import("../Home"));
const Profile = lazy(() => import("../Profile"));
const Inbox = lazy(() => import("../Inbox"));

const HeaderWrapper = styled.div`
  height: 50px;
  background-color: #242526;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  top: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #8f9093;
  margin: 0 10px;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  object-fit: cover;
  margin-right: 5px;
`;

const ChatIcon = styled(MdChat)`
  height: 25px;
  width: 25px;
`;

const Count = styled.div`
  color: #242526;
  background: orange;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  margin-right: 10px;
  position: absolute;
    top: 5px;
    right: 70px;
`;


const HomeIcon = styled(MdHome)`
  height: 25px;
  width: 25px;
  margin: 0 3px;
`;
const LogOutIcon = styled(FiLogOut)`
  height: 25px;
  width: 25px;
  margin: 0 3px;
`;

function IndexPage() {
  const [user, setUser] = useState(null);
  const dispatch = useAuthDispatch();
  const [count, setCount] = useState(null);
  const params = useParams();

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUser();
        const countData = await getMessagesCountTotal();
        setUser(userData);
        setCount(countData[0].count);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [params.id]);
  console.log(user);
  console.log(count);

  async function handleClick() {
    try {
      await logout();
      dispatch({ type: "LOGOUT" });
    } catch (e) {
      console.log(e);
    }
  }

  if (user) {
    return (
      <>
        <HeaderWrapper>
          <StyledLink to="/home">
            <HomeIcon />
            Home
          </StyledLink>
          <StyledLink to={`/profile/${user.user_id}`}>
            <Image src={user.img_url} />
            {user.user_name}
          </StyledLink>
          <StyledLink to="/inbox">
            <ChatIcon />
            {count && (
              <Count>{count}</Count>
            )}
          </StyledLink>
          <Button
            backgroundColor="#3a3b3c"
            color="#8f9093"
            onClick={handleClick}
          >
            <LogOutIcon />
          </Button>
        </HeaderWrapper>
        <PrivateRoute exact path={["/", "/home"]} component={Home} />
        <PrivateRoute exact path="/profile/:user_id" component={Profile} />
        <PrivateRoute exact path={["/inbox", "/inbox/:id"]} component={Inbox} />
      </>
    );
  }

  return null;
}

export default IndexPage;
