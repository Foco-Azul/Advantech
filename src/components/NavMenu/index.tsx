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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { usePathname } from 'next/navigation'
import Loading from "@/components/Loading/Loading";

function NavMenu() {
  const pathname = usePathname()
  const [hasScrolled, setHasScrolled] = useState(false);
  const { user, error, isLoading } = useUser();
  const [showSubRecursos, setShowSubRecursos] = useState(false); // Nuevo estado para controlar la visibilidad
  const [showSubAdvantech, setShowSubAdvantech] = useState(false); // Nuevo estado para controlar la visibilidad

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
          <Link href="/sobre-nosotros" legacyBehavior passHref><a>¿POR QUÉ ADVANTECH?</a></Link>
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
  <Loading/>
</div>)
  if (error) return <div>{error.message}</div>;


  return (
    <>
    <div className={`nav-container ${hasScrolled ? "scrolled" : ""}`}>
        <nav className={`nav ${hasScrolled ? "scrolled" : ""}`}>
          <div className="navigation-menu-container">
            <ul className="navigation-menu-list">
              <li
                className="navigation-menu-item"
                onMouseEnter={() => setShowSubRecursos(true)} // Mostrar sub_recursos cuando el mouse está sobre "Recursos"
                onMouseLeave={() => setShowSubRecursos(false)} // Ocultar sub_recursos cuando el mouse sale de "Recursos"
              >
                <a className="navigation-menu-trigger">RECURSOS <FontAwesomeIcon icon={showSubRecursos ? faChevronUp : faChevronDown} /></a>
                <div className={`navigation-sub_menu-trigger  ${showSubRecursos ? "visible" : ""} `}>
                  <ul>
                    <li><a href="/busqueda">Buscar datos</a></li>
                    <li><a href="/guia-de-busqeuda">Guía de busqueda</a></li>
                    <li><a href="/uso-por-industria">Uso por industria</a></li>
                  </ul>
                </div>
              </li>
              <li
                className="navigation-menu-item"
                onMouseEnter={() => setShowSubAdvantech(true)} // Mostrar sub_recursos cuando el mouse está sobre "Recursos"
                onMouseLeave={() => setShowSubAdvantech(false)} // Ocultar sub_recursos cuando el mouse sale de "Recursos"
              >
                <a className="navigation-menu-trigger">¿POR QUÉ ADVANTECH? <FontAwesomeIcon icon={showSubAdvantech ? faChevronUp : faChevronDown} /></a>
                <div className={`navigation-sub_menu-trigger  ${showSubAdvantech ? "visible" : ""} `}>
                  <ul>
                    <li><a href="/sobre-nosotros">¿Quienes somos?</a></li>
                    <li><a href="/contactanos">Contáctanos</a></li>
                    <li><a href="/unete-al-equipo">Únete al equipo</a></li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className="nav-image">
            <Link href="/" legacyBehavior passHref>
              <Image src={Brand} alt={"Company-Logo"} />
            </Link>
          </div>
          <div className="nav-conteiner-buttons">
            {pathname != "/" && (
              <Link href="/busqueda" passHref className="btn-buscar"><button><FontAwesomeIcon icon={faMagnifyingGlass} /> &nbsp; <span>BUSCAR</span></button></Link>
            )}
            <div className="login-escritorio"><Login loginname={"INGRESAR"} /></div>
            <Link href="/planes" legacyBehavior passHref>
              <button className="navigation-menu-button">NUESTROS PLANES</button>
            </Link>
            <BurguerMenu />
          </div>
        </nav>
      </div></>
  );
}

export default NavMenu;
