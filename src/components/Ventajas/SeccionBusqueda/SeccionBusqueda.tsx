import './SeccionBusqueda.css';
import Image from "next/image";
import Image1 from "./image/Producto1.svg"
import Image2 from "./image/Producto2.svg"
import Image3 from "./image/Image.svg"
import icon from "./image/icon.svg"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";


function SeccionBusqueda() {

  return (
    <section className='seccion-busqueda'>
      <div className="busqueda-container">
        <div>
          <Image src={Image3} alt="Advantech Datos" />
        </div>
        <div className="informacion-card">
          <div className="informacion-imagen">
            <Image src={Image1} alt="Company Logo" />
          </div>
          <div className="informacion-texto">
            <h4 className="informacion-title">Búsqueda en Advantech Datos</h4>
            <br></br>
            <p className="informacion-text">Ventajas de buscar en Advantech datos:</p>
            <br></br>
            <div className="informacion-check">
              <Image src={icon} alt="Company Logo" className="informacion-icon" /> <p>Te permite extraer gran cantidad de datos de manera rápida y eficiente</p>
            </div>
            <div className="informacion-check">
              <Image src={icon} alt="Company Logo" className="informacion-icon" /> <p>Automatizar el proceso de recolección de datos, así ahorras tiempo y recursos</p>
            </div>
            <div className="informacion-check">
              <Image className="informacion-icon" src={icon} alt="Company Logo" /> <p>Los datos obtenidos son consistentes y estructurados con el mismo formato</p>
            </div>
            <div className="informacion-check">
              <Image className="informacion-icon" src={icon} alt="Company Logo" /> <p>Recopilar datos de múltiples fuentes y sitios web a gran escala sin la necesidad de realizar el trabajo manual</p>
            </div>
            <div className="informacion-check">
              <Image className="informacion-icon" src={icon} alt="Company Logo" /> <p>Los datos que busques son sacados en tiempo real ya que contamos con actualización constante</p>
            </div>
            <div className="informacion-check">
              <Image className="informacion-icon" src={icon} alt="Company Logo" /> <p>Nuestra herramienta accede a datos que están ocultos detrás de formularios, inicios de sesión, captchas innecesarios, etc.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="busqueda-container">
        <div className="informacion-card">
          <div className="informacion-imagen">
            <Image src={Image2} alt="Company Logo" />
          </div>
          <div className="informacion-texto">
            <h4 className="informacion-title">Búsqueda manual</h4>
            <br></br>
            <p className="informacion-text">Ventajas de una búsqueda manual:</p>
            <br></br>
            <div className="informacion-check">
              <Image src={icon} alt="Company Logo" className="informacion-icon" /> <p>Control total sobre los datos obtenidos</p>
            </div>
            <div className="informacion-check">
              <Image src={icon} alt="Company Logo" className="informacion-icon" /> <p>Menos probabilidades de violar los términos de servicio del sitio web</p>
            </div>
            <div className="informacion-check">
              <Image className="informacion-icon" src={icon} alt="Company Logo" /> <p>Adecuado para sitios web pequeños y de baja complejidad</p>
            </div>
            <br />
            <p className="informacion-text">Desventajas de una búsqueda manual:</p>
            <br />
            <div className="informacion-check">
              <Image className="informacion-icon" src={icon} alt="Company Logo" /> <p>Tiempo y esfuerzo considerable, especialmente para grandes cantidades de datos</p>
            </div>
          </div>
        </div>
        <div>
          <Image src={Image3} alt="Advantech Datos" />
        </div>
      </div>
    </section>
  );
}

export default SeccionBusqueda;
