import { delay } from "./mockClient";
// import { authApi } from "./endpoints";

// Sample data — the accounts the mock login accepts. Delete this block when the
// real API is wired up below. Passwords are plain text on purpose.
const DEMO_USERS = [
  {
    id: 1,
    email: "admin@example.com",
    password: "password",
    name: "Alex Morgan",
    role: "Administrator",
    jobTitle: "Head of Revenue",
    phone: "+1 415 555 0132",
    timezone: "America/Los_Angeles",
  },
  {
    id: 2,
    email: "member@example.com",
    password: "password",
    name: "Sam Rivera",
    role: "Member",
    jobTitle: "Account Executive",
    phone: "+1 415 555 0177",
    timezone: "America/New_York",
  },
];

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
