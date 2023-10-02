import React from 'react';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './ventajas.css'
import { Metadata } from "next";
import SeccionVentajas from '@/components/Ventajas/SeccionVentajas/SeccionVentajas';
import SeccionBusqueda from '@/components/Ventajas/SeccionBusqueda/SeccionBusqueda';
import SeccionCreaTuCuenta from '@/components/Ventajas/SeccionCreaTuCuenta/SeccionCreaTuCuenta';


export const metadata:Metadata ={
    title:"Ventajas",
    description:"Advantech Datos: Optimiza tu tiempo y recursos con nuestra herramienta de búsqueda de datos. Extrae información rápida y eficientemente, automatiza la recopilación de datos, garantiza la consistencia y estructura de los datos, y accede a información en tiempo real. Descubre las ventajas de utilizar Advantech para tomar decisiones basadas en evidencia y mejorar la productividad.",
    openGraph: {
      images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    }
  }
export default function Planes() {
    return (
        <div className="plans-back">
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <br></br>
            <br></br>
            <SeccionVentajas/>
            <SeccionBusqueda/>
            <SeccionCreaTuCuenta/>
            <Footer/>
        </div>
    );
}

