import api from "./config";

export async function login(email, password) {
  const { data } = await api.post("/login", {
    data: {
      email,
      password,
    },
  });
  return data;
}
