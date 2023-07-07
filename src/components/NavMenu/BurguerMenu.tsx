"use client";
import React, { useState, useRef, useEffect } from "react";
import "./BurguerMenu.css";
import Link from "next/link";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

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
        <li>¿POR QUÉ ADVANTECH?</li>
        <li>PRODUCTOS</li>
        <li>RECURSOS</li>
        <Link href="/planes" legacyBehavior passHref>
          <button className="navigation-menu-button" >NUESTROS PLANES</button>
        </Link>
        <li>NUESTROS PLANES</li>
      </ul>
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

const BurguerMenu: React.FC = () => {
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
          <ul>
            <li>¿POR QUÉ ADVANTECH?</li>
            <li>PRODUCTOS</li>
            <li>RECURSOS</li>
            <li>
              <Link href="/planes" legacyBehavior passHref>
                NUESTROS PLANES
              </Link>
            </li>
          </ul>
          <button onClick={closePopup}>Cerrar</button>
        </div>
      )}
      {isPopupOpen && <div className="overlay" onClick={closePopup} />}
    </div>
  );
};


export default BurguerMenu;
