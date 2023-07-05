import Image from "next/image";
import { ArrowRight } from "lucide-react";
import "./Hero.css";
import Carousel from "./Carousel";



function Hero({ hero }: any) {
  return (
    <section >
      <div className="hero-grid">
        <div className="hero-content">
          <br></br>
          <br></br>
          <h1 className="hero-short-title">{hero.short_title}</h1>
          <br></br>
          <br></br>
          <h2 className="hero-description">
            {`${hero.short_title} ${hero.short_title} ${hero.short_title}`}
          </h2>
          <br></br>
          <br></br>
          <button className="hero-button">
            Crear cuenta gratis
          </button>
          <br></br>
          <a href="#" className="hero-icon-container">
            {hero.cta} <ArrowRight className="hero-icon" />
          </a>
          <Carousel/>
        </div>
      </div>
    </section>
  );
}

export default Hero;
