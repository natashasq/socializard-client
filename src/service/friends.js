import api from "./config";

export async function getFriends() {
  const { data } = await api.get("/friends");
  return data;
}

export async function addFriend(friend_id) {
  const { data } = await api.post("/friends", {
    data: {
      friend_id,
    },
  });
  return data;
}

export async function requestAction(action, friend_id) {
  const { data } = await api.patch("/friends", {
    data: {
      action,
      friend_id,
    },
  });
  return data;
}

export async function friendStatus(friend_id) {
  const { data } = await api.get("/friends/status", {
    params: {
      friend_id,
    },
  });
  return data;
}

export async function updateStatus(action, friend_id) {
  const { data } = await api.patch("/friends/status", {
    data: {
      action,
      friend_id,
    },
  });
  return data;
}
