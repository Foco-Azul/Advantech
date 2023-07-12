"use client";
import React, { useState } from 'react';
import './SeccionProductos.css';
import Image from 'next/image';
import ImageEmail from "./image/imagen-email.svg"

function SeccionProductos() {
  const [isOpen, setIsOpen] = useState([false, false, false, false]);

  const toggleAccordion = (index: number) => {
    setIsOpen((prevState) => {
      const updatedState = prevState.map((state, i) => (i === index ? !state : false));
      return updatedState;
    });
  };

  return (
    <section className="seccion-productos">
      <div className="productos-contenido">
        <div className="productos-izq">
          <h4>Productos</h4>
          <h2>¿Necesitas datos para llegar a tu público objetivo?</h2>
          <p>Contamos con productos que te permitirán obtener los datos necesarios para clasificar clientes potenciales en grupos específicos en función de datos demográficos, intereses y comportamientos.</p>
        </div>
        <div className="productos-der">
          <div className={`acordeon ${isOpen[0] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(0)}>
              <h3>Datos por email</h3>
            </div>
            <div className="acordeon-contenido">
              <Image src={ImageEmail} width={150} height={150} alt='advantech-email'></Image>
              <p>Vitae varius euismod egestas egestas lacus. Augue vitae arcu sollicitudin metus iaculis amet, eu at amet. Netus pulvinar tristique ridiculus sed. Viverra ut viverra aenean nisl. Tortor lorem cum congue a. Orci mattis massa tortor magna massa nisi, aliquet risus. Ornare cras aenean pellentesque quam pulvinar at. Libero mollis tortor erat sed. Adipiscing lectus nisi commodo vel. Id augue vitae, hendrerit iaculis.</p>
            </div>
          </div>

          <div className={`acordeon ${isOpen[1] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(1)}>
              <h3>Datos por email</h3>
            </div>
            <div className="acordeon-contenido">
              <p>Vitae varius euismod egestas egestas lacus. Augue vitae arcu sollicitudin metus iaculis amet, eu at amet. Netus pulvinar tristique ridiculus sed. Viverra ut viverra aenean nisl. Tortor lorem cum congue a. Orci mattis massa tortor magna massa nisi, aliquet risus. Ornare cras aenean pellentesque quam pulvinar at. Libero mollis tortor erat sed. Adipiscing lectus nisi commodo vel. Id augue vitae, hendrerit iaculis.</p>
            </div>
          </div>

          <div className={`acordeon ${isOpen[2] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(2)}>
              <h3>Datos por email</h3>
            </div>
            <div className="acordeon-contenido">
              <p>Vitae varius euismod egestas egestas lacus. Augue vitae arcu sollicitudin metus iaculis amet, eu at amet. Netus pulvinar tristique ridiculus sed. Viverra ut viverra aenean nisl. Tortor lorem cum congue a. Orci mattis massa tortor magna massa nisi, aliquet risus. Ornare cras aenean pellentesque quam pulvinar at. Libero mollis tortor erat sed. Adipiscing lectus nisi commodo vel. Id augue vitae, hendrerit iaculis.</p>
            </div>
          </div>

          <div className={`acordeon ${isOpen[3] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(3)}>
              <h3>Datos por email</h3>
            </div>
            <div className="acordeon-contenido">
              <p>Vitae varius euismod egestas egestas lacus. Augue vitae arcu sollicitudin metus iaculis amet, eu at amet. Netus pulvinar tristique ridiculus sed. Viverra ut viverra aenean nisl. Tortor lorem cum congue a. Orci mattis massa tortor magna massa nisi, aliquet risus. Ornare cras aenean pellentesque quam pulvinar at. Libero mollis tortor erat sed. Adipiscing lectus nisi commodo vel. Id augue vitae, hendrerit iaculis.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionProductos;
