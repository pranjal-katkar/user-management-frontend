import React, { useState, useEffect } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "./services/userService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (user) => {
    try {
      if (editUser) {
        await updateUser(editUser.id, user);
        toast.success("User updated");
        setEditUser(null);
      } else {
        await createUser(user);
        toast.success("User created");
      }
      fetchUsers();
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 409 ||
          err.response.data?.message?.toLowerCase().includes("email"))
      ) {
        toast.error("Email already exists");
        console.error("Error saving user:", err);
        toast.error("Email exists");
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      toast.error("Failed to delete user");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>User Management System</h1>
      <UserForm onSubmit={handleSubmit} initialData={editUser} />
      <UserList users={users} onEdit={setEditUser} onDelete={handleDelete} />
      <ToastContainer /> {/* ✅ Add this once */}
    </div>
  );
}

export default App;
