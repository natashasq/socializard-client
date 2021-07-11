import { Button } from "components/Button";
import { Input } from "components/Input";
import { useAuthContext } from "contexts/AuthContext";
import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { signup } from "service/signup";
import styled, { css } from "styled-components";

const SignupWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  align-items: center;
`;
const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Text = styled.p`
  color: #8f9093;
`;
const StyledLink = styled(Link)`
  color: #8f9093;
`;

const ImageWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin: 5px;
  border-radius: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  ${({ active }) => {
    if (active) {
      return css`
        border: 2px solid orange;
      `;
    }
  }};
`;

const buildAvatarUrl = (avatar) =>
  `${process.env.REACT_APP_API_PATH}${avatar}`;

const avatars = [
  buildAvatarUrl('/img/zebra.jpg'),
  buildAvatarUrl('/img/foka.jpeg'),
  buildAvatarUrl('/img/lama.jpeg'),
  buildAvatarUrl('/img/mungos.jpg'),
  buildAvatarUrl('/img/zirafa.jpeg'),
];

function Signup({ history, location }) {
  const referer = location.state?.from.pathname || "/";
  const [{ auth }, dispatch] = useAuthContext();
  const [_avatar, setAvatar] = useState("");

  const [value, setValue] = useState({
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
    img_url: "",
  });

  async function handleClick(e) {
    e.preventDefault();
    try {
      await signup(
        value.user_name,
        value.email,
        value.password,
        value.confirm_password,
        value.img_url
      );
      setTimeout(() => {
        history.push("/login");
      }, 5000);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(key, val) {
    setValue({ ...value, [key]: val });
  }

  if (auth) {
    return <Redirect to={referer} />;
  }

  return (
    <SignupWrapper>
      <SignupForm>
        <Input
          margin="20px 0 10px 0"
          padding="10px"
          width="200px"
          placeholder="Username"
          onChange={(e) => handleChange("user_name", e.currentTarget.value)}
        />
        <Input
          margin="20px 0 10px 0"
          padding="10px"
          width="200px"
          placeholder="Email"
          onChange={(e) => handleChange("email", e.currentTarget.value)}
        />
        <Input
          margin="20px 0 10px 0"
          padding="10px"
          width="200px"
          type="password"
          placeholder="Password"
          onChange={(e) => handleChange("password", e.currentTarget.value)}
        />
        <Input
          margin="20px 0 20px 0"
          padding="10px"
          width="200px"
          type="password"
          placeholder="Confirm password"
          onChange={(e) =>
            handleChange("confirm_password", e.currentTarget.value)
          }
        />
        <Text>Pick your avatar:</Text>
        <ImageWrapper>
          {avatars.map((avatar) => (
            <Image
              key={avatar}
              active={avatar === _avatar}
              src={avatar}
              onClick={(e) => {
                handleChange("img_url", e.currentTarget.src);
                setAvatar(avatar);
              }}
            />
          ))}
        </ImageWrapper>
        <Button backgroundColor="orange" color="#18191a" onClick={handleClick}>
          Signup
        </Button>
        <Text>
          Already have account? Log in <StyledLink to="/login">here</StyledLink>
        </Text>
      </SignupForm>
    </SignupWrapper>
  );
}

export default Signup;
