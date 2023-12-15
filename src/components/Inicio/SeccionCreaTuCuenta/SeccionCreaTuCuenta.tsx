"use client";
import Image from "next/image";
import './SeccionCreaTuCuenta.css'
import ImageGrafico from "./image/grafico.svg"
import Link from "next/link";
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react';

function SeccionCreaTuCuenta() {
    const { user } = useUser();
    return (
        <section className={`seccion-crea-tu-cuenta ${user != undefined ? 'ocultar' : ''}`}>
            <div>
                <div className="crea-tu-cuenta">
                    <div className="content-izq">
                        <h4>Crea tu cuenta gratuita</h4>
                        <h2>Consulta los datos de miles de personas</h2>
                        <p>Obtén datos de varias fuentes de consulta personas manera automática y rápida sin ser el titular de la información.</p>
                        <a href={"/api/auth/login"}><button className="hero-button">Crear cuenta</button></a>
                    </div>
                    <div>
                        <Image src={ImageGrafico} alt="Logo" width={352} height={277}></Image>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeccionCreaTuCuenta;

