import React from 'react';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './documentacion.css'
import { Metadata } from "next";
import SeccionGuiaDeUso from '@/components/GuiaDeUso/SeccionGuiaDeUso/SeccionGuiaDeUso';
import SeccionBusquedas from '@/components/GuiaDeUso/SeccionBusquedas/SeccionBusquedas';
import SeccionCreaTuCuenta from '@/components/Ventajas/SeccionCreaTuCuenta/SeccionCreaTuCuenta';


export const metadata:Metadata ={
    title:"Guia de uso",
    description:"esta es una descripcion de prueba",
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
            <SeccionGuiaDeUso/>
            <SeccionBusquedas/>
            <SeccionCreaTuCuenta/>
            <Footer/>
        </div>
    );
}

