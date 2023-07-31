import './SeccionObtencionDatos.css';
import Image from "next/image";
import Archive from "./Archive.svg"
import Datos from "./Datos.png"


function ObtencionDatos() {

  return (
    <div className="obtenciondatos-container">
      <br></br>
      <div className="obtenciondatos-image">
        <Image src={Datos} alt="Datos" />
      </div>
      <div  className="obtenciondatos-description">
        <h2 className="obtenciondatos-title">Obtención de datos</h2>
        <br></br>
        <h3 className="obtenciondatos-subtitle">Distintas fuentes para contar un registro más completo</h3>
        <br></br>
        <p className="obtenciondatos-text">Consultamos datos de distintas fuentes públicas para que puedas obtener mejores resultados en tus búsquedas. Aseguramos que estos sean fiables y actualizados periódicamente.</p>
        <br></br>
        <div className="obtenciondatos-items-container">
          <div className="obtenciondatos-column">
            <div className="obtenciondatos-items">
              <Image src={Archive} alt="Company Logo" className="obtenciondatos-archive-icon" /> <p>Consejo de la Judicatura</p>
            </div>
            <div className="obtenciondatos-items">
              <Image src={Archive} alt="Company Logo" className="obtenciondatos-archive-icon" /> <p>Senescrypt</p>
            </div>
            <div className="obtenciondatos-items">
              <Image src={Archive} alt="Company Logo" className="obtenciondatos-archive-icon" /> <p>Fiscalía general del Estado</p>
            </div>
          </div>
          <div className="obtenciondatos-column">
            <div className="obtenciondatos-items">
              <Image src={Archive} alt="Company Logo" className="obtenciondatos-archive-icon" /> <p>SRI</p>
            </div>
            <div className="obtenciondatos-items">
              <Image src={Archive} alt="Company Logo" className="obtenciondatos-archive-icon" /> <p>Municipio de Quito</p>
            </div>
            <div className="obtenciondatos-items">
              <Image src={Archive} alt="Company Logo" className="obtenciondatos-archive-icon" /> <p>Supercías</p>
            </div>
          </div>
        </div>
        <br></br>
        <button className="obtenciondatos-button">Inicia gratis</button>
      </div>
    </div>
  );
}

export default ObtencionDatos;
