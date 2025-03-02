import React, { useState } from "react";

const FilterForm = ({ onFilter }) => {
  const [filter, setFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filter);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Enter response code (e.g. 2xx)" />
      <button type="submit">Filter</button>
    </form>
  );
};

export default FilterForm;