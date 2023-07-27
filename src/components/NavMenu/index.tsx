"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import Login from "../Login/Login";
import Brand from "./Brand.svg";
import "./NavMenu.css";
import Image from "next/image";
import BurguerMenu from "./BurguerMenu";

function NavMenu() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user, error, isLoading } = useUser();
  const [showSubRecursos, setShowSubRecursos] = useState(false); // Nuevo estado para controlar la visibilidad


  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) return (    <div className={`nav-container ${hasScrolled ? "scrolled" : ""}`}>
  <nav className={`nav ${hasScrolled ? "scrolled" : ""}`}>
    <div className="navigation-menu-container">
      <ul className="navigation-menu-list">
        <li className="navigation-menu-item">
          <a className="navigation-menu-trigger">RECURSOS</a>
        </li>
        <li className="navigation-menu-item">
          <Link href="/sobre-nosotros" legacyBehavior passHref>
            <a>¿POR QUÉ ADVANTECH?</a>
          </Link>
        </li>
      </ul>
    </div>
    <div className="nav-image">
        <Link href="/" legacyBehavior passHref>
          <Image src={Brand} alt={"Company-Logo"} />
        </Link>
      </div>
    <div className="nav-conteiner-buttons">
      <Link href="/planes" legacyBehavior passHref>
        <button className="navigation-menu-button" >NUESTROS PLANES</button>
      </Link>
      <BurguerMenu />
    </div>
  </nav>
</div>)
  if (error) return <div>{error.message}</div>;


  return (
    <div className={`nav-container ${hasScrolled ? "scrolled" : ""}`}>
      <nav className={`nav ${hasScrolled ? "scrolled" : ""}`}>
        <div className="navigation-menu-container">
          <ul className="navigation-menu-list">
          <li
              className="navigation-menu-item"
              onMouseEnter={() => setShowSubRecursos(true)} // Mostrar sub_recursos cuando el mouse está sobre "Recursos"
              onMouseLeave={() => setShowSubRecursos(false)} // Ocultar sub_recursos cuando el mouse sale de "Recursos"
            >
              <a className="navigation-menu-trigger">RECURSOS</a>
              {showSubRecursos && ( // Mostrar el div de sub_recursos cuando showSubRecursos es true
                <div className="navigation-sub_menu-trigger">
                  <ul>
                    <li><Link href="/#" legacyBehavior passHref>Buscar datos</Link></li>
                    <li><Link href="/#" legacyBehavior passHref>Documentación</Link></li>
                    <li><Link href="/#" legacyBehavior passHref>Uso por industria</Link></li>
                  </ul>
                </div>
              )}
            </li>
            <li className="navigation-menu-item">
              <Link href="/sobre-nosotros" legacyBehavior passHref>
                <a>¿POR QUÉ ADVANTECH?</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="nav-image">
            <Link href="/" legacyBehavior passHref>
              <Image src={Brand} alt={"Company-Logo"} />
            </Link>
          </div>
        <div className="nav-conteiner-buttons">
          <Login loginname={"Ingresar"} />
          <Link href="/planes" legacyBehavior passHref>
            <button className="navigation-menu-button" >NUESTROS PLANES</button>
          </Link>
          <BurguerMenu />
        </div>
      </nav>
    </div>
  );
}

export default NavMenu;
