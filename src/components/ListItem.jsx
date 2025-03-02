import React from "react";

const ListItem = ({ list, onDelete, onEdit }) => {
  return (
    <div>
      <h3>{list.name}</h3>
      <p>Created: {list.createdAt}</p>
      <button onClick={() => onEdit(list)}>Edit</button>
      <button onClick={() => onDelete(list.id)}>Delete</button>
    </div>
  );
};

export default ListItem;