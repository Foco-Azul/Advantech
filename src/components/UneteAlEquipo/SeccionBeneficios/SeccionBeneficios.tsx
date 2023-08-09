import Image from "next/image";
import './SeccionBeneficios.css'
import ImagenCheck from "./image/icon-check.svg"
import ImageDatos from "./image/image-datos.svg"

async function SeccionBeneficios() {
  return (
        <section>
            <div className="seccion_2">
                <div className="content-izq">
                    <h4>¿Por qué trabajar en Advantech?</h4>
                    <h2>Forma parte de nuestro equipo remoto</h2>
                    <p>Podrás poner en práctica tus habilidades analíticas y trabajar en proyectos diversos que abarcan diferentes industrias y sectores.</p>
                </div>
                <div className="content-der">
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h5>Título de beneficio #1</h5>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h5>Título de beneficio #2</h5>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h5>Título de beneficio #3</h5>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h5>Título de beneficio #4</h5>
                            <p>Nulla faucibus mauris pellentesque blandit faucibus non. Sit ut et at suspendisse gravida hendrerit tempus placerat.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeccionBeneficios;

  