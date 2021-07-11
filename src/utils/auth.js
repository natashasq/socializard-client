export function getAuth() {
  return JSON.parse(localStorage.getItem("auth"));
}

export function removeAuth() {
  return localStorage.removeItem("auth");
}

export function setAuth() {
  return localStorage.setItem("auth", JSON.stringify(true));
}
