"use client";
import React, { useState, useEffect } from 'react';
import './Carousel.css'; // Importa el archivo CSS para los estilos

const Carousel: React.FC = () => {
  const numbers = [1, 2, 3, 4, 5]; // Números para las tarjetas
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % numbers.length);
    }, 3000); // Cambia de número cada 3 segundos

    return () => clearInterval(interval);
  }, [numbers.length]);

  return (
    <div className="carousel-container">
      <div className="carousel">
        {numbers.map((number, index) => (
          <div
            key={number}
            className={`card ${index === currentIndex ? 'active' : ''}`}
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
