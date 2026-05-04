import { useState, useEffect } from "react";
import { UsersContext } from "./UsersContext";

export default function UsersProvider({ children }) {
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const deleteUser = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}