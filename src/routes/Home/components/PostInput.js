import styled from "styled-components";
import { RiShareForwardFill } from "react-icons/ri";
//N
import { useState } from "react";

import { Button } from "components/Button";
import { Input } from "components/Input";
import { useUserState } from "contexts/UserContext";

//Natasa pokusavala
import { sharePost } from "service/post";

const PostInputWrapper = styled.div`
  background-color: #242526;
  margin: 30px 0;
  width: 400px;
  padding: 20px;
  border-radius: 25px;
`;
const PostInputHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  margin-right: 10px;
  object-fit: cover;
`;

const PostInputHeading = styled.h4`
  color: #8f9093;
  margin: 0;
`;

const PostInputContent = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(RiShareForwardFill)`
  margin-right: 5px;
`;

export function PostInput({ setPosts }) {
  const { user } = useUserState();

  const [value, setValue] = useState({
    post_content: "",
  });

  async function handleClick(e) {
    e.preventDefault();
    try {
      const newPost = await sharePost(value.post_content);
      setPosts((oldPosts) => [newPost, ...oldPosts]);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(key, val) {
    setValue({ ...value, [key]: val });
  }

  if (user) {
    return (
      <PostInputWrapper>
        <PostInputHeader>
          <Image src={user.img_url} />
          <PostInputHeading>{user.user_name}</PostInputHeading>
        </PostInputHeader>
        <PostInputContent>
          <Input
            placeholder="Write something..."
            onChange={(e) =>
              handleChange("post_content", e.currentTarget.value)
            }
          />
          <Button
            color="#18191a"
            backgroundColor="orange"
            onClick={handleClick}
          >
            <Icon />
            Share
          </Button>
        </PostInputContent>
      </PostInputWrapper>
    );
  }

  return null;
}
