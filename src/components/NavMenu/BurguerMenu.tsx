"use client";
import React, { useState, useRef, useEffect } from "react";
import "./BurguerMenu.css";

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

  return (
    <div className="hamburger-menu" >
      <button className="hamburger-button" onClick={togglePopup}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      {isPopupOpen && (
        <div className="overlay">
          <div className="popup">
            <ul>
              <li>¿POR QUÉ ADVANTECH?</li>
              <li>PRODUCTOS</li>
              <li>RECURSOS</li>
              <li>NUESTROS PLANES</li>
            </ul>
            <button onClick={togglePopup}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BurguerMenu;
