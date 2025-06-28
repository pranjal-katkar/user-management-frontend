import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>
          <span>
            {user.name} ({user.email})
          </span>
          <button onClick={() => onEdit(user)}>Edit</button>
          <button onClick={() => onDelete(user.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
