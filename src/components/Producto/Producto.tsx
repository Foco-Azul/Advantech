import Image from "next/image";
import './Producto.css';
import Producto1 from "./image/Producto1.svg"
import Producto2 from "./image/Producto2.svg"
import icon from "./image/icon.svg"
import { ArrowRight } from "lucide-react";

function Producto() {

  return (

    <div className="producto-container">
      <br></br>
      <div className="producto-card">
        <div className="producto-imagen">
          <Image src={Producto1} alt="Company Logo" />
        </div>
        <div className="producto-texto">
          <h4 className="producto-title">Advantech Datos</h4>
          <br></br>
          <p className="producto-text">Nuestro nuevo producto, Advantech Datos, te permite acceder a datos de personas de fuentes públicas en Ecuador.</p>
          <br></br>
          <div className="producto-check">
            <Image src={icon} alt="Company Logo" className="producto-icon" /> <p>Consulta los datos de cualquier persona sin ser el titular</p>
          </div>
          <div className="producto-check">
            <Image src={icon} alt="Company Logo" className="producto-icon" /> <p>Las consultas pueden ser monetizadas</p>
          </div>
          <div className="producto-check">
            <Image className="producto-icon" src={icon} alt="Company Logo" /> <p>Datos de diversas fuentes presentados de manera automática</p>
          </div>
          <br></br>
          <a href="#" className="producto-icon-container">
            Realiza una consulta <ArrowRight className="hero-icon" />
          </a>
        </div>
      </div>
      <div className="producto-card">
        <div className="producto-imagen">
          <Image src={Producto2} alt="Company Logo" />
        </div>
        <div className="producto-texto">
          <h4 className="producto-title">Solicita una cotización personalizada </h4>
          <br></br>
          <p className="producto-text">Contamos con las herramientas y alianzas para ayudarlo a obtener sus objetivos empresariales.</p>
          <br></br>
          <div className="producto-check">
            <Image src={icon} alt="Company Logo" className="producto-icon" /> <p>Alianzas estratégicas complementan nuestra oferta de servicios</p>
          </div>
          <div className="producto-check">
            <Image src={icon} alt="Company Logo" className="producto-icon" /> <p>Las consultas pueden ser monetizadas</p>
          </div>
          <div className="producto-check">
            <Image src={icon} alt="Company Logo" className="producto-icon" /> <p>Datos de diversas fuentes presentados de manera automática</p>
          </div>
          <br></br>
          <a href="#" className="producto-icon-container">
            Agenda un demo <ArrowRight className="hero-icon" />
          </a>
        </div>
      </div>
      <br></br>
    </div>
  );
}

export default Producto;


