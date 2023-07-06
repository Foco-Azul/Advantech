"use client";

import * as React from "react";
import Link from "next/link";
import { useUser } from '@auth0/nextjs-auth0/client';
import Login from "../Login/Login";
import Brand from "./Brand.svg";
import "./NavMenu.css";
import Image from "next/image";
import BurguerMenu from "./BurguerMenu";

function NavMenu() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <nav className="nav">
      <div className="navigation-menu-container">
        <div className="nav-image">
          <Image src={Brand} alt={"Company-Logo"} />
        </div>
        <ul className="navigation-menu-list">
          <li className="navigation-menu-item">
            <Link href="/docs" legacyBehavior passHref>
              <a >¿POR QUÉ ADVANTECH?</a>
            </Link>
          </li>
          <li className="navigation-menu-item">
            <a className="navigation-menu-trigger">PRODUCTOS</a>
          </li>
          <li className="navigation-menu-item">
            <a className="navigation-menu-trigger">RECURSOS</a>
          </li>
        </ul>
      </div>
      <div className="nav-conteiner-buttons">
        <Login loginname={"Ingresar"} />
        <button className="navigation-menu-button">NUESTROS PLANES</button>
        <BurguerMenu />
      </div>

    </nav>
  );
}

export default NavMenu;
