import { createContext } from "react";

// the "logged in" user.
export const UserContext = createContext({
  userId: "a3d641ee-1971-4b09-a5c0-5fe57e026194",
  email: "Mylene.Stiedemann@gmail.com",
  password: "fcxQaJeXKPHKqlW",
  firstName: "Quincy",
  lastName: "Emard",
  registeredAt: "2022-04-19T17:47:19.820Z",
  // remove this line to revoke admin privileges (or set to false)
  admin: true,
});
