import { useAuthContext } from "contexts/AuthContext";
import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { Input } from "components/Input";
import { Button } from "components/Button";
import { login } from "service/login";
import styled from "styled-components";

const LoginWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
`;
const LoginForm = styled.form`
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

function Login({ history, location }) {
  const referer = location.state?.from.pathname || "/";
  const [{ auth }, dispatch] = useAuthContext();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  async function handleClick(e) {
    e.preventDefault();
    try {
      await login(value.email, value.password);
      dispatch({ type: "AUTH_SUCCESS" });
      history.push("/home");
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
    <LoginWrapper>
      <LoginForm>
        <Input
          placeholder="Email"
          margin="20px 0 10px 0"
          padding="10px"
          width="200px"
          onChange={(e) => handleChange("email", e.currentTarget.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          padding="10px"
          margin="10px 0 20px 0"
          width="200px"
          onChange={(e) => handleChange("password", e.currentTarget.value)}
        />
        <Button backgroundColor="orange" color="#18191a" onClick={handleClick}>
          Login
        </Button>
        <Text>
          Don't have account yet? Sign up{" "}
          <StyledLink to="/signup">here</StyledLink>
        </Text>
      </LoginForm>
    </LoginWrapper>
  );
}

export default Login;
