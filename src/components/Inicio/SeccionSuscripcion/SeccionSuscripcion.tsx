import Image from "next/image";
import './SeccionSuscripcion.css'
import Link from "next/link";
import ImageRecursos from "./image/imagen-advantech-laptop.svg"
import IconLaptop from "./image/icon-laptop.svg"
import IconBuscador from "./image/icon-buscador.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";

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
                        <Image src={IconLaptop} width={80} height={80} alt="advantech-suscripcion"></Image>
                        <h4>Uso para empresas</h4>
                        <p>Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas.</p>
                        <Link href="#" legacyBehavior passHref>Ver más</Link><FontAwesomeIcon icon={faArrowRight} />
                    </div>
                    <div className="seccion-suscripcion-tipo-persona">
                        <Image src={IconBuscador} width={80} height={80} alt="advantech-suscripcion"></Image>
                        <h4>Para personas</h4>
                        <p>Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas. Descripción de beneficios de los planes para empresas. </p>
                        <Link href="#" legacyBehavior passHref>Ver comparación</Link><FontAwesomeIcon icon={faArrowRight} />
                    </div>
                </div>
                <div className="seccion-suscripcion-footer">
                    <button className="hero-button">Ver planes de precios</button>
                    <br />
                    <Link href="#" legacyBehavior passHref>Ver productos</Link><FontAwesomeIcon icon={faArrowRight} />
                </div>
            </div>
        </section>
    )
}

export default SeccionRecursos;

  