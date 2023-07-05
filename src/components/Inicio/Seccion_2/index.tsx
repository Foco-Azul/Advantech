import Image from "next/image";
import Link from "next/link";
import './seccion_2.css'

async function getSeccionData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/inicio?populate[seccion_2][populate]=*`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
        },
        cache: "no-store",
      }
    );
    if (response.status != 200) {
      throw new Error(`Failed to fetch data, ${response.status}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {

    throw new Error(`Failed to fetch data, ${error}`);
  }
}


async function Seccion_1() {
  
  const secciondata = await getSeccionData();
  const seccion = secciondata.data.attributes;
  console.log(seccion);
  return (
        <section>
            <div className="seccion_2">
                <div className="content-izq">
                    <h2>{seccion.seccion_2.titulo}</h2>
                    <h3>{seccion.seccion_2.subtitulo}</h3>
                    <Image src={process.env.NEXT_PUBLIC_STRAPI_URL+seccion.seccion_2.imagen.data.attributes.url} alt="Logo" width={seccion.seccion_2.imagen.data.attributes.width} height={seccion.seccion_2.imagen.data.attributes.height}></Image>
                    <p>{seccion.seccion_2.descripcion}</p>
                    <button className="hero-button">{seccion.seccion_2.boton.contenido.nombre}</button>
                </div>
                <div className="content-der">
                    {seccion.seccion_2.beneficios.contenido.map((elemento, index) => (
                    <div className="beneficio" key={index}>
                        <div>
                            <Image src={process.env.NEXT_PUBLIC_STRAPI_URL + "/uploads/icon_check_833af89a75.svg"} width={80} height={80} alt="check" />
                        </div>
                        <div>
                            <h4>{elemento.nombre}</h4>
                            <p>{elemento.descripcion}</p>
                        </div>
                    </div>
                    ))}   
                </div>
            </div>
        </section>
    )
}

export default Seccion_1;

  