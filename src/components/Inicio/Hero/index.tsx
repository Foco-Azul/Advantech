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
          <br></br>
          <h1 className="hero-short-title">Desbloquea el potencial de los datos para impulsar tu organización al siguiente nivel</h1>
          <br></br>
          <br></br>
          <input className="hero-short-input" placeholder={ `Buscar en Advantech`} />
          <br></br>
          <br></br>
          <h2 className="hero-description">
            Si deseas saber que datos obtendrás, confiar y mejorar tu experiencia en nuestro sitio web, no dudes en usar nuestro buscador.          </h2>
          <br></br>
          <br></br>
          <button className="hero-button">
            Crear cuenta
          </button>
          <br></br>
          <a href="#" className="hero-icon-container">
            ¿Como funciona? <ArrowRight className="hero-icon" />
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
