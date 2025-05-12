export const setAuth = () => {
  localStorage.setItem("isAuthenticated", "true");
};

export const removeAuth = () => {
  localStorage.removeItem("isAuthenticated");
};

export const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};
