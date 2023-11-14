import './SeccionEmpresas.css';
import MarcasClientes from '@/components/MarcasClientes/MarcasClientes';

function SeccionEmpresas() {

  return (
    <section className='seccion-empresas'>
      <div className='aliados-contenido' data-testid="marcas-clientes">
         <div className="tipos-consultas-head-container">
            <h2 className="tipos-consultas-head-title">Ellos confían en nosotros</h2>
            <h3 className="tipos-consultas-head-subtitle">Muchas empresas de Ecuador confían en nuestros servicios, forma parte de ellas.</h3>
            <p className="tipos-consultas-head-text">Advantech fue creada en 2004 para brindar servicios de consultoría innovadora a compañías que buscan mejorar sus procesos.</p>
        </div>
        <MarcasClientes/>
      </div>
    </section>
  )
}

export default SeccionEmpresas;


