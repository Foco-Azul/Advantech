"use client";
import React, { useState } from 'react';
import './SeccionUsoDeDatos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Imagen from './imagen.svg'
import { faCircleCheck} from "@fortawesome/free-regular-svg-icons";


function SeccionUsoDeDatos() {
  const [activeTab, setActiveTab] = useState('FINANZAS');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <section className='seccion-uso_de_datos'>
      <div className="uso_de_datos-container">
        <div className='productos-pestañas'>
          <button className={activeTab === 'FINANZAS' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('FINANZAS')}>FINANZAS</button>
          <button className={activeTab === 'RECURSOS HUMANOS' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('RECURSOS HUMANOS')}>RECURSOS HUMANOS</button>
        </div>
        <div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'FINANZAS' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h4>Uso de datos en Finanzas</h4>
              <h2>Evaluación crediticia</h2>
              <p>
                El uso de datos públicos en el sector de las finanzas es una práctica cada vez más común y valiosa para diversas empresas e instituciones financieras. Estos datos pueden ser utilizados para una variedad de propósitos en el sector financiero, tales como análisis de mercado, toma de decisiones de inversión, gestión de riesgos y creación de productos y servicios financieros.
              </p>
              <p>Aquí te presento algunas formas en las que se utilizan los datos públicos en el sector de las finanzas:</p>
              <ul>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Análisis de mercado</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Información de empresas</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Evaluación de riesgos</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Cumplimiento regulatorio</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Investigación financiera y predicción</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Desarrollo de productos y servicios financieros</span></li>
              </ul>
            </div>
            <div className='imagen'>
              <Image src={Imagen} alt='Advantech Datos'></Image>
            </div>
          </div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'RECURSOS HUMANOS' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h4>Uso de datos en RRHH</h4>
              <h2>Evaluación de personal</h2>
              <p>Atenderemos con gusto a todas tus consultas y te ayudaremos a poder adquirir nuestros planes.</p>
              <ul>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Obtén una mejor explicación sobre nuestros planes</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Realiza consultas sobre nuestra documentación</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Descubre los casos de uso para tu empresa</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Evaluación de riesgos</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Evaluación de riesgos</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Evaluación de riesgos</span></li>
              </ul>
            </div>
            <div className='imagen'>
              <Image src={Imagen} alt='Advantech Datos'></Image>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionUsoDeDatos;
