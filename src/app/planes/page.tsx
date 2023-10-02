import React from 'react';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './planes.css'
import { Metadata } from "next";
import SeccionTablaPlanes from '@/components/Planes/SeccionTablaPlanes/SeccionTablaPlanes';
import SeccionFuncionalidades from '@/components/Planes/SeccionFuncionalidades/SeccionFuncionalidades';
import SeccionTiposConsultas from '@/components/Planes/SeccionTiposConsultas/SeccionTiposConsultas';
import SeccionPreguntas from '@/components/Planes/SeccionPreguntas/SeccionPreguntas';
import SeccionEmpresas from '@/components/Planes/SeccionEmpresas/SeccionEmpresas';
import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";

export const metadata:Metadata ={
    title:"Planes",
    description:"Descubre nuestros planes de suscripción para acceder a datos valiosos. Elige entre Personalizado, Standard, Premium y Enterprise. Obtén créditos, soporte personalizado y entrega de datos en varios formatos. ¡Conoce más sobre nuestras funcionalidades y tipos de consultas!",
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
            <h2 className="plans2-h2">PRECIOS</h2>
            <h1 className="plans2-h1">Planes flexibles que se adaptan a tu necesidad de datos</h1>
            <UserProvider>
                <SubscriptionComponent />
            </UserProvider>
            <SeccionTablaPlanes/>
            <SeccionFuncionalidades/>
            <SeccionTiposConsultas/>
            <SeccionPreguntas/>
            <SeccionEmpresas/>
            <SeccionCreaTuCuenta/>
            <Footer/>
        </div>
    );
}

