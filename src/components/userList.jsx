import React from "react";
import "./UserList.css";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-list-item">
          <span className="user-info">
            <strong>{user.name}</strong> ({user.email})
          </span>
          <div className="user-actions">
            <button className="edit-btn" onClick={() => onEdit(user)}>
              Edit
            </button>
            <button className="delete-btn" onClick={() => onDelete(user.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
