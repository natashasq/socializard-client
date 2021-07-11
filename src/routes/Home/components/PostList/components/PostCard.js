import styled from "styled-components";

import { Button } from "components/Button";
import { useState, useEffect } from "react";
import { CommentList } from "./CommentList";
import { Header } from "components/Header";
import { formatDate } from "utils/formatDate";
import { getComments, shareComment } from "service/comments";
import { Input } from "components/Input";
import {
  RiSendPlane2Fill,
  RiDeleteBin6Line,
  RiCheckLine,
  RiCloseLine,
} from "react-icons/ri";
import { deletePost, updatePost } from "service/post";
import { BiEditAlt } from "react-icons/bi";

const PostWrapper = styled.div`
  background-color: #242526;
  margin: 30px 0 15px 0;
  width: 400px;
  padding: 20px;
  border-radius: 25px;
`;

const PostContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostContent = styled.p`
  color: white;
  font-size: 14px;
  height: fit-content;
  padding: 0 10px;
`;

const PostTimestamp = styled.span`
  margin-left: auto;
  font-size: 12px;
  color: #8f9093;
`;

const PostFooter = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ExpandButton = styled.button`
  background-color: transparent;
  color: #8f9093;
  border: none;
  cursor: pointer;
  position: relative;
`;

const Counter = styled.span`
  color: black;
  background-color: orange;
  height: 14px;
  width: 14px;
  font-size: 12px;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  position: absolute;
  top: -5px;
  right: -10px;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled(RiSendPlane2Fill)`
  height: 20px;
  width: 20px;
  color: orange;
`;

const IconButton = styled.button`
  background-color: transparent;
  margin: 0 10px;
  border: none;
  height: 20px;
  width: 20px;
  cursor: pointer;
`;

const EditIcon = styled(BiEditAlt)`
  height: 20px;
  width: 20px;
  color: #8f9093;
  margin-right: 2px;
`;

const DeleteIcon = styled(RiDeleteBin6Line)`
  height: 20px;
  width: 20px;
  color: #8f9093;
  margin-right: 2px;
`;

const UpdateIcon = styled(RiCheckLine)`
  height: 20px;
  width: 20px;
  color: #242526;
  margin-right: 2px;
`;

const CancelIcon = styled(RiCloseLine)`
  height: 20px;
  width: 20px;
  color: #8f9093;
  margin-right: 2px;
`;

export function PostCard({ post, user, setPosts }) {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false); //inicijalna vrednos false
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState({
    comment_content: "",
    post_content: post.post_content,
  });

  async function handleShareClick(e) {
    e.preventDefault();
    try {
      const newComment = await shareComment(
        post.post_id,
        value.comment_content
      );
      setComments((oldComments) => [newComment, ...oldComments]);
    } catch (e) {
      console.log(e);
    }
  }

  function handleChange(key, val) {
    setValue({ ...value, [key]: val });
  }

  async function handleDeletePost(e, post_id) {
    e.preventDefault();
    try {
      await deletePost(post_id);
      setPosts((oldPosts) =>
        oldPosts.filter((post) => post.post_id !== post_id)
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const data = await getComments(post.post_id);
        setComments(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const formatedDate = formatDate(post.updatedAt);

  function handleOpen() {
    setOpen(!open);
  }

  async function handleUpdatePost(e, post_id, post_content) {
    e.preventDefault();
    try {
      const data = await updatePost(post_id, post_content);

      setPosts((oldPosts) => {
        const postIndex = oldPosts.findIndex(
          (post) => post.post_id === data.post_id
        );

        return [
          ...oldPosts.slice(0, postIndex),
          data,
          ...oldPosts.slice(postIndex + 1),
        ];
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <PostWrapper>
      <Header
        imgUrl={post.post_img_url}
        username={post.post_user_name}
        linkProps={{ to: `/profile/${post.post_user_id}` }}
      />
      <PostContentWrapper>
        {edit ? (
          <Input
            value={value.post_content}
            padding="10px"
            margin="0 0 10px 0"
            onChange={(e) =>
              handleChange("post_content", e.currentTarget.value)
            }
          />
        ) : (
          <PostContent>{post.post_content}</PostContent>
        )}
        {!edit && <PostTimestamp>{formatedDate}</PostTimestamp>}
      </PostContentWrapper>
      <PostFooter>
        <ExpandButton onClick={handleOpen}>
          Comments
          {Boolean(comments.length) && <Counter>{comments.length.toString()}</Counter>}
        </ExpandButton>
        {post.post_user_id === user.user_id && !edit && (
          <>
            <Button
              backgroundColor="#3a3b3c"
              color="#8f9093"
              marginLeft="auto"
              onClick={() => setEdit(true)}
            >
              <EditIcon />
            </Button>
            <Button
              backgroundColor="#3a3b3c"
              color="#8f9093"
              onClick={(e) => handleDeletePost(e, post.post_id)}
            >
              <DeleteIcon />
            </Button>
          </>
        )}
        {edit && (
          <>
            <Button
              color="#18191a"
              backgroundColor="orange"
              marginLeft="auto"
              onClick={async (e) => {
                try {
                  await handleUpdatePost(e, post.post_id, value.post_content);
                  setEdit(false);
                } catch (e) {
                  console.log(e);
                }
              }}
            >
              <UpdateIcon />
              Update
            </Button>
            <Button
              backgroundColor="#3a3b3c"
              color="#8f9093"
              onClick={() => setEdit(false)}
            >
              <CancelIcon />
              Cancel
            </Button>
          </>
        )}
      </PostFooter>
      {open && (
        <>
          <CommentInputWrapper>
            <Input
              placeholder="Write a comment..."
              onChange={(e) =>
                handleChange("comment_content", e.currentTarget.value)
              }
            />
            <IconButton onClick={handleShareClick}>
              <Icon />
            </IconButton>
          </CommentInputWrapper>
          <CommentList postId={post.post_id} comments={comments} />
        </>
      )}
    </PostWrapper>
  );
}
