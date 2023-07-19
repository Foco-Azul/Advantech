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
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planes",
  description: "esta es una descripcion de prueba",
  openGraph: {
    images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
  }
}

const exampleData = {
  name: 'John Doe',
  age: 30,
  email: 'johndoe@example.com'
};

export default function Busqueda() {
  const [jsonData, setJsonData] = useState(exampleData);

  const handleConvertToPdf = () => {
    const doc = new jsPDF();
    const jsonDataString = JSON.stringify(jsonData, null, 2);
    doc.text(jsonDataString, 10, 10);
    doc.save('data.pdf');
  };

  const handleConvertToXls = () => {
    const xlsData = convertToXls(jsonData);
    const blob = new Blob([xlsData], { type: 'application/vnd.ms-excel' });
    saveAs(blob, 'data.xls');
  };

  const handleConvertToCsv = () => {
    const csvData = convertToCsv(jsonData);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'data.csv');
  };

  const handleConvertToTxt = () => {
    const txtData = convertToTxt(jsonData);
    const blob = new Blob([txtData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'data.txt');
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

      <div className='busqueda-containers'>
        <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        <br></br>
        <br></br>
        <div className='busqueda-containers-buttons'>
          <button className='busqueda-menu-button' onClick={handleConvertToPdf}>Convertir a PDF</button>
          <button className='busqueda-menu-button' onClick={handleConvertToXls}>Convertir a XLS</button>
          <button className='busqueda-menu-button' onClick={handleConvertToCsv}>Convertir a CSV</button>
          <button className='busqueda-menu-button' onClick={handleConvertToTxt}>Convertir a TXT</button>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <Footer />
    </div>
  );
}


