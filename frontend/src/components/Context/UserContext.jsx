import React, { createContext, useState, useContext, Children } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <UserContext.Provider
      value={{ user, setUser, userId, setUserId, userRole, setUserRole }}
    >
      {children}
    </UserContext.Provider>
  );
};
