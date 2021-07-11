import api from "./config";

export async function logout() {
  await api.post("/logout", {});
  return true;
}
