"use client"

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './busqueda.css';
import SearchComponent from '@/components/SearchComponent/SearchComponent';

const exampleData = {
  name: '',
  age: 0,
  email: ''
};

export default function Busqueda() {
  const [jsonData, setJsonData] = useState(exampleData);
  const [showDownloadButtons, setShowDownloadButtons] = useState(false); // Estado para controlar si se muestran los botones de descarga
  const [inputData, setInputData] = useState(exampleData); // Estado para almacenar los datos del input

  // Función para simular el llamado a la API y obtener los datos
  const fetchFakeData = async () => {
    // Simulamos una pequeña espera para simular la solicitud a la API
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Aquí puedes realizar una solicitud real utilizando fetch a una API
    // Por ahora, usaremos datos ficticios
    const fakeApiResponse = { data: { ...inputData } };
    return fakeApiResponse;
  };

  // Función para manejar el cambio en el input
  const handleInputChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setInputData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSearch = () => {
    setShowDownloadButtons(false); // Ocultar los botones de descarga mientras se realiza la búsqueda
    fetchFakeData()
      .then(responseData => {
        setJsonData(responseData.data); // Actualizar los datos con la respuesta de la API
        setShowDownloadButtons(true); // Mostrar los botones de descarga después de una búsqueda exitosa
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShowDownloadButtons(false); // Asegurarse de que los botones de descarga no se muestren en caso de error
      });
  };

  const handleConvertToPdf = () => {
    // Simular llamado a la API y descargar los datos como PDF
    fetchFakeData()
      .then(responseData => {
        const doc = new jsPDF();
        const jsonDataString = JSON.stringify(responseData.data, null, 2);
        doc.text(jsonDataString, 10, 10);
        doc.save('data.pdf');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleConvertToXls = () => {
    // Simular llamado a la API y descargar los datos como XLS
    fetchFakeData()
      .then(responseData => {
        const xlsData = convertToXls(responseData.data);
        const blob = new Blob([xlsData], { type: 'application/vnd.ms-excel' });
        saveAs(blob, 'data.xls');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleConvertToCsv = () => {
    // Simular llamado a la API y descargar los datos como CSV
    fetchFakeData()
      .then(responseData => {
        const csvData = convertToCsv(responseData.data);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'data.csv');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleConvertToTxt = () => {
    // Simular llamado a la API y descargar los datos como TXT
    fetchFakeData()
      .then(responseData => {
        const txtData = convertToTxt(responseData.data);
        const blob = new Blob([txtData], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'data.txt');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const convertToXls = (data: any) => {
    // Implementa tu lógica de conversión a XLS aquí
    // Este es un ejemplo básico que convierte el JSON a un formato XLS simple
    let xlsData = 'data:text/csv;charset=utf-8,';
    const keys = Object.keys(data);
    const values = Object.values(data);
    xlsData += keys.join(',') + '\n';
    xlsData += values.join(',') + '\n';
    return xlsData;
  };

  const convertToCsv = (data: any) => {
    // Implementa tu lógica de conversión a CSV aquí
    // Este es un ejemplo básico que convierte el JSON a un formato CSV simple
    let csvData = '';
    const keys = Object.keys(data);
    const values = Object.values(data);
    csvData += keys.join(',') + '\n';
    csvData += values.join(',') + '\n';
    return csvData;
  };

  const convertToTxt = (data: any) => {
    // Implementa tu lógica de conversión a archivo de texto aquí
    // Este es un ejemplo básico que convierte el JSON a un formato de texto simple
    let txtData = '';
    const keys = Object.keys(data);
    const values = Object.values(data);
    for (let i = 0; i < keys.length; i++) {
      txtData += keys[i] + ': ' + values[i] + '\n';
    }
    return txtData;
  };

  return (
    <div className="busqueda-back">
      <header className="w-full relative">
        <UserProvider>
          <NavMenu />
        </UserProvider>
      </header>
      <br></br>
      <br></br>
      <br></br>
      <h2 className="busqueda-h2">REALIZA LA BÚSQUEDA DE DATOS</h2>
      <h1 className="busqueda-h1">Puedes descargarlos en distintos formatos</h1>
      <br></br>
      <br></br>

      <div className='busqueda-containers'>

        {/* Agregar el input para ingresar datos */}
        {/* <div className='busqueda-input-container'>
          <input
            type="text"
            name="name"
            className='busqueda-inputs'
            value={inputData.name}
            onChange={handleInputChange}
            placeholder="Nombre"
          />
          <input
            type="number"
            name="age"
            className='busqueda-inputs'
            value={inputData.age}
            onChange={handleInputChange}
            placeholder="Edad"
          />
          <input
            type="text"
            name="email"
            className='busqueda-inputs'
            value={inputData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
        </div> */}

        <div className='busqueda-containers-buttons'>
          {/* Mostrar el botón de búsqueda */}

          {/* Mostrar los botones de descarga solo si la búsqueda es exitosa */}
          {showDownloadButtons && (
            <>
              {/* <button className='busqueda-menu-button' onClick={handleConvertToPdf}>Convertir a PDF</button>
              <button className='busqueda-menu-button' onClick={handleConvertToXls}>Convertir a XLS</button>
              <button className='busqueda-menu-button' onClick={handleConvertToCsv}>Convertir a CSV</button>
              <button className='busqueda-menu-button' onClick={handleConvertToTxt}>Convertir a TXT</button> */}
            </>
          )}
        </div>
        {/* <button className='busqueda-menu-button' onClick={handleSearch}>Realizar búsqueda</button> */}
      </div>

      <UserProvider>
        <SearchComponent/>
      </UserProvider>
      <Footer />
    </div>
  );
}
