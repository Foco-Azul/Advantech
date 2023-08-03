"use client";
import React, { useState } from 'react';
import './SeccionContactanos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck} from "@fortawesome/free-regular-svg-icons";

function SeccionContactanos() {
  return (
    <section className="seccion-contactanos">
      <div className="contactanos-contenido">
        <div className="seccion-titulo">
          <h4>Contáctanos</h4>
          <h2>Ponte en contacto con nuestro equipo</h2>
          <p>Atenderemos con gusto a todas tus consultas y te ayudaremos a poder adquirir nuestros planes.</p>
          <ul>
            <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Obtén una mejor explicación sobre nuestros planes</span></li>
            <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Realiza consultas sobre nuestra documentación</span></li>
            <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Descubre los casos de uso para tu empresa</span></li>
          </ul>
          <p>En nuestra página de Documentación encontrarás tutoriales sobre el uso de nuestros productos y contacto directo de soporte técnico.</p>
        </div>
      </div>
    </section>
  );
}

export default SeccionContactanos;
