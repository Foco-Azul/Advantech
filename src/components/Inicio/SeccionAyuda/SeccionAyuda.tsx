import Image from "next/image";
import './SeccionAyuda.css'
import ImagenCheck from "./image/icon-check.svg"
import ImageDatos from "./image/image-datos.svg"

async function SeccionAyuda() {
  return (
        <section>
            <div className="seccion_2">
                <div className="content-izq">
                    <h2>Ayuda</h2>
                    <h3>Obtiene asesoramiento sobre cómo crecer junto a una estrategia de uso de datos</h3>
                    <Image src={ImageDatos} alt="Logo" width={355} height={355}></Image>
                    <p>Agenda un demo y analizaremos juntos una estrategia de utilización de datos para el crecimiento de tu empresa.</p>
                    <button className="hero-button">Agendar un demo</button>
                </div>
                <div className="content-der">
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h4>Título de beneficio #1</h4>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h4>Título de beneficio #2</h4>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h4>Título de beneficio #3</h4>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h4>Título de beneficio #4</h4>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeccionAyuda;

  