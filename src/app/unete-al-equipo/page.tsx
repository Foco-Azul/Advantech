import React from 'react';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './unete-al-equipo.css'
import { Metadata } from "next";
import SeccionUneteAlEquipo from "@/components/UneteAlEquipo/SeccionUneteAlEquipo/SeccionUneteAlEquipo";
import SeccionBeneficios from "@/components/UneteAlEquipo/SeccionBeneficios/SeccionBeneficios";
import SeccionFormulario from "@/components/UneteAlEquipo/SeccionFormulario/SeccionFormulario";

export const metadata:Metadata ={
    title:"Unete al equipo",
    description:"Únete al equipo de Advantech Datos, una empresa en crecimiento que se dedica al análisis y transformación de datos. Si eres apasionado por el mundo de los datos y buscas oportunidades de trabajo remoto con flexibilidad y un gran ambiente laboral, ¡envíanos tu postulación hoy mismo!",
    openGraph: {
      images: ['https://dev.advantech.com.ec:1334/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    },
    keywords: "Unete al equipo"
  }
export default function UneteAlEquipo() {
    return (
        <div className="plans-back">
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <br></br>
            <br></br>
            <SeccionUneteAlEquipo/>
            <SeccionBeneficios/>
            <SeccionFormulario/>
            <Footer/>
        </div>
    );
}

