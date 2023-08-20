import './SeccionVentajas.css';
import Image from 'next/image';
import ImageEquipo from './image-equipo.svg'

function SeccionVentajas() {

  return (
    <section className="seccion-ventajas">
      <div className="ventajas-contenido">
        <div className="seccion-titulo">
          <h4>Ventajas de uso</h4>
          <h2>Optimiza tu tiempo y recursos con Advantech</h2>
          <p>Podrás tomar mejores decisiones basadas en evidencia, y mejorar tu productividad y competitividad. No esperes más, prueba nuestro servicio de búsqueda de datos hoy mismo y descubre todo lo que puedes lograr.</p>
        </div>
        <div className='seccion-imagen'>
          <Image src={ImageEquipo} alt='Advantech Datos'></Image>
        </div>
      </div>
    </section>
  );
}

export default SeccionVentajas;
