import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "./Hero.css";
//import Carousel from "./Carousel";
import Carousel from "@/components/Carrusel";
import MarcasClientes from '@/components/MarcasClientes/MarcasClientes';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import Marca_1 from "./image/datafast.png"
import Marca_2 from "./image/diners.png"
import Marca_3 from "./image/pichincha.png"

function Hero() {
  return (
    <section >
      <div className="hero-grid">
        <div className="hero-content">
          <br></br>
          <h1 className="hero-short-title">Desbloquea el potencial de los datos</h1>
          <h2 className="hero-short-title">Impulsa tu organización al siguiente nivel</h2>
          <h1 className="hero-short-title-movil">Desbloquea <br /> el potencial <br /> de los datos</h1>
            <FontAwesomeIcon className="icon-search" icon={faMagnifyingGlass} size="xl" />
            <input className="hero-short-input" placeholder={ `Buscar en Advantech`} />
          <br></br>
          <h2 className="hero-description">
            Si deseas saber que datos obtendrás, confiar y mejorar tu experiencia en nuestro sitio web, no dudes en usar nuestro buscador.
            </h2>
          <br></br>
          <a href="/api/auth/login" className="hero-button" >
            Crear cuenta
          </a>
          <br></br>
          <a href="/documentacion" className="hero-icon-container">
            ¿Cómo funciona? <ArrowRight className="hero-icon" />
          </a>
          <br></br>
          <Carousel />
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
        </div>
      </div>
    </section>
  );
}

export default Hero;
