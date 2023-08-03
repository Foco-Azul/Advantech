import React from 'react';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './unete-al-equipo.css'
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"Unete al equipo",
    description:"esta es una descripcion de prueba",
    openGraph: {
      images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    }
  }
export default function Unete_al_equipo() {
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
            <Footer/>
        </div>
    );
}

