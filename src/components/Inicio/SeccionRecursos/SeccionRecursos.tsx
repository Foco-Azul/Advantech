import Image from "next/image";
import './SeccionRecursos.css'
import Link from "next/link";
import ImageRecursos from "./image/Recursos-laptop.png"
import IconIndustria from "./image/icon-industria.svg"
import IconCheck from "./image/icon-check.svg"
import Marca_1 from "./image/datafast.png"
import Marca_2 from "./image/diners.png"
import Marca_3 from "./image/pichincha.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";

 function SeccionRecursos() {
  return (
        <section className="seccion-recursos">
            <div>
                <div className="seccion-recursos-superior">
                    <div className="seccion-recursos-superior-izq">
                        <h4>Recursos</h4>
                        <h2>Intuitivo para un uso diario,</h2>
                        <h2>con documentación para guiarte</h2>
                        <p>Ya sea que seas un principiante o un experto en el análisis de datos, en nuestra documentación encontrarás tutoriales y consejos para aprovechar al máximo tu suscripción.</p>
                        <Link href={"/guia-de-busqueda"}><button className="hero-button">¿Cómo funciona?</button></Link>
                    </div>
                    <div className="seccion-recursos-superior-der">
                        <Image src={ImageRecursos} width={500} height={361} alt="advantech-recursos"></Image>
                    </div>
                </div>
                <div className="seccion-recursos-inferior">
                    <div className="seccion-recursos-inferior-cont">
                        <Image src={IconIndustria} width={80} height={80} alt="advantech-recursos"></Image>
                        <h4>Uso por industria</h4>
                        <p>Aprende cómo la utilización de datos puede ayudarte a obtener una ventaja competittiva en tu rubro.</p>
                        <Link href="/uso-por-industria" legacyBehavior passHref><a>Ver más <FontAwesomeIcon icon={faArrowRight} /></a></Link>
                    </div>
                    <div className="seccion-recursos-inferior-cont">
                        <Image src={IconCheck} width={80} height={80} alt="advantech-recursos"></Image>
                        <h4>Conoce nuestras ventajas</h4>
                        <p>Olvídate de crear múltiples registros o búsquedas en libros, digitliza tu proceso de obtención de datos.</p>
                        <Link href="/ventajas" legacyBehavior passHref><a>Ver ventajas <FontAwesomeIcon icon={faArrowRight} /></a></Link>
                    </div>
                </div>
            </div>
            <div className='aliados-contenido'>
                <div className="tipos-consultas-head-container">
                    <h2 className="tipos-consultas-head-title">Ellos confían en nuestros servicios</h2>
                </div>
                <div className='empresas-marcas'>
                <div><Image src={Marca_1} alt='Advantech Datos' ></Image></div>
                <div><Image src={Marca_2} alt='Advantech Datos' ></Image></div>
                <div><Image src={Marca_3} alt='Advantech Datos' ></Image></div>
                </div>
          </div>
        </section>
    )
}

export default SeccionRecursos;

  