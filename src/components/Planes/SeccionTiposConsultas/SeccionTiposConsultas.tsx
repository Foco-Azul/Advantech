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
                            <th>API</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nómina de Accionistas</td>
                            <td>Superintendencia de Compañías</td>
                            <td>Lista de personas naturales y jurídicas accionistas de la empresa, situación legal y capital invertido</td>
                            <td>4</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Antecedentes penales personales</td>
                            <td>Ministerio de Gobierno</td>
                            <td>Fecha de nacimiento, nacionalidad, cédula y antecedentes penales</td>
                            <td>2</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Procesos Judiciales electrónicos personales</td>
                            <td>Función Judicial</td>
                            <td>Información sobre procesos judiciales, causas, expedientes, trámites y juicios de forma histórica y actual</td>
                            <td>1</td>
                            <td>Judicial</td>
                        </tr>
                        <tr>
                            <td>Impedimiento salida del país</td>
                            <td>Ministerio de Gobierno</td>
                            <td>
                                Información de medidas cautelares relacionadas con arraigos dirigidos a personas extranjeras, e impedimentos de salida del país dirigido a personas nacionales.
                            </td>
                            <td>2</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Denuncias o noticias del delito personales</td>
                            <td>Fiscalía General del Estado</td>
                            <td>
                                Información de denuncias o Noticias de Delito, por nombre de los involucrados, placas de los vehículos y número de denuncia.
                            </td>
                            <td>2</td>
                            <td>Noticias</td>
                        </tr>
                        <tr>
                            <td>Predios personales</td>
                            <td>Municipio de Quito</td>
                            <td>
                                Lista de predios en el Municipio del Distrito Metropolitano de Quito, límites de la propiedad, dimensiones, ubicación geográfica y avalúo comercial.
                            </td>
                            <td>2</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Representates legales y Accionistas</td>
                            <td>Superintendencia de Compañías</td>
                            <td>Lista de nombres de representantes legales, porcentaje de participación y sus atributos en la empresa.</td>
                            <td>3</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Títulos Universitarios personales</td>
                            <td>Senescyt</td>
                            <td>
                                Lista los títulos universitarios de tercer nivel y cuarto nivel avalados por la Secretaría de Educación Superior, Ciencia, Tecnología e Innovación
                            </td>
                            <td>1</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Impuesto a la Renta e impuesto de salida de divisas</td>
                            <td>Servicio de Rentas Internas</td>
                            <td>
                                Valores de las declaraciones del Impuesto a la Renta obligatoria para todas las personas naturales, las sucesiones indivisas y las sociedades, nacionales o extranjeras, domiciliadas o no en el país, conforme los resultados de su actividad económica anual.
                            </td>
                            <td>2</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Datos de contribuyentes registrados en el RUC</td>
                            <td>Servicio de Rentas Internas</td>
                            <td>
                                Datos registrados: número de Ruc, estado del contribuyente, actividad económica principal o la fecha correspondiente al inicio o cese de actividades
                            </td>
                            <td>1</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Títulos de bachiller</td>
                            <td>Ministerio de Educación</td>
                            <td>
                                Lista el título de bachiller de la República del Ecuador y los títulos obtenidos en el exterior homologados en el país registrados por el Ministerio de Educación.
                            </td>
                            <td>1</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
  );
}

export default SeccionTiposConsultas;
