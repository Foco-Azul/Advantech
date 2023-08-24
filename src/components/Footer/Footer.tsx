import Image from "next/image";
import './Footer.css';
import Logo from "./image/logo-advantech-datos.svg"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faTwitter, faInstagram, faYoutube, faLinkedin} from  "@fortawesome/free-brands-svg-icons";

function Footer() {

  return (
    <footer className="footer-home">
      <div>

        <div className="footer-content">
          <div className="footer-izq">
            <Link href="/" legacyBehavior passHref>
              <Image src={Logo} alt="Company Logo" width={164} height={133}/>
            </Link>
            <div className="footer-rrss">
              <Link href="https://www.linkedin.com/advantechint" legacyBehavior passHref target="_blank"><FontAwesomeIcon icon={faLinkedin} size="xl" /></Link>
              <Link href="https://twitter.com/AdvantechDatos?s=20" legacyBehavior passHref target="_blank"><FontAwesomeIcon icon={faTwitter} size="xl" /></Link>
              <Link href="https://www.facebook.com/profile.php?id=61550513552222&mibextid=2JQ9oc" legacyBehavior passHref target="_blank"><FontAwesomeIcon icon={faSquareFacebook} size="xl" /></Link>
            </div>
          </div>
          <div className="footer-home-links">    
              <div>
                <h2 className="column-title">RECURSOS</h2>
                <ul>
                    <li className="list-row"><a href='/busqueda' className="link">Buscar datos</a></li>
                    <li className="list-row"><a href='/documentacion' className="link">Documentación</a></li>
                    <li className="list-row"><a href='/uso-por-industria' className="link">Uso por industria</a></li>
                    <li className="list-row"><a href='/ventajas' className="link">Ventajas</a></li>
                    <li className="list-row"><a href='/' className="link">Monitorio uptime</a></li>
                </ul>
              </div>
              <div>
                <h2 className="column-title">ADVANTECH</h2>
                <ul>
                    <li className="list-row"><a href='/sobre-nosotros' className="link">¿Quienes somos?</a></li>
                    <li className="list-row"><a href='/contactanos' className="link">Contáctanos</a></li>
                    <li className="list-row"><a href='/unete-al-equipo' className="link">Únete al equipo</a></li>
                    <li className="list-row"><a href='/casos-de-exito' className="link">Casos de éxito</a></li>
                    <li className="list-row"><a href='/respaldo-legal' className="link">Respaldo legal</a></li>
                    <li className="list-row"><a href='/planes' className="link">Precios</a></li>
                </ul>
              </div>
              <div>
                <h2 className="column-title">MI CUENTA</h2>
                <ul>
                    <li className="list-row"><a href='/mi-cuenta' className="link">Mi cuenta</a></li>
                    <li className="list-row"><a href='/mi-cuenta' className="link">Mis datos</a></li>
                    <li className="list-row"><a href='/mi-cuenta' className="link">Historial de pagos</a></li>
                    <li className="list-row"><a href='/mi-cuenta' className="link">Saldo y uso de créditos</a></li>
                    <li className="list-row"><a href='/mi-cuenta' className="link">Historial de busquedas</a></li>
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
