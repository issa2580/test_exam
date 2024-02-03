interface Props {
  children: React.ReactNode;
}
import { createContext, useState } from "react";

const GlobalContext = createContext({
  users: [],
  setUsers: (data: any) => {},
});

const GlobalContextProvider = ({ children }: Props) => {
  const [users, setUsers] = useState([]);

  return (
    <GlobalContext.Provider value={{ users, setUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalContextProvider };
