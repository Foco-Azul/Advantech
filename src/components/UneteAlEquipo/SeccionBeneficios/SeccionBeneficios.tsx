import Image from "next/image";
import './SeccionBeneficios.css'
import ImagenCheck from "./image/icon-check.svg"

 function SeccionBeneficios() {
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
                            <h5>Trabajo remoto</h5>
                            <p>Ofrecemos la posibilidad de trabajar de la comodidad de tu casa, no importa en qué país te encuentres.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h5>Flexibilidad</h5>
                            <p>Te brindamos la flexibilidad de horarios para que puedas trabajar de la forma que más se adapte a ti.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h5>Gran ambiente laboral</h5>
                            <p>Contamos con un grupo de profesionales los cuales estan dispuestos a a ayudarse entre sí.</p>
                        </div>
                    </div>
                    <div className="beneficio">
                        <div>
                            <Image src={ImagenCheck} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h5>Crecimiento</h5>
                            <p>A medida que vayas trabajando se te irán agregando proyectos y podrás ir ascendiendo de puesto dentro de nuestra empresa.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeccionBeneficios;

  