import React from 'react';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './contactanos.css'
import { Metadata } from "next";
import SeccionContactanos from "@/components/Contactanos/SeccionContactanos/SeccionContactanos";
import SeccionEmpresas from "@/components/Contactanos/SeccionEmpresas/SeccionEmpresas";
import SeccionFormulario from "@/components/Contactanos/SeccionFormulario/SeccionFormulario";

export const metadata:Metadata ={
    title:"Contactanos",
    description:"Advantech Datos: Ponte en contacto con nuestro equipo y obtén información sobre nuestros planes a la carta, estándar, premium y enterprise. Resuelve tus consultas sobre documentación y casos de uso para tu empresa. ¡Contáctanos ahora!",
    openGraph: {
      images: ['https://dev.advantech.com.ec:1334/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    },
    keywords: "Advantech Datos"
  }
export default function Contactanos() {
    return (
        <div className="plans-back">
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <br></br>
            <br></br>
            <section className='contactanos-section'>
                <div>
                    <SeccionContactanos/>
                    <SeccionEmpresas/>
                </div>
                <div>
                    <SeccionFormulario/>
                </div>
            </section>
            <Footer/>
        </div>
    );
}

