import { DEMO_USERS } from "@/mock/users";
import { delay } from "./mockClient";
// import { authApi } from "./endpoints";

/**
 * Resolves to { user, access, refresh } or throws an Error with a message the
 * login form displays.
 */
export const login = async ({ email, password }) => {
  // return authApi.post("/token/", { email, password });

  await delay(500);

  const match = DEMO_USERS.find(
    (user) => user.email.toLowerCase() === email.trim().toLowerCase() && user.password === password
  );

  if (!match) throw new Error("Invalid email or password");

  const { password: _password, ...user } = match;
  return { user, access: `mock-access-${user.id}`, refresh: `mock-refresh-${user.id}` };
};

export const logout = async () => {
  // return authApi.post("/logout/");
  await delay(120);
};

/** Called on boot to re-validate the stored token and rehydrate the user. */
export const getCurrentUser = async () => {
  // return authApi.get("/me/");

  await delay(150);
  const { password: _password, ...user } = DEMO_USERS[0];
  return user;
};

export const updateProfile = async (payload) => {
  // return authApi.patch("/me/", payload);
  await delay(400);
  return payload;
};
