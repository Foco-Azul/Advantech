import './SeccionAliados.css';
import MarcasAliados from '@/components/MarcasAliados/MarcasAliados';
import Marca_1 from "./image/Logo-Aberfura.svg"
import Marca_2 from "./image/Logo-Generática.svg"
import Marca_3 from "./image/Logo-HCT.svg"
import Marca_4 from "./image/Logo-splunk.svg"
import Image from 'next/image';

function SeccionAliados() {

  return (
    <section className='seccion-aliados'>
      <div className='aliados-contenido'>
        <div className="tipos-consultas-head-container">
          <h4>Aliados estratégicos</h4>
        </div>
        <div className='empresas-marcas'>
          <div><Image src={Marca_1} alt='Advantech Datos' ></Image></div>
          <div><Image src={Marca_2} alt='Advantech Datos' ></Image></div>
          <div><Image src={Marca_3} alt='Advantech Datos' ></Image></div>
          <div><Image src={Marca_4} alt='Advantech Datos' ></Image></div>
        </div>
      </div>
    </section>
  )
}

export default SeccionAliados;


