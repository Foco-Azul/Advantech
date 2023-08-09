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
    description:"esta es una descripcion de prueba",
    openGraph: {
      images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    }
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

