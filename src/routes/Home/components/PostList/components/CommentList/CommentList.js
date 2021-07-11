import { useEffect, useState } from "react";
import styled from "styled-components";
import { getComments } from "service/comments";
import { CommentCard } from "./components/CommentCard";

const CommentListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  margin-top: 15px;
`;



export function CommentList({ comments }) {
  if (comments.length) {
    return (
      <CommentListWrapper>
        {comments.map((comment) => (
          <CommentCard key={comment.comment_id} comment={comment} />
        ))}
      </CommentListWrapper>
    );
  }
  return null;
}
