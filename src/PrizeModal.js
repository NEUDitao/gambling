// src/PrizeModal.js
import React from 'react';
import './PrizeModal.css'; // Optional: Include CSS for styling
import vid from './IMG_8598.MOV';

const PrizeModal = ({ prize, userNumber, onClose }) => {
  if (!prize) return null;

  if (prize == "WIN") {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>You would've won: {userNumber} (if we were in Vegas)</p>
          {userNumber < 400 && (<p>(You definitely could've bet more though...)</p>)}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  }
  else if (prize == "LOSE") {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sorry!</h2>
        <p>You would've lost: {userNumber}</p>
          <p>Venmo is @fakeedwardli</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  }

  else if (prize == "MEGA WIN") {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>CONGRATS! YOU REALLY WON! Your prize is entertainment</h2>
          <video width="640" height="360" controls muted autoplay >
    <source src={vid} type="video/mp4"/>
    Your browser does not support the video tag.
</video>
          <br/>

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );

  }

};

export default PrizeModal;

