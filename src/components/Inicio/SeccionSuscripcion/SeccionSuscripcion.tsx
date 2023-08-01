import Image from "next/image";
import './SeccionSuscripcion.css'
import Link from "next/link";
import IconPc from "./image/icon-pc.svg"
import IconPeople from "./image/icon-people.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCircleRight} from "@fortawesome/free-solid-svg-icons";

async function SeccionRecursos() {
  return (
        <section className="seccion-suscripcion">
            <div>
                <div className="seccion-suscripcion-marcas">

                </div>
                <div className="seccion-suscripcion-encabezado">
                    <h2>Suscripción para obtener información de bases de datos públicas</h2>
                    <p>Advantech Datos es una suscripción que te brinda acceso a bases de datos de personas de distintas fuentes públicas.</p>
                </div>
                <div className="seccion-suscripcion-tipo">
                    <div className="seccion-suscripcion-tipo-empresa">
                        <Image src={IconPc} width={80} height={80} alt="advantech-suscripcion"></Image>
                        <h4>Para empresas <FontAwesomeIcon icon={faCircleRight} style={{color: "#009fde",}} /></h4>
                        <p>Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas.</p>
                    </div>
                    <div className="seccion-suscripcion-tipo-persona ocultar">
                        <Image src={IconPeople} width={80} height={80} alt="advantech-suscripcion"></Image>
                        <h4>Para personas <FontAwesomeIcon icon={faCircleRight} style={{color: "#009fde",}} /></h4>
                        <p>Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas. </p>
                    </div>
                </div>
                <div className="seccion-suscripcion-footer">
                    <button className="hero-button">Ver planes de precios</button>
                    <br />
                    <Link href="#" legacyBehavior passHref><a>Ver productos <FontAwesomeIcon icon={faArrowRight} /></a></Link>
                </div>
            </div>
        </section>
    )
}

export default SeccionRecursos;

  