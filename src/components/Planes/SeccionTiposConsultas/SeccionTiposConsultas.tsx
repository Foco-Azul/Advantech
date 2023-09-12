import './SeccionTiposConsultas.css';

function SeccionTiposConsultas() {

  return (
    <section className='seccion-Tipos-Consultas'>
        <div>
            <div className="tipos-consultas-head-container">
                <h2 className="tipos-consultas-head-title">Tipos de consultas</h2>
                <h3 className="tipos-consultas-head-subtitle">Conoce nuestra relación de consultas créditos - fuente</h3>
                <p className="tipos-consultas-head-text">En esta tabla podrás encontrar los tipos de consultas, la fuente de obtención de datos y los créditos que requieren.</p>
            </div>

            <div className='contenedor-tabla'>
                <table>
                    <thead>
                        <tr>
                            <th>Consultas</th>
                            <th>Fuente</th>
                            <th>Descripción</th>
                            <th>Créditos</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nómina de Accionistas</td>
                            <td>Superintendencia de Compañías</td>
                            <td>Lista de personas naturales y jurídicas accionistas de la empresa, situación legal y capital invertido</td>
                            <td>4</td>
                        </tr>
                        <tr>
                            <td>Antecedentes penales personales</td>
                            <td>Ministerio de Gobierno</td>
                            <td>Fecha de nacimiento, nacionalidad, cédula y antecedentes penales</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Procesos Judiciales electrónicos personales</td>
                            <td>Función Judicial</td>
                            <td>Procesos judiciales, causas, expedientes, trámites y juicios actuales o históricos</td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Impedimiento salida del país</td>
                            <td>Ministerio de Gobierno</td>
                            <td>
                                Medidas cautelares contra personas extranjeras e impedimento de salida de personas locales
                            </td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Denuncias o noticias del delito personales</td>
                            <td>Fiscalía General del Estado</td>
                            <td>
                                Denuncias o Noticias de delito (búsqueda por nombre o número de denuncia)
                            </td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Predios personales</td>
                            <td>Municipio de Quito</td>
                            <td>
                                Predios en el Municipio, límites de propiedad, dimensiones, ubicación y avalúo comercial.
                            </td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Representates legales y Accionistas</td>
                            <td>Superintendencia de Compañías</td>
                            <td>Lista de nombres de representantes legales, porcentaje de participación y sus atributos en la empresa.</td>
                            <td>3</td>
                        </tr>
                        <tr>
                            <td>Títulos Universitarios personales</td>
                            <td>Senescyt</td>
                            <td>
                                Lista los títulos universitarios de tercer nivel y cuarto nivel avalados por la Secretaría de Educación Superior, Ciencia, Tecnología e Innovación
                            </td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Impuesto a la Renta e impuesto de salida de divisas</td>
                            <td>Servicio de Rentas Internas</td>
                            <td>
                                Valores del impuesto a la renta obligatoria, sucesiones indivisas y sociedades nacionales o extranjeras, domiciliadas o no, en el país, conforme a los resultados de su actividad económica anual.
                            </td>
                            <td>2</td>
                        </tr>
                        <tr>
                            <td>Datos de contribuyentes registrados en el RUC</td>
                            <td>Servicio de Rentas Internas</td>
                            <td>
                                Datos registrados: número de Ruc, estado del contribuyente, actividad económica principal o la fecha correspondiente al inicio o cese de actividades
                            </td>
                            <td>1</td>
                        </tr>
                        <tr>
                            <td>Títulos de bachiller</td>
                            <td>Ministerio de Educación</td>
                            <td>
                                Títulos nacionales e internacionales homologados en el país.
                            </td>
                            <td>1</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  );
}

export default SeccionTiposConsultas;
