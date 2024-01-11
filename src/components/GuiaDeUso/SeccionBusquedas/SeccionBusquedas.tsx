"use client";
import React, { useState } from 'react';
import './SeccionBusquedas.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Imagen1 from './images/Finanzas.png';
import Imagen2 from './images/RRHH.png';
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import Link from 'next/link';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function SeccionBusquedas() {
  const [activeTab, setActiveTab] = useState('BUSQUEDA SIMPLE');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <section className='seccion-uso_de_datos'>
      <div className="uso_de_datos-container">
        <div className='productos-pestañas'>
          <button className={activeTab === 'BUSQUEDA SIMPLE' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('BUSQUEDA SIMPLE')}>BUSQUEDA SIMPLE</button>
          <button className={activeTab === 'BUSQUEDA POR LOTE' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('BUSQUEDA POR LOTE')}>BUSQUEDA POR LOTE</button>
          <button className={activeTab === 'BUSQUEDA POR API' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('BUSQUEDA POR API')}>BUSQUEDA POR API</button>
        </div>
        <div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'BUSQUEDA SIMPLE' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h4>Guia para realizar una busqueda simple</h4>
              <h2>Obteniendo datos de una persona</h2>
              <p>
                <span className="guia-subtitulo">Realizando una busqueda: </span>
                En la pestaña &ldquo;Búsqueda Simple&rdquo;, puedes llevar a cabo búsquedas sin necesidad de iniciar sesión. Tienes la opción de buscar por <strong>nombre</strong> (preferiblemente el nombre completo) o por el número de <strong>RUC</strong> (identificación de la persona).
                <br />
                Además, tendrás la opción de seleccionar las fuentes de resultados que deseas obtener, las cuales incluyen:
              </p>
                <ul>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Denuncias o noticias del delito personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Procesos Judiciales electrónicos personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Títulos Universitarios personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Representates legales y Accionistas</span></li>
                </ul>
              <p>
                <span className="guia-subtitulo">Resultados de tu Búsqueda: </span>
                Los resultados de la búsqueda por nombre pueden coincidir con más de una persona, mientras que la búsqueda por RUC te dará resultados precisos de una sola persona.
              </p>
              <p>
                <span className="guia-subtitulo">Filtrando los resultados: </span>
                Ya sea que realices la búsqueda por nombre o RUC, podrás aplicar filtros a los resultados por <strong>lugar</strong> o <strong>año</strong>. Además, tendrás la capacidad de llevar a cabo búsquedas específicas dentro de los resultados obtenidos.
              </p>
              <p>
                <span className="guia-subtitulo">Obteniendo los resultados: </span>
                Para acceder a los resultados de la búsqueda, es necesario iniciar sesión y suscribirse a un plan que incluya los <strong>créditos</strong> necesarios para descargar los datos. Dependiendo de tu plan actual, tendrás la opción de obtener los resultados en formato <strong>PDF</strong>, <strong>XLSX</strong> o <strong>CSV</strong>.
              </p>
            </div>
            <div className='imagen'>
              <Image src="/video/por-descarga.gif" width={600} height={100} alt='Advantech Datos'></Image>
            </div>
          </div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'BUSQUEDA POR LOTE' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h4>Guia para realizar una busqueda por lote</h4>
              <h2>Obteniendo datos de multiples personas</h2>
              <p>
                <span className="guia-subtitulo">Realizando una busqueda: </span>
                En la pestaña &ldquo;Búsqueda por Lote&rdquo;, primero, debes iniciar sesión y contar con un plan para poder realizar una búsqueda. En este caso, deberás cargar un archivo Excel (XLSX) que contenga únicamente <strong>nombres</strong> o números de <strong>RUC</strong> de las personas que deseas buscar.
                <br />
                Además, tendrás la opción de seleccionar las fuentes de resultados que deseas obtener, las cuales incluyen:
              </p>
                <ul>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Denuncias o noticias del delito personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Procesos Judiciales electrónicos personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Títulos Universitarios personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Representates legales y Accionistas</span></li>
                </ul>
                <Link href="https://dev.advantech.com.ec:1334/uploads/Prueba_4e7858f26d.xlsx" legacyBehavior passHref><a target="_blank" className="sobrenosotros-icon-container">Descarga nuestro Excel de ejemplo<FontAwesomeIcon icon={faArrowRight} className="hero-icon" /></a></Link>
              <p>
                <span className="guia-subtitulo">Resultados de tu Búsqueda: </span>
                Los resultados de la búsqueda por nombre pueden coincidir con más de una persona, mientras que la búsqueda por RUC te dará resultados precisos de una sola persona.
              </p>
              <p>
                <span className="guia-subtitulo">Obteniendo los resultados: </span>
                Para acceder a los resultados de la búsqueda, es necesario que inicies sesión, te suscribas a un plan y contar con los créditos requeridos para descargar los datos. Dependiendo de tu plan actual, tendrás la opción de obtener los resultados en formatos como <strong>PDF</strong>, <strong>XLSX</strong>, <strong>CSV</strong> o <strong>JSON</strong>.
              </p>
            </div>
            <div className='imagen'>
              <Image src="/video/busqueda-por-lote.gif" width={600} height={100} alt='Advantech Datos'></Image>
            </div>
          </div>
          <div className={'uso_de_datos-pestaña-contenido ' + (activeTab === 'BUSQUEDA POR API' ? 'contenido-activo' : '')}>
            <div className="seccion-titulo">
              <h4>Guia para realizar una busqueda por API</h4>
              <h2>Obteniendo datos de multiples personas</h2>
              <p>
                <span className="guia-subtitulo">Realizando una busqueda: </span>
                En la pestaña &ldquo;Búsqueda por API&rdquo;, primero, debes contar con el plan Enterprise y usar tu APIKEY para realizar una búsqueda. En este caso, podras buscar por el número de <strong>RUC</strong> de las personas que deseas buscar.
                <br />
                Además, tendrás la opción de ingresar las fuentes de resultados que deseas obtener, las cuales incluyen:
              </p>
                <ul>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Denuncias o noticias del delito personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Procesos Judiciales electrónicos personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Títulos Universitarios personales</span></li>
                  <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Representates legales y Accionistas</span></li>
                </ul>
                <Link href="https://api-dev.advantech.com.ec:3002/docs/" legacyBehavior passHref><a target="_blank" className="sobrenosotros-icon-container">Ingresa a la documentacion de la API<FontAwesomeIcon icon={faArrowRight} className="hero-icon" /></a></Link>
              <p>
                <span className="guia-subtitulo">Resultados de tu Búsqueda: </span>
                Los resultados de la búsqueda por RUC te dará resultados precisos de una sola persona.
              </p>
              <p>
                <span className="guia-subtitulo">Obteniendo los resultados: </span>
                Para acceder a los resultados de la búsqueda, es necesario contar con plan Enterprise, usar tu APIKEY y contar con los créditos requeridos para obtener los datos. Podras obtener los resultados en formato <strong>JSON</strong>.
              </p>
            </div>
            <div className='imagen'>
              <Image src="/video/por-api.gif" width={600} height={100} alt='Advantech Datos'></Image>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionBusquedas;
