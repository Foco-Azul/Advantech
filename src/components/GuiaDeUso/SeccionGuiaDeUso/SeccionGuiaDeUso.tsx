import './SeccionGuiaDeUso.css';
import Image from 'next/image';
import ImageEquipo from './image-equipo.svg'

function SeccionGuiaDeUso() {

  return (
    <section className="seccion-ventajas">
      <div className="ventajas-contenido">
        <div className="seccion-titulo">
          <h4>Guia de busquedas</h4>
          <h2>Aprende cómo realizar busquedas</h2>
          <p>Mediante nuestra Guía de busquedas, te enseñaremos cómo realizar una busqueda simple o por lotes para encontrar datos públicos actualizados de personas en Ecuador con nuestro buscador en línea.</p>
        </div>
        <div className='seccion-imagen'>
          <Image src={ImageEquipo} alt='Advantech Datos'></Image>
        </div>
      </div>
    </section>
  );
}

export default SeccionGuiaDeUso;
