import React from 'react';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './confirmar-correo.css';
import VerificarCorreo from '@/components/VerificarCorreo/VerificarCorreo';

export default function confirmarCorreo() {
  return (
    <div className="busqueda-back">
      <header className="w-full relative">
        <UserProvider>
          <NavMenu />
        </UserProvider>
      </header>
      <br />
      <br />
      <br />
      <UserProvider>
        <VerificarCorreo/>
      </UserProvider>
      <Footer />
    </div>
  );
}
