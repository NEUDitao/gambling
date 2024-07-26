import React, { useState } from 'react';
import Wheel from './Wheel'; // Your Wheel component
import Modal from './Modal';
import './App.css'; // Include your styles

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [userNumber, setUserNumber] = useState(null);

  const handleModalSubmit = (number) => {
    setUserNumber(number);
    setIsModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="App">
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
        />
      )}
      {!isModalVisible && (
        <div>
      <h1>Let's Get Ready to Gamble!</h1>
          <h2> V </h2>
        <Wheel 
            userNumber={userNumber}/>
        </div>
      )}
    </div>
  );
};

export default App;

