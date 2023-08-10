import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "./Hero.css";
import Carousel from "./Carousel";
import Marcas from '@/components/Marcas/Marcas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";

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
            Si deseas saber que datos obtendrás, confiar y mejorar tu experiencia en nuestro sitio web, no dudes en usar nuestro buscador. </h2>
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
          <Marcas />
        </div>
      </div>
    </section>
  );
}

export default Hero;
