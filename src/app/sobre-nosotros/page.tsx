import React from 'react';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import SeccionSobreNosotros from '@/components/SobreNosotros/SeccionSobreNosotros/SeccionSobreNosotros';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './planes.css'
import SeccionNuestraExperiencia from '@/components/SobreNosotros/SeccionNuestraExperiencia/SeccionNuestraExperiencia';
import SeccionProducto from '@/components/SobreNosotros/SeccionProducto/SeccionProducto';
import SeccionUneteAlEquipo from '@/components/SobreNosotros/SeccionUneteAlEquipo/SeccionUneteAlEquipo';
import SeccionObtencionDatos from '@/components/SobreNosotros/SeccionObtencionDatos/SeccionObtencionDatos';
import SeccionAliados from '@/components/SobreNosotros/SeccionAliados/SeccionAliados';
import SeccionClientes from '@/components/SobreNosotros/SeccionClientes/SeccionClientes';
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"Sobre nosotros",
    description:"Advantech Datos: Tu fuente confiable para acceder a datos de personas en Ecuador. Ofrecemos consultas de datos públicos de manera efectiva y eficiente. ¡Mejora tus procesos con nosotros!",
    openGraph: {
      images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    },
    keywords: ["Sobre nosotros"]
}

export default function Sobrenosotros() {
    return (
        <div className="plans-back">
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className='secciones-fondo'>
                <SeccionSobreNosotros />
                <br></br>
                <br></br>
                <SeccionNuestraExperiencia />
                <br></br>
                <br></br>
                <SeccionProducto />
                <br />
                <br />
            </div>
            <SeccionAliados/>
            <br></br>
            <br></br>
            <SeccionObtencionDatos/>
            <br /><br />
            <SeccionClientes/>
            <br />
            <br />
            <SeccionUneteAlEquipo />
            <Footer />
        </div>
    );
}

