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
    const emailExists = users.some(
      (u) => u.email && u.email === user.email
    );

    if (emailExists) {
      alert("Email already exists!");
      return false;
    }

    setUsers((prev) => [...prev, user]);
    return true;
  };

  const deleteUser = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateUser = (index, updatedUser) => {
    setUsers((prev) =>
      prev.map((u, i) => (i === index ? updatedUser : u))
    );
  };

  return (
    <UsersContext.Provider
      value={{ users, addUser, deleteUser, updateUser }}
    >
      {children}
    </UsersContext.Provider>
  );
}