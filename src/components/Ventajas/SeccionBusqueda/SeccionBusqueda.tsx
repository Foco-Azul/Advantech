import './SeccionBusqueda.css';
import Image from "next/image";
import Image1 from "./image/Producto1.svg"
import Image2 from "./image/icon2.svg"
import Image3 from "./image/Image2.svg"
import Image4 from "./image/Image3.svg"
import icon from "./image/icon.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons";


function SeccionBusqueda() {

  return (
    <section className='seccion-busqueda'>
      <div className="busqueda-container advantech">
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
        <div>
          <Image src={Image4} alt="Advantech Datos" />
        </div>
      </div>
      <div className="busqueda-container">
        <div>
          <Image src={Image3} alt="Advantech Datos" />
        </div>
        <div className="informacion-card">
          <div className="informacion-imagen manual">
            <Image src={Image2} alt="Company Logo" />
          </div>
          <div className="informacion-texto">
            <h4 className="informacion-title">Búsqueda fuera de Advantech Datos</h4>
            <br></br>
            <p className="informacion-text">Al realizar una búsqueda de Advantech Datos tendrás que consultar fuentes de manera manual.</p>
            <br></br>
            <div className="informacion-check">
              <FontAwesomeIcon icon={faCircleXmark} size="lg" /><p>Tiempo y esfuerzo considerable, especialmente para grandes cantidades de datos</p>
            </div>
            <div className="informacion-check">
              <FontAwesomeIcon icon={faCircleXmark} size="lg" /><p>El proceso no será automatizado, tendrán que realizarse búsquedas cada que se las necesite tomándonos más tiempo</p>
            </div>
            <div className="informacion-check">
              <FontAwesomeIcon icon={faCircleXmark} size="lg" /><p>Al ser una obtención de manera manual la estructura y formato pueden variar</p>
            </div>
            <div className="informacion-check">
              <FontAwesomeIcon icon={faCircleXmark} size="lg" /><p>Los datos pueden estar desactualizados, dependiendo así de factores externos para obtener los datos actuales</p>
            </div>
            <div className="informacion-check">
              <FontAwesomeIcon icon={faCircleXmark} size="lg" /><p>Suele requerir la inversión de recursos humanos, lo que puede aumentar los costos operativos de una organización.</p>
            </div>
            <div className="informacion-check .desventaja">
              <FontAwesomeIcon icon={faCircleXmark} size="lg" /><p>Tiempo y esfuerzo considerable, especialmente para grandes cantidades de datos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionBusqueda;
