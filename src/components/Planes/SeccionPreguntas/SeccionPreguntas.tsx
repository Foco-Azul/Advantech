"use client";
import React, { useState } from 'react';
import './SeccionPreguntas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function SeccionPreguntas() {
  const [isOpen, setIsOpen] = useState([false, false, false, false]);

  const toggleAccordion = (index: number) => {
    setIsOpen((prevState) => {
      const updatedState = prevState.map((state, i) => (i === index ? !state : false));
      return updatedState;
    });
  };

  return (
    <section className="seccion-preguntas">
      <div className="seccion-preguntas-contenido">
        <div className="seccion-titulo">
          <h4>Preguntas frecuentes</h4>
          <h2>Aprende más sobre cómo funcionan nuestros planes</h2>
        </div>
        <div className="desplegables-preguntas">
          <div className={`acordeon ${isOpen[0] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(0)}>
              <h3>¿Qué significa el uso de un crédito?</h3>
              <FontAwesomeIcon icon={isOpen[0] ? faChevronUp : faChevronDown} />
            </div>
            <div className="acordeon-contenido">
              <p>Vitae varius euismod egestas egestas lacus. Augue vitae arcu sollicitudin metus iaculis amet, eu at amet. Netus pulvinar tristique ridiculus sed. Viverra ut viverra aenean nisl. Tortor lorem cum congue a. Orci mattis massa tortor magna massa nisi, aliquet risus. Ornare cras aenean pellentesque quam pulvinar at. Libero mollis tortor erat sed. Adipiscing lectus nisi commodo vel. Id augue vitae, hendrerit iaculis.</p>
            </div>
          </div>

          <div className={`acordeon ${isOpen[1] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(1)}>
              <h3>¿Qué sucede si sobrepaso el uso de mis créditos?</h3>
              <FontAwesomeIcon icon={isOpen[1] ? faChevronUp : faChevronDown} />
            </div>
            <div className="acordeon-contenido">
              <p>
                Los créditos se van a encontrar en una billetera personal, la cual va a permanecer activa siempre y cuando tenga la suscripción activa, una vez pasado el tiempo de suscripción, el usuario tiene que renovar el plan, para poder acceder nuevamente a sus créditos, en caso de haber quedado en la billetera créditos sin usar, estos se suman a los nuevos créditos del plan de suscripción. En caso de que te consumas los créditos y todavía te quede tiempo de suscripción, podes comprar nuevamente el mismo plan, hacer un upgrade, o elegir el plan que mas te convenga para obtener nuevamente créditos.
              </p>
            </div>
          </div>

          <div className={`acordeon ${isOpen[2] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(2)}>
              <h3>¿Cuál es la diferencia de los planes de soporte?</h3>
              <FontAwesomeIcon icon={isOpen[2] ? faChevronUp : faChevronDown} />
            </div>
            <div className="acordeon-contenido">
              <p>Vitae varius euismod egestas egestas lacus. Augue vitae arcu sollicitudin metus iaculis amet, eu at amet. Netus pulvinar tristique ridiculus sed. Viverra ut viverra aenean nisl. Tortor lorem cum congue a. Orci mattis massa tortor magna massa nisi, aliquet risus. Ornare cras aenean pellentesque quam pulvinar at. Libero mollis tortor erat sed. Adipiscing lectus nisi commodo vel. Id augue vitae, hendrerit iaculis.</p>
            </div>
          </div>

          <div className={`acordeon ${isOpen[3] ? 'abierto' : ''}`}>
            <div className="acordeon-cabecera" onClick={() => toggleAccordion(3)}>
              <h3>¿Cómo se renueva mi suscripción?</h3>
              <FontAwesomeIcon icon={isOpen[3] ? faChevronUp : faChevronDown} />
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

export default SeccionPreguntas;
