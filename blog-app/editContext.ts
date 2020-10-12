import { createContext } from "react";

export default createContext({
  edit: false,
  setEdit: (v: string | null) => {},
});
