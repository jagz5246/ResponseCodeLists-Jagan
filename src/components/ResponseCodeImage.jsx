import React from "react";
import '../App.css';

const ResponseCodeImage = ({ code }) => {
  return (
    <div className="response-card">
      <img src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} width={360} />
      <p>{code}</p>
    </div>
  );
};

export default ResponseCodeImage;

