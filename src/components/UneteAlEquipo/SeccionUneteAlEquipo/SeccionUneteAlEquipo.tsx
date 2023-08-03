"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import ImageEquipo from './image-equipo.png'
import './SeccionUneteAlEquipo.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck} from "@fortawesome/free-regular-svg-icons";

function SeccionUneteAlEquipo() {
  return (
    <section className="seccion-contactanos">
      <div className="contactanos-contenido">
        <div className="seccion-titulo">
          <h4>Únete al equipo</h4>
          <h2>Forma parte de una empresa en crecimiento</h2>
          <p>Estamos en constante búsqueda de mentes curiosas y apasionadas por el mundo de los datos. Si te apasiona el análisis, la transformación y la interpretación de información, envíanos tu postulación.</p>
        </div>
        <div>
          <Image src={ImageEquipo} alt='Advantech Datos' width={800} height={400}></Image>
        </div>
      </div>
    </section>
  );
}

export default SeccionUneteAlEquipo;
