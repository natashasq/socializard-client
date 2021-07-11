import api from "./config";

export async function getComments(post_id) {
  const { data } = await api.get("/comments", {
    params: { post_id },
  });
  return data;
}

export async function shareComment(post_id, comment_content) {
  const { data } = await api.post("/write-comment", {
    data: {
      post_id,
      comment_content,
    },
  });
  return data;
}
