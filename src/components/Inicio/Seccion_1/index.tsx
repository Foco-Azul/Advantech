import Image from "next/image";
import Link from "next/link";
import './seccion_1.css'

async function getSeccionData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/inicio?populate[seccion_1][populate]=*`,
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
            <div className="seccion_1">
                <div className="content-izq">
                    <h2>{seccion.seccion_1.titulo}</h2>
                    <h3>{seccion.seccion_1.subtitulo}</h3>
                    <p>{seccion.seccion_1.descripcion}</p>
                    <button className="hero-button">Crear cuenta gratis</button>
                </div>
                <div>
                    <Image src={process.env.NEXT_PUBLIC_STRAPI_URL+seccion.seccion_1.imagen.data.attributes.url} alt="Logo" width={seccion.seccion_1.imagen.data.attributes.width} height={seccion.seccion_1.imagen.data.attributes.height}></Image>
                </div>
            </div>
        </section>
    )
}

export default Seccion_1;

  