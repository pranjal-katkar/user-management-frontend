import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/userService";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (user) => {
    try {
      if (editUser) {
        await updateUser(editUser.id, user);
        setEditUser(null);
      } else {
        await createUser(user);
      }
      fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User Management System</h1>
      <UserForm onSubmit={handleSubmit} initialData={editUser} />
      <UserList users={users} onEdit={setEditUser} onDelete={handleDelete} />
    </div>
  );
}

export default App;
