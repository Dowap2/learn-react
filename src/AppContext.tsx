import React, { createContext, useContext, useState, ReactNode } from "react";

type Gender = "" | "남성" | "여성";

type User = {
  name: string;
  email: string;
  age: number;
  gender: Gender;
  bio?: string;
};

type AppContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  userList: User[];
  setUserList: (users: User[]) => void;
  addUser: (user: User) => void;
};

const defaultValue: AppContextType = {
  user: null,
  setUser: () => {},
  userList: [],
  setUserList: () => {},
  addUser: () => {},
};

const AppContext = createContext<AppContextType>(defaultValue);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userList, setUserList] = useState<User[]>([]);

  const addUser = (newUser: User) => {
    setUserList((prev) => [...prev, newUser]);
  };

  return (
    <AppContext.Provider
      value={{ user, setUser, userList, setUserList, addUser }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
