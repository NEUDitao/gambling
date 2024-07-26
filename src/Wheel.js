// src/Wheel.js
import React, { useRef, useEffect, useState } from 'react';
import PrizeModal from './PrizeModal'; // Import the PrizeModal component

const Wheel = ({userNumber}) => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const segments = [];
  const colors = [];

  const max = userNumber >= 400 ? 9 : 10;

  for (let i = 0; i < max; i++) {
    segments.push("WIN", "LOSE");
    colors.push("#4CBB17", "#FF0000");
  }
  
  if (userNumber >= 400) {
    segments.push("MEGA WIN", "LOSE");
    colors.push("#FFD700", "#FF0000");
  }

  const drawWheel = (currentAngle) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10; // Slight margin for triangle

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentAngle * Math.PI / 180);
    ctx.translate(-centerX, -centerY);

    segments.forEach((segment, index) => {
      const startAngle = (index * 2 * Math.PI) / segments.length;
      const endAngle = ((index + 1) * 2 * Math.PI) / segments.length;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate((startAngle + endAngle) / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#000';
      ctx.font = '20px Arial';
      ctx.fillText(segment, radius - 10, 10);
      ctx.restore();
    });

    ctx.restore();
  };

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null); // Reset the selected prize

    const spinAngle = Math.random() * 360 + 360 * 3; // Spin at least 3 full rotations

    let currentAngle = 0;
    const spinDuration = 4000; // 4 seconds
    const startTime = performance.now();

    const animate = (time) => {
      const elapsed = time - startTime;
      if (elapsed < spinDuration) {
        const easedTime = easeOut(elapsed / spinDuration);
        currentAngle = spinAngle * easedTime;
        setAngle(currentAngle);
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        const finalAngle = spinAngle % 360;
        const prizeAngle = spinAngle + 90 % 360;
        setAngle(finalAngle);
        determinePrize(prizeAngle);
      }
    };

    requestAnimationFrame(animate);
  };

  const easeOut = (t) => (--t) * t * t + 1;

  const determinePrize = (finalAngle) => {
    // Adjust the angle so the top of the wheel is aligned
    const segmentAngle = 360 / segments.length;
    const adjustedAngle = (360 - (finalAngle % 360)) % 360;
    const index = Math.floor(adjustedAngle / segmentAngle);
    let selectedPrize = segments[index];
    setSelectedPrize(selectedPrize);
    setShowModal(true); // Show the modal with the selected prize

    if (selectedPrize == "WIN") {
      setWinnings(w => w + userNumber);
    } else {
      setWinnings(w => w - userNumber);
    }
  };

  useEffect(() => {
    drawWheel(angle);
  }, [angle]);

  const closeModal = () => {
    setShowModal(false);
  };

  const windowWidth = window.innerWidth - 20;
  const width = Math.min(windowWidth, 500); 

  const [winnings, setWinnings] = useState(0);

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={width} style={{ border: '1px solid #000', maxWidth:"98%", maxHeight:"98%" }} />
      <br/>
      <button onClick={spinWheel} disabled={isSpinning}>Spin</button>
      <p>Overall winnings: {winnings}</p>
      {showModal && (
        <PrizeModal prize={selectedPrize} userNumber={userNumber} onClose={closeModal} />
      )}
    </div>
  );
};

export default Wheel;

