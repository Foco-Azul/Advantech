"use client";
import React, { useState } from 'react';
import './SeccionBusquedas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Imagen1 from './images/Finanzas.png';
import Imagen2 from './images/RRHH.png';
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";

function SeccionBusquedas() {
  const [activeTab, setActiveTab] = useState('FINANZAS');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <section className='seccion-uso_de_datos'>
      <div className="uso_de_datos-container">
        <div className='productos-pestañas'>
          <button className={activeTab === 'FINANZAS' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('FINANZAS')}>BUSQUEDA SIMPLE</button>
          <button className={activeTab === 'RECURSOS HUMANOS' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('RECURSOS HUMANOS')}>BUSQUEDA POR LOTE</button>
        </div>
        <div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'FINANZAS' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h4>Guia para realizar una busqueda simple</h4>
              <h2>Obteniendo datos de una persona</h2>
              <p>
                <span className="guia-subtitulo">Realizando una busqueda: </span>
                En la pestaña de Búsqueda Simple, puedes realizar búsquedas sin necesidad de estar logueado. Puedes buscar por <strong>nombre</strong> (preferiblemente nombre completo) o por <strong>RUC</strong> (identificación de la persona).
                <br />
                Ademas puedes elegir las fuentes de los resultados que desees obtener, entre ellas estan:
                <ul>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Denuncias o noticias del delito personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Procesos Judiciales electrónicos personales</span></li>
                </ul>
              </p>
              <p>
                <span className="guia-subtitulo">Resultados de mi busqueda: </span>
                Los resultados de la búsqueda por nombre pueden coincidir con más de una persona, mientras que la búsqueda por RUC te dará resultados precisos de una sola persona.
              </p>
              <p>
                <span className="guia-subtitulo">Filtrando los resultados: </span>
                Independientemente de si realizas la búsqueda por <strong>nombre</strong> o <strong>RUC</strong>, podras filtrar los resultados por <strong>lugar</strong> o <strong>año</strong>. Además, podras realizar búsquedas específicas dentro de los resultados obtenidos 
              </p>
              <p>
                <span className="guia-subtitulo">Obteniendo los resultados: </span>
                Para acceder a los resultados de la búsqueda, es necesario iniciar sesión y suscribirse a un plan que incluya los <strong>créditos</strong> necesarios para descargar los datos. Dependiendo de tu plan actual, tendrás la opción de obtener los resultados en formato <strong>PDF</strong>, <strong>XLSX</strong> o <strong>CSV</strong>.
              </p>
            </div>
            <div className='imagen'>
              <video src="https://admin.advantech.com.ec/uploads/video.mp4" controls></video>
            </div>
          </div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'RECURSOS HUMANOS' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h4>Tutorial de Búsqueda por Lote</h4>
              <h2>Evaluación de personal</h2>
              <p>
                En la pestaña de Búsqueda por Lote, puedes realizar búsquedas más extensas relacionadas con la gestión de talento y estrategias de recursos humanos.
              </p>
              <p>Aquí tienes algunos pasos para realizar una búsqueda por lote:</p>
              <ol>
                <li>Selecciona la pestaña "Búsqueda por Lote".</li>
                <li>Inicia sesión en tu cuenta (si es necesario).</li>
                <li>Sube un archivo CSV con los datos de las personas que deseas buscar.</li>
                <li>Especifica los criterios de búsqueda si es necesario.</li>
                <li>Procesa la búsqueda por lote.</li>
                <li>Obtén y revisa los resultados para tomar decisiones informadas en la gestión de talento.</li>
              </ol>
            </div>
            <div className='imagen'>
              <video src="https://admin.advantech.com.ec/uploads/video.mp4" controls></video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionBusquedas;
