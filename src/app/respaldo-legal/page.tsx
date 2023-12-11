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
  description: "Explora nuestros términos y condiciones, políticas de privacidad y otros documentos legales en Advantech Datos para garantizar un uso seguro y transparente de nuestros servicios. Obtén acceso a información esencial para respaldo legal y conformidad.",
  openGraph: {
    images: ['https://dev.advantech.com.ec:1334/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
  },
  keywords: ["Respaldo legal", "Terminos y condiciones", "Aviso privacidad", "Politica de Cookies", "Politicas de privacidad"]
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
