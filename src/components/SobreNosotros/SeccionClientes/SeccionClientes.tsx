import './SeccionClientes.css';
import MarcasClientes from '@/components/MarcasClientes/MarcasClientes';
import Marca_1 from "./image/Datafast-final.png"
import Marca_2 from "./image/diners.png"
import Marca_3 from "./image/pichincha.png"
import Image from 'next/image';

function SeccionClientes() {

  return (
    <section className='seccion-aliados'>
      <div className='aliados-contenido'>
        <div className='empresas-marcas'>
          <div><Image src={Marca_1} alt='Advantech Datos' ></Image></div>
          <div><Image src={Marca_2} alt='Advantech Datos' ></Image></div>
          <div><Image src={Marca_3} alt='Advantech Datos' ></Image></div>
        </div>
      </div>
    </section>
  )
}

export default SeccionClientes;


