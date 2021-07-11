import api from "./config";

export async function getUser() {
  const { data } = await api.get("/user");
  return data;
}

export async function getUserById(user_id) {
  const { data } = await api.get("/user", {
    params: {
      user_id,
    },
  });
  return data;
}

export async function updateUser(user_name, email) {
  const { data } = await api.patch("/user/info", {
    data: {
      user_name,
      email
    }
  });
  return data;
}

export async function updatePassword(old_password, new_password) {
  const { data } = await api.patch("/user/password", {
    data: {
      old_password,
      new_password
    }
  });
  return data;
}