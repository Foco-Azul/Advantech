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
              <p>
                En el sector de Recursos Humanos (RRHH), el uso de datos públicos puede ser valioso para diversas actividades relacionadas con la gestión de talento y el desarrollo de estrategias para la fuerza laboral de una empresa. <br /><br />
                A continuación, te muestro algunas formas en las que se utilizan los datos públicos en el sector de RRHH:
              </p>
              <ul>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Búsqueda y reclutamiento de talento</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Validación de información del candidato</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Evaluación de cultura y fit cultural</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Análisis de mercado laboral</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Planificación de la sucesión y desarrollo profesional</span></li>
                <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Investigación de antecedentes: laboral y educativo, y obtener información adicional que pueda ser relevante para la toma de decisiones de contratación</span></li>
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
