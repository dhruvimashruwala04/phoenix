import nookies from "nookies";

const COOKIE_NAME = "phoenix_token";

export const setAuthToken = (token) => {
  nookies.set(null, COOKIE_NAME, token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });
};

export const getAuthToken = () => {
  const cookies = nookies.get(null);
  return cookies[COOKIE_NAME] || null;
};

export const removeAuthToken = () => {
  nookies.destroy(null, COOKIE_NAME, {
    path: "/",
  });
};
