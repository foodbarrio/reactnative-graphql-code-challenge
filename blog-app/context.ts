import { createContext } from "react";

export default createContext({
  login: (token: string) => {},
  logout: () => {},
});
