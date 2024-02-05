"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "./Hero.css";
//import Carousel from "./Carousel";
import MarcasClientes from '@/components/MarcasClientes/MarcasClientes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import Marca_1 from "./image/datafast.png"
import Marca_2 from "./image/diners.png"
import Marca_3 from "./image/pichincha.png"
import Bandera from "./image/bandera-ecuador.png"
import Link from "next/link";
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react';

function Hero() {
  const { user } = useUser();
  return (
    <section >
      <div className="hero-grid">
        <div className="hero-content">
        <div className="space"></div>
          <h2 className="hero-short-title">Impulsa tu organización al siguiente nivel</h2>
          <h1 className="hero-short-title">Desbloquea el potencial de los datos</h1>
          <h1 className="hero-short-title-movil">Desbloquea <br /> el potencial <br /> de los datos</h1>
           <div className="hero-buscador-contenedor">
            <Link href={"/busqueda"}><button className="hero-buscador-btn"><FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />Ingresa a nuestro buscador</button></Link>
           </div>
           <div className="space"></div>
          {/*
          <h2 className="hero-description">
          Encuentra datos públicos actualizados de personas en Ecuador  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <Image src={Bandera} alt='Advantech Datos' width={20} ></Image> con nuestro buscador en línea. <br />¡Consulta múltiples fuentes de manera sencilla!
            </h2>
          */}
          <h2 className="hero-description">
          Encuentra datos públicos actualizados de personas en Ecuador 🇪🇨
          </h2>
          <div className="space"></div>
          <a href="/api/auth/login" className={`hero-button ${user !== undefined ? 'ocultar' : ''}`}>
            Crear cuenta
          </a>
          <div className="space"></div>
          <a href="/guia-de-busqueda" className="hero-icon-container">
            ¿Cómo funciona? <ArrowRight className="hero-icon" />
          </a>
          <div className="space"></div>
          
        </div>
      </div>
    </section>
  );
}

export default Hero;
