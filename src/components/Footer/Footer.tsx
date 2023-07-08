import Image from "next/image";
import './Footer.css';
import Logo from "./image/logo-advantech-datos.svg"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareFacebook, faTwitter, faInstagram, faYoutube} from  "@fortawesome/free-brands-svg-icons";

function Footer() {

  return (
    <footer className="footer-home">
      <div>

        <div className="footer-content">
          <div className="footer-izq">
            <Image src={Logo} alt="Company Logo" width={164} height={133}/>
          <div className="footer-rrss">

            <Link href="#" legacyBehavior passHref><FontAwesomeIcon icon={faSquareFacebook} /></Link>
            <Link href="#" legacyBehavior passHref><FontAwesomeIcon icon={faTwitter} /></Link>
            <Link href="#" legacyBehavior passHref><FontAwesomeIcon icon={faInstagram} /></Link>
            <Link href="#" legacyBehavior passHref><FontAwesomeIcon icon={faYoutube} /></Link>
          </div>
            <div>
              <p>Duis euismod enim, facilisis risus tellus pharetra lectus diam neque. Nec ultrices mi faucibus est. Magna ullamcorper potenti elementum ultricies auctor nec volutpat augue.</p>
            </div>
          </div>
          <div className="footer-home-links">    
              <div>
                <h2 className="column-title">ADVANTECH</h2>
                <ul>
                    <li className="list-row"><a href='#' className="link">Sobre nosotros</a></li>
                    <li className="list-row"><a href='#' className="link">Contáctanos</a></li>
                    <li className="list-row"><a href='#' className="link">Únete al equipo</a></li>
                    <li className="list-row"><a href='#' className="link">Casos de éxito</a></li>
                    <li className="list-row"><a href='#' className="link">Respaldo legal</a></li>
                </ul>
              </div>
              <div>
                <h2 className="column-title">PRODUCTOS</h2>
                <ul>
                    <li className="list-row"><a href='#' className="link">Precios</a></li>
                    <li className="list-row"><a href='#' className="link">Datos por buscador</a></li>
                    <li className="list-row"><a href='#' className="link">Datos por descargas</a></li>
                    <li className="list-row"><a href='#' className="link">Datos por API</a></li>
                </ul>
              </div>
              <div>
                <h2 className="column-title">RECURSOS</h2>
                <ul>
                    <li className="list-row"><a href='#' className="link">Documentación</a></li>
                    <li className="list-row"><a href='#' className="link">Uso por industria</a></li>
                    <li className="list-row"><a href='#' className="link">Comparación con otras herramientas</a></li>
                    <li className="list-row"><a href='#' className="link">Monitorio uptime</a></li>
                </ul>
              </div>
              <div>
                <h2 className="column-title">MI CUENTA</h2>
                <ul>
                    <li className="list-row"><a href='#' className="link">Mi cuenta</a></li>
                    <li className="list-row"><a href='#' className="link">Mis datos</a></li>
                    <li className="list-row"><a href='#' className="link">Historial de pagos</a></li>
                    <li className="list-row"><a href='#' className="link">Saldo y uso de créditos</a></li>
                    <li className="list-row"><a href='#' className="link">Historial de busquedas</a></li>
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
