import React, { useState } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';  // Importing Font Awesome icons

const Star = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label
      style={{ cursor: 'pointer', fontSize: '20px' }} 
      onClick={handleChange}
    >
      {checked ? <FaStar color="gray" /> : <FaRegStar color="gray" />}
    </label>
  );
};

export default Star;
