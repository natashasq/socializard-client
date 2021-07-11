import styled from "styled-components";
import { PostCard } from "./components/PostCard";
import { useUserState } from "contexts/UserContext";

const PostsWrapper = styled.div``;

export function PostList({ posts, setPosts }) {
  const { user } = useUserState();

  if (posts.length && user) {
    return (
      <PostsWrapper>
        {posts.map((post) => (
          <PostCard key={post.post_id} post={post} user={user} setPosts={setPosts} />
        ))}
      </PostsWrapper>
    );
  }

  return null;
}
