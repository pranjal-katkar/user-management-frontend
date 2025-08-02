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
      const status = err?.response?.status;
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Unknown error";

      console.log("💥 Error Response:", err.response);

      if (status === 409 || message.toLowerCase().includes("email")) {
        toast.error("❌ Email already exists");
      } else {
        toast.error("⚠️ Something went wrong");
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
    <div
      style={{
        alignItems: "center",
        padding: "2rem 2rem 3rem", // less top padding, more bottom padding
        margin: "3rem auto",
        maxWidth: "640px",
        borderRadius: "16px",
        backgroundColor: "#e5e0de",
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#111827",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem", fontSize: "2rem", fontWeight: 600 }}>
        User Management System
      </h1>
      <UserForm onSubmit={handleSubmit} initialData={editUser} />
      <UserList users={users} onEdit={setEditUser} onDelete={handleDelete} />
      <ToastContainer /> {/* ✅ Add this once */}
    </div>
  );
}

export default App;
