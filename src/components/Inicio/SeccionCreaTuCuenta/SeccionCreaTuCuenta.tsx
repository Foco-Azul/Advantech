import Image from "next/image";
import './SeccionCreaTuCuenta.css'
import ImageGrafico from "./image/grafico.svg"

async function Seccion_1() {
  return (
        <section>
            <div className="seccion_1">
                <div className="content-izq">
                    <h2>Crea tu cuenta gratuita</h2>
                    <h3>Consulta los datos de miles de personas</h3>
                    <p>Obtén datos de varias fuentes de consulta personas manera automática y rápida sin ser el titular de la información.</p>
                    <button className="hero-button">Crear cuenta gratis</button>
                </div>
                <div>
                    <Image src={ImageGrafico} alt="Logo" width={352} height={277}></Image>
                </div>
            </div>
        </section>
    )
}

export default Seccion_1;

  