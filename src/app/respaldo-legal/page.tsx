import React from 'react';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './respaldo-legal.css';
import RespaldoLegalSeccion from '@/components/RespaldoLegal/RespaldoLegalSeccion/RespaldoLegalSeccion';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Respaldo legal",
  description: "esta es una descripcion de prueba",
  openGraph: {
    images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
  }
}

export default function confirmarCorreo() {
  return (
    <div className="busqueda-back">
      <header className="w-full relative">
        <UserProvider>
          <NavMenu />
        </UserProvider>
      </header>
      <RespaldoLegalSeccion/>
      <UserProvider>
      </UserProvider>
      <Footer />
    </div>
  );
}
