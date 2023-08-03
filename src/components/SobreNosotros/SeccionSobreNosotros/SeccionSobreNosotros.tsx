import Image from "next/image";
import './SeccionSobreNosotros.css';
import Gif from "./image/SobreNosotros.gif"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";

function SobreNosotros() {

  return (
    <div className="sobrenosotros-container">
      <div className="sobrenosotros-columna1">
        <h1 className="sobrenosotros-title">Sobre nosotros</h1>
        <br></br>
        <h2 className="sobrenosotros-subtitle">Brindamos innovación a compañías que buscan mejorar sus procesos</h2>
        <br></br>
        <p className="sobrenosotros-text">Armados con las tecnologías más avanzadas, nuestro compromiso es obtener el mayor valor de sus datos, de cualquier manera que se presenten, continuamente.</p>
        <br></br>
        <button className="sobrenosotros-button">Nuestra experiencia</button>
        <br></br>
        <Link href="#" legacyBehavior passHref><a className="sobrenosotros-icon-container">¿Cómo obtenemos datos?<FontAwesomeIcon icon={faArrowRight} className="hero-icon"/></a></Link>

      </div>
      <div className="sobrenosotros-columna2">
        <Image src={Gif} alt="Company Logo" />
      </div>
    </div>
  );
}

export default SobreNosotros;