import React from 'react';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import SobreNosotros from '@/components/SobreNosotros/SobreNosotros';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../app/globals.css"
import './planes.css'
import NuestraExperiencia from '@/components/NuestraExperiencia/NuestraExperiencia';
import Producto from '@/components/Producto/Producto';
import SeccionCreaTuCuenta from '@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta';
import ObtencionDatos from '@/components/ObtencionDatos/ObtencionDatos';
import { Metadata } from "next";

export const metadata:Metadata ={
    title:"Sobre nosotros",
    description:"esta es una descripcion de prueba"
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
            <SobreNosotros />
            <br></br>
            <br></br>
            <NuestraExperiencia />
            <br></br>
            <br></br>
            <Producto />
            <br></br>
            <br></br>
            <SeccionCreaTuCuenta />
            <br></br>
            <br></br>
            <ObtencionDatos></ObtencionDatos>
            <Footer />
        </div>
    );
}

