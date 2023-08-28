"use client";
import React, { useState, useEffect } from 'react';
import Marca_1 from "./image/Logo-Aberfura.svg"
import Marca_2 from "./image/Logo-Generática.svg"
import Marca_3 from "./image/Logo-HCT.svg"
import Marca_4 from "./image/Logo-splunk.svg"
import "./MarcasAliados.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight, faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

const MarcasAliados: React.FC = () => {
  const phrases = [
    { id: 1, text: '', image: Marca_1},
    { id: 2, text: '', image: Marca_2 },
    { id: 3, text: '', image: Marca_3},
    { id: 4, text: '', image: Marca_4},
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
      setCurrentPhrase((prevPhrase) => (prevPhrase === phrases.length - 4 ? 0 : prevPhrase + 1));
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [phrases.length]);

  const nextPhrase = () => {
    setCurrentPhrase((prevPhrase) => (prevPhrase === phrases.length - 4 ? 0 : prevPhrase + 1));
  };

  const prevPhrase = () => {
    setCurrentPhrase((prevPhrase) => (prevPhrase === 0 ? phrases.length - 4 : prevPhrase - 1));
  };

  const renderedPhrases = isMobile ? phrases.slice(currentPhrase, currentPhrase + 1) : phrases.slice(currentPhrase, currentPhrase + 4);

  return (
    <div className="carousel-marcas-aliados">
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

export default MarcasAliados;   