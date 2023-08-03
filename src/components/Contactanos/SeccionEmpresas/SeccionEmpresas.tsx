import './SeccionEmpresas.css';
import Image from 'next/image';
import Marca_1 from "./image/logo.svg"
import Marca_2 from "./image/logo-1.svg"
import Marca_3 from "./image/logo-2.svg"
import Marca_4 from "./image/logo-3.svg"
import Marca_5 from "./image/logo-4.svg"
import Marca_6 from "./image/logo-5.svg"

function SeccionEmpresas() {

  return (
    <section className='seccion-empresas'>
      <div className='aliados-contenido'>
         <div className="tipos-consultas-head-container">
            <h2 className="tipos-consultas-head-title">Ellos confían en nuestros servicios</h2>
        </div>
        <div className='empresas-marcas'>
          <Image src={Marca_1} alt='Advantech Datos' ></Image>
          <Image src={Marca_2} alt='Advantech Datos' ></Image>
          <Image src={Marca_3} alt='Advantech Datos' ></Image>
          <Image src={Marca_4} alt='Advantech Datos' ></Image>
          <Image src={Marca_5} alt='Advantech Datos' ></Image>
          <Image src={Marca_6} alt='Advantech Datos' ></Image>
        </div>
      </div>
    </section>
  )
}

export default SeccionEmpresas;


