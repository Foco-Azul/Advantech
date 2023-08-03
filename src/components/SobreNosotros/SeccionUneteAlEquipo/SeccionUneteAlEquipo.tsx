import Image from "next/image";
import './SeccionUneteAlEquipo.css'
import ImageGrafico from "./image/grafico.svg"

function SeccionUneteAlEquipo() {
  return (
        <section className="seccion-unete-al-equipo">
            <div>
                <div className="unete-al-equipo">
                    <div className="content-izq">
                        <h2>Únete al equipo</h2>
                        <p>¿Te interesa trabajar en Advantech? Somos un equipo remoto que busca superar las expectativas de nuestros clientes.</p>
                        <button className="hero-button">Envíanos tu CV</button>
                    </div>
                    <div>
                        <Image src={ImageGrafico} alt="Logo" width={352} height={277}></Image>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeccionUneteAlEquipo;

  