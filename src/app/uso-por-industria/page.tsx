import React from 'react';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './uso-por-industria.css'
import { Metadata } from "next";
import SeccionUsoPorIndustria from "@/components/UsoPorIndustria/SeccionUsoPorIndustria/SeccionUsoPorIndustria";
import SeccionUsoDeDatos from "@/components/UsoPorIndustria/SeccionUsoDeDatos/SeccionUsoDeDatos";
import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";

export const metadata:Metadata ={
    title:"Uso por industria",
    description:"Advantech Datos: Descubre cómo aprovechar el uso de datos en diferentes industrias. Obtén información sobre evaluación crediticia en finanzas y la gestión del talento en recursos humanos. Regístrate ahora y accede a miles de datos de personas de manera rápida y automática.",
    openGraph: {
      images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    }
  }
export default function UsoPorIndustria() {
    return (
        <div className="plans-back">
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <div className='secciones-fondo'>
            <SeccionUsoPorIndustria/>
            <SeccionUsoDeDatos/>
            </div>
            <SeccionCreaTuCuenta/>
            <Footer/>
        </div>
    );
}

