"use client";
import React, { useState, useRef, useEffect } from "react";
import "./BurguerMenu.css";
import Link from "next/link";
import Login from "../Login/Login";
import Brand from "./Brand.svg";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faXmark, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [isRecursosOpen, setRecursosOpen] = useState(false);
  const [isAdvantechOpen, setAdvantechOpen] = useState(false);

  const toggleRecursos = () => {
    setRecursosOpen(!isRecursosOpen);
    // Si también está abierto el submenú de Advantech, lo cerramos
    if (isAdvantechOpen) {
      setAdvantechOpen(false);
    }
  };

  const toggleAdvantech = () => {
    setAdvantechOpen(!isAdvantechOpen);
    // Si también está abierto el submenú de Recursos, lo cerramos
    if (isRecursosOpen) {
      setRecursosOpen(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup" ref={popupRef}>
     <ul>
        <li>RECURSOS</li>
        <li className="sub-menu"><Link href="/#" legacyBehavior passHref>Buscar datos</Link></li>
        <li className="sub-menu"><Link href="/#" legacyBehavior passHref>Documentación</Link></li>
        <li className="sub-menu"><Link href="/#" legacyBehavior passHref>Uso por industria</Link></li>
        <Link href="/sobre-nosotros" legacyBehavior passHref>
          <li>¿POR QUÉ ADVANTECH?</li>
        </Link>
        <li className="sub-menu"><Link href="/sobre-nosotros" legacyBehavior passHref>¿Quienes somos?</Link></li>
        <li className="sub-menu"><Link href="/#" legacyBehavior passHref>Contáctanos</Link></li>
        <li className="sub-menu"><Link href="/#" legacyBehavior passHref>Únete al equipo</Link></li>
        <li>
          <Link href="/planes" legacyBehavior passHref>
            NUESTROS PLANES
          </Link>
        </li>
      </ul>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

const BurguerMenu: React.FC = () => {
  const [isRecursosOpen, setRecursosOpen] = useState(false);
  const [isAdvantechOpen, setAdvantechOpen] = useState(false);

  const toggleRecursos = () => {
    setRecursosOpen(!isRecursosOpen);
    // Si también está abierto el submenú de Advantech, lo cerramos
  };

  const toggleAdvantech = () => {
    setAdvantechOpen(!isAdvantechOpen);
    // Si también está abierto el submenú de Recursos, lo cerramos
  };
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => {
    setPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="hamburger-menu">
      <button className="hamburger-button" onClick={togglePopup}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-header">
            <div className="nav-image-mobile"><Link href="/" legacyBehavior passHref><Image src={Brand} alt={"Company-Logo"} /></Link></div>
            <a onClick={closePopup}><FontAwesomeIcon icon={faXmark} size="xl" /></a>
          </div>
          <ul>
            <li className="popup-menu-title"><a onClick={toggleRecursos}>RECURSOS <span><FontAwesomeIcon icon={isRecursosOpen ? faChevronDown : faChevronRight} size="xl"/></span></a>
              {/* Aquí utilizamos la variable 'isRecursosOpen' para mostrar u ocultar el submenú */}
              {isRecursosOpen && (
              <div>
                <ul>
                  <li className="sub-menu"><Link href="/busqueda" legacyBehavior passHref>Buscar datos</Link></li>
                  <li className="sub-menu"><Link href="/guia-de-busqeuda" legacyBehavior passHref>Guía de busqueda</Link></li>
                  <li className="sub-menu"><Link href="/uso-por-industria" legacyBehavior passHref>Uso por industria</Link></li>
                </ul>
              </div>
               )}
            </li>
            <li className="popup-menu-title"><a onClick={toggleAdvantech}>¿POR QUÉ ADVANTECH? <span><FontAwesomeIcon icon={isAdvantechOpen ? faChevronDown : faChevronRight} size="xl"/></span></a>
            {isAdvantechOpen && (
              <div>
                <ul>
                  <li className="sub-menu"><Link href="/sobre-nosotros" legacyBehavior passHref>¿Quienes somos?</Link></li>
                  <li className="sub-menu"><Link href="/contactanos" legacyBehavior passHref>Contáctanos</Link></li>
                  <li className="sub-menu"><Link href="/unete-al-equipo" legacyBehavior passHref>Únete al equipo</Link></li>
                </ul>
              </div>
            )}
            </li>
            <li className="perfil">
              <Login loginname={"INGRESAR"} />
            </li>
          </ul>
          <div className="popup-footer">
            <Login loginname={"INGRESAR"} />
            <button className="navigation-menu-button" >NUESTROS PLANES</button>
          </div>
        </div>
      )}
      {isPopupOpen && <div className="overlay" onClick={closePopup} />}
    </div>
  );
};


export default BurguerMenu;
