import styled from "styled-components";

import { Header } from "components/Header";
import { formatDate } from "utils/formatDate";

const CommentWrapper = styled.div`
  background-color: #18191a;
  margin: 10px 0 0 0;
  flex: 1;
  padding: 20px;
  border-radius: 25px;
  height: fit-content;
`;

const CommentContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const CommentContent = styled.p`
  color: white;
  font-size: 14px;
  height: fit-content;
  padding: 0 10px;
`;

const CommentTimestamp = styled.span`
  margin-left: auto;
  font-size: 12px;
  color: #8f9093;
`;

export function CommentCard({ comment: { createdAt, comment_img_url, comment_user_name, comment_content } }) {
  const formatedDate = formatDate(createdAt);

  return (
    <CommentWrapper>
      <Header
        imgUrl={comment_img_url}
        username={comment_user_name}
      />
      <CommentContentWrapper>
        <CommentContent>{comment_content}</CommentContent>
        <CommentTimestamp>{formatedDate}</CommentTimestamp>
      </CommentContentWrapper>
    </CommentWrapper>
  );
}
