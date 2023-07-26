"use client";
import React, { useState } from 'react';
import './SeccionProductos.css';
import Image from 'next/image';
import ImageEmail from "./image/image-contenido-pestaña.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

function SeccionProductos() {
  const [activeTab, setActiveTab] = useState('DATOS POR BUSCADOR');

  const handleTabClick = (tab: React.SetStateAction<string>) => {
    setActiveTab(tab);
  };

  return (
    <section className="seccion-productos">
      <div className="productos-contenido">
        <div className="productos-izq">
          <h4>Productos</h4>
          <h2>¿Quieres averiguar datos relevantes de empresas o personas?</h2>
          <p>Contamos con productos que te permitirán obtener los datos necesarios para clasificar clientes potenciales en grupos específicos en función de datos demográficos, intereses y comportamientos.</p>
        </div>
        <div className="productos-der">
          <div className='productos-pestañas'>
            <button className={activeTab === 'DATOS POR BUSCADOR' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('DATOS POR BUSCADOR')}>DATOS POR BUSCADOR</button>
            <button className={activeTab === 'DATOS POR EMAIL' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('DATOS POR EMAIL')}>DATOS POR EMAIL</button>
            <button className={activeTab === 'DATOS POR DESCARGAR' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('DATOS POR DESCARGAR')}>DATOS POR DESCARGAR</button>
            <button className={activeTab === 'DATOS POR API' ? 'pestaña-activo' : ''} onClick={() => handleTabClick('DATOS POR API')}>DATOS POR API</button>
          </div>
          <div className='productos-contenido'>
            {activeTab === 'DATOS POR BUSCADOR' && <p>contenido de la pestaña DATOS POR BUSCADOR</p>}
            {activeTab === 'DATOS POR EMAIL' && <Image src={ImageEmail} width={700} height={480} alt="advantech-email"></Image>}
            {activeTab === 'DATOS POR DESCARGAR' && <p>contenido de la pestaña DATOS POR DESCARGAR</p>}
            {activeTab === 'DATOS POR API' && <p>contenido de la pestaña DATOS POR API</p>}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionProductos;
