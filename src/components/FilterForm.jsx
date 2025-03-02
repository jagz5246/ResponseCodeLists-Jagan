import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';

const FilterForm = ({ onFilter }) => {
  const [filter, setFilter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(filter);
  };

  return (
    <form className="filter-form" onSubmit={handleSubmit}>
      <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Enter response code (e.g. 2xx)" />
      <button type="submit" className="iconBtn"><SearchIcon /></button>
    </form>
  );
};

export default FilterForm;