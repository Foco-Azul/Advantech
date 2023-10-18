"use client"
import Image from "next/image";
import './Footer.css';
import Logo from "./image/logo-advantech-datos.svg"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faTwitter, faInstagram, faYoutube, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import Loading from "./Loading";
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import { use } from "react";

function Footer() {

  const { user, error, isLoading } = useUser();

  return (
    <footer className="footer-home">
      <div>

        <div className="footer-content">
          <div className="footer-izq">
            <Link href="/" legacyBehavior passHref>
              <Image src={Logo} alt="Company Logo" width={164} height={133} />
            </Link>
            <div className="footer-rrss">
              <Link href="https://www.linkedin.com/company/advantechint/" legacyBehavior passHref ><a target="_blank"><FontAwesomeIcon icon={faLinkedin} size="xl" /></a></Link>
              <Link href="https://twitter.com/AdvantechDatos?s=20" legacyBehavior passHref ><a target="_blank"><FontAwesomeIcon icon={faTwitter} size="xl" /></a></Link>
              <Link href="https://www.facebook.com/profile.php?id=61550513552222&mibextid=2JQ9oc" legacyBehavior passHref ><a target="_blank"><FontAwesomeIcon icon={faSquareFacebook} size="xl" /></a></Link>
            </div>
          </div>
          <div className="footer-home-links">
            <div>
              <h2 className="column-title">RECURSOS</h2>
              <ul>
                <li className="list-row"><a href='/busqueda' className="link">Buscar datos</a></li>
                <li className="list-row"><a href='/documentacion' className="link">Guía de busqueda</a></li>
                <li className="list-row"><Link href='https://stats.uptimerobot.com/MqqMLIxxZQ' legacyBehavior passHref><a className="link" target="_blank">Monitorio uptime</a></Link></li>
                <li className="list-row"><a href='/uso-por-industria' className="link">Uso por industria</a></li>
                <li className="list-row"><a href='/ventajas' className="link">Ventajas</a></li>
              </ul>
            </div>
            <div>
              <h2 className="column-title">ADVANTECH</h2>
              <ul>
              <li className="list-row"><a href='/contactanos' className="link">Contáctanos</a></li>
                <li className="list-row"><a href='/sobre-nosotros' className="link">¿Quienes somos?</a></li>
                <li className="list-row"><a href='/planes' className="link">Precios</a></li>
                <li className="list-row"><a href='/respaldo-legal' className="link">Respaldo legal</a></li>
                <li className="list-row"><a href='/unete-al-equipo' className="link">Únete al equipo</a></li>
              </ul>
            </div>
            <div>
              <h2 className="column-title">MI CUENTA</h2>
              <ul>
                {user && <li className="list-row"><a href='/micuenta/?ver=api' className="link">API</a></li>}   
                <li className="list-row"><a href='/micuenta/?ver=busquedas' className="link">Historial de busquedas</a></li>
                <li className="list-row"><a href='/micuenta/?ver=compras' className="link">Historial de pagos</a></li>
                <li className="list-row"><a href='/micuenta' className="link">Mis datos</a></li>
                <li className="list-row"><a href='/micuenta/?ver=soporte' className="link">Soporte</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="footer-final">
          <p>© 2023 Derechos reservados Advantech</p>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
