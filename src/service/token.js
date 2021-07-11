import api from "./config";

export async function checkToken() {
  const { data } = await api.get("/token");
  return data;
}