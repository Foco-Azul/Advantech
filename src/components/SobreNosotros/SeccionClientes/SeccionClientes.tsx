import './SeccionClientes.css';
import MarcasClientes from '@/components/MarcasClientes/MarcasClientes';

function SeccionClientes() {

  return (
    <section className='seccion-aliados'>
      <div className='aliados-contenido'>
        <MarcasClientes/>
      </div>
    </section>
  )
}

export default SeccionClientes;


