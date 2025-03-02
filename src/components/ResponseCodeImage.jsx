import React from "react";

const ResponseCodeImage = ({ code }) => {
  return (
    <div>
      <img src={`https://http.dog/${code}.jpg`} alt={`HTTP ${code}`} width={200} />
      <p>{code}</p>
    </div>
  );
};

export default ResponseCodeImage;

