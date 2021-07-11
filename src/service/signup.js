import api from "./config";

export async function signup(user_name, email, password, confirm_password, img_url) {
  const { data } = await api.post("/signup", {
    data: {
      user_name,
      email,
      password,
      confirm_password,
      img_url
    },
  });
  return data;
}
