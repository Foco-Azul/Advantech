import './SeccionEmpresas.css';
import Image from 'next/image';
import Marca_1 from "./image/datafast.jpg"
import Marca_2 from "./image/diners.jpg"
import Marca_3 from "./image/pichincha.jpg"

function SeccionEmpresas() {

  return (
    <section className='seccion-empresas'>
      <div className='aliados-contenido'>
         <div className="tipos-consultas-head-container">
            <h2 className="tipos-consultas-head-title">Ellos confían en nuestros servicios</h2>
        </div>
        <div className='empresas-marcas'>
          <div><Image src={Marca_1} alt='Advantech Datos' ></Image></div>
          <div><Image src={Marca_2} alt='Advantech Datos' ></Image></div>
          <div><Image src={Marca_3} alt='Advantech Datos' ></Image></div>
        </div>
      </div>
    </section>
  )
}

export default SeccionEmpresas;


