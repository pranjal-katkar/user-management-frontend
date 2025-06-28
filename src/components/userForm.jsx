import React, { useState, useEffect } from "react";
import "./UserForm.css";

const UserForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setEmail(initialData.email || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="user-input"
      />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="user-input"
      />
      <button type="submit" className="submit-btn">
        Save
      </button>
    </form>
  );
};

export default UserForm;
