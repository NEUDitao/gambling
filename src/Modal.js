// src/Modal.js
import React, { useState } from 'react';

const Modal = ({ isVisible, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const number = parseFloat(inputValue);
    if (!isNaN(number)) {
      onSubmit(number);
    } else {
      alert('Please enter a valid number.');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>How much do you want to gamble?</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={inputValue}
            onChange={handleChange}
            placeholder=""
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;

