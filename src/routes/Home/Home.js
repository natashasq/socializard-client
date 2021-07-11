import { useGetUser } from "hooks/useGetUser";
import { useState, useEffect } from "react";
import { getPosts } from "service/post";
import styled from "styled-components";


import { PostInput } from "./components/PostInput";
import { PostList } from "./components/PostList";

const HomeWrapper = styled.div`
  background-color: #18191a;
  height: calc(100% - 70px);
  width: 500px;
  margin: 0 auto;
  padding: 50px 20px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Home() {
  useGetUser();
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    (async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <HomeWrapper>
      <PostInput setPosts={setPosts} />
      <PostList posts={posts} setPosts={setPosts} />
    </HomeWrapper>
  );
}

export default Home;
