"use client";
import React, { useState, useEffect } from 'react';
import Marca_1 from "./image/datafast.png"
import Marca_2 from "./image/diners.png"
import Marca_3 from "./image/pichincha.png"
import "./MarcasClientes.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

const MarcasClientes: React.FC = () => {
  const phrases = [
    { id: 1, text: '', image: Marca_1},
    { id: 2, text: '', image: Marca_2 },
    { id: 3, text: '', image: Marca_3},
    { id: 4, text: '', image: Marca_1},
    { id: 5, text: '', image: Marca_2 },
    { id: 6, text: '', image: Marca_3},
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Ajusta el ancho de la ventana a tu criterio para determinar cuándo se considera móvil
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Comprobar el estado inicial al cargar la página

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhrase((prevPhrase) => (prevPhrase === phrases.length - 3 ? 0 : prevPhrase + 1));
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [phrases.length]);

  const nextPhrase = () => {
    setCurrentPhrase((prevPhrase) => (prevPhrase === phrases.length - 3 ? 0 : prevPhrase + 1));
  };

  const prevPhrase = () => {
    setCurrentPhrase((prevPhrase) => (prevPhrase === 0 ? phrases.length - 3 : prevPhrase - 1));
  };

  const renderedPhrases = isMobile ? phrases.slice(currentPhrase, currentPhrase + 1) : phrases.slice(currentPhrase, currentPhrase + 3);

  return (
    <div className="carousel-marcas-clientes">
      <div className={`carousel-images ${isMobile ? "mobile" : ""}`}>
        {renderedPhrases.map((phrase) => (
          <div key={phrase.id} className="carousel-item">
            <h2 className="carousel-title">{phrase.text}</h2>
            {phrase.image && (
              <img src={phrase.image.src} alt="Carousel Image" className="carousel-image" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarcasClientes;   