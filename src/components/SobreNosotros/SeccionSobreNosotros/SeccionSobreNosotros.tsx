"use client"
import Image from "next/image";
import './SeccionSobreNosotros.css';
import Gif from "./image/SobreNosotros.gif"
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
import { useRef } from 'react'
import '@johanaarstein/dotlottie-player'
import type { DotLottiePlayer } from '@johanaarstein/dotlottie-player'

function SobreNosotros() {
  const animation = useRef<DotLottiePlayer | null>(null)
  return (
    <div className="sobrenosotros-container">
      <div className="sobrenosotros-columna1">
        <h1 className="sobrenosotros-title">Sobre nosotros</h1>
        <br></br>
        <h2 className="sobrenosotros-subtitle">Brindamos innovación a compañías que buscan mejorar sus procesos</h2>
        <br></br>
        <p className="sobrenosotros-text">Armados con las tecnologías más avanzadas, nuestro compromiso es obtener el mayor valor de sus datos, de cualquier manera que se presenten, continuamente.</p>
        <br></br>
        <a href="https://www.advantech.com.ec" target="_blank" rel="noopener noreferrer" className="sobrenosotros-text" >Conócenos más en <span className="sobrenosotros-icon-container">www.advantech.com.ec</span> </a>
        <br></br>
        <Link href={"/sobre-nosotros#nuestra-experiencia"}><button className="sobrenosotros-button">Nuestra experiencia</button></Link>
        <br></br>
        <Link href="/planes" legacyBehavior passHref><a className="sobrenosotros-icon-container">¿Cómo obtenemos datos?<FontAwesomeIcon icon={faArrowRight} className="hero-icon"/></a></Link>

      </div>
      <div className="sobrenosotros-columna2">
        <dotlottie-player
        class="your-class-name"
        src="https://lottie.host/920e6296-8eaf-4d15-bb10-0787333ab784/wwcKRDicfi.json"
        autoplay=""
        loop=""
      />
      </div>
    </div>
  );
}

export default SobreNosotros;
