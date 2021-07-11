import api from "./config";

export async function getPosts() {
  const { data } = await api.get("/post");
  return data;
}

export async function sharePost(content) {
  const { data } = await api.post("/post", {
    data: {
      content,
    },
  });
  return data;
}

export async function deletePost(post_id) {
  await api.delete("/post", {
    data: {
      post_id,
    },
  });
  return true;
}

export async function updatePost(post_id, post_content) {
  const { data } = await api.patch("/post", {
    data: {
      post_id,
      post_content,
    },
  });
  return data;
}
