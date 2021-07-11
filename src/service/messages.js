import api from "./config";

export async function getMessagesCount() {
  const { data } = await api.get("/messages/count");
  return data;
}

export async function getMessages(friend_id) {
  const { data } = await api.get("/messages", {
    params: {
      friend_id
    }
  });
  return data;
}

export async function updateIsRead(friend_id) {
  const { data } = await api.patch("/messages", {
    data: {
      friend_id
    }
  });
  return data;
}

export async function getMessagesCountTotal() {
  const { data } = await api.get("/messages/count_total");
  return data;
}
