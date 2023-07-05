import Image from "next/image";
import './footer.css'

async function getFooterData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/footer?populate=*`,
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


async function Footer() {
  
  const footerdata = await getFooterData();
  const footer = footerdata.data.attributes;

  return (
    <footer className="footer-home">
      <div>

        <div className="footer-content">
          <div className="footer-izq">
            <Image src={process.env.NEXT_PUBLIC_STRAPI_URL+""+footer.logo.data.attributes.url} alt="Company Logo" width={footer.logo.data.attributes.width} height={footer.logo.data.attributes.height}/>
          <div className="footer-rrss">
          {footer.rrss.redesSociales.map((redSocial) => (
            <a href={redSocial.enlace} key={redSocial.nombre}>
              <Image src={process.env.NEXT_PUBLIC_STRAPI_URL + redSocial.logoSVG} alt={redSocial.nombre} width={50} height={50} />
            </a>
          ))}
          </div>
            <div>
              <p>{footer.descripcion}</p>
            </div>
          </div>
          <div className="footer-home-links">    
          {footer.contenido.columnas.map((columna, index) => (
              <div key={index}>
                <h2 className="column-title">{columna.nombre}</h2>
                <ul>
                  {columna.filas.map((fila, index) => (
                    <li key={index} className="list-row">
                      <a href={fila.enlace} className="link">
                        {fila.nombre}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        <div className="footer-final"> 
            <strong>{ footer.derechos}</strong>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
