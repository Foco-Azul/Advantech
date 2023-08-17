import './SeccionTablaPlanes.css';

function SeccionTablaPlanes() {

  return (
    <section className='seccion-tabla-planes'>
        <div>
            <table>
                <tbody>
                    <tr className='header'>
                        <th>Funcionalidades</th>
                        <td>A la carta</td>
                        <td>Estantard</td>
                        <td>Premium</td>
                        <td>Enterprice</td>
                    </tr>
                    <tr>
                        <th>Creditos</th>
                        <td>Los que necesites</td>
                        <td>20.000</td>
                        <td>50.000</td>
                        <td>100.000</td>
                    </tr>
                    <tr>
                        <th>Soporte</th>
                        <td>Formulario de contacto</td>
                        <td>Formulario de contacto</td>
                        <td>Formulario de contacto</td>
                        <td>Mail | Teléfono</td>
                    </tr>
                    <tr>
                        <th>Entrega de datos</th>
                        <td>API | Lotes | Mail</td>
                        <td>API | Lotes | Mail</td>
                        <td>API | Lotes | Mail</td>
                        <td>API | Lotes | Mail</td>
                    </tr>
                    <tr>
                        <th>Forma de entrega de datos</th>
                        <td>PDF</td>
                        <td>XLSX</td>
                        <td>PDF | XLSX | CSV</td>
                        <td>PDF | XLSX | CSV</td>
                    </tr>
                    <tr>
                        <th>Duración</th>
                        <td>6 meses</td>
                        <td>12 meses</td>
                        <td>12 meses</td>
                        <td>18 meses</td>
                    </tr>
                    <tr>
                        <th>Descripción</th>
                        <td>
                            El plan personalizado es un plan donde vas a poder comprar los créditos que necesites a medida, se cargan en tu billetera y están listos para consumir, tienen una vigencia de 6 meses para usar, en caso de que el plazo haya vencido podrá recargar nuevamente para poder acceder a los créditos anteriores. Consulta la siguiente tabla donde podras ver cual es el precio final que vas a abonar por los créditos que necesites.
                        </td>
                        <td>
                            El plan Standard es una suscripción que te garantiza 20.000 créditos para comprar los datos que necesites, ademas de contar con un nivel de soporte vía email.  Se habilita la entrega de datos en formato XLSX. Una vez finalizado el tiempo para usar los créditos podes recuperarlos comprando una nueva suscripción o recargando créditos a tu plan.
                        </td>
                        <td>
                            El plan Premium es una suscripción que te garantiza 50.000 créditos para comprar los datos que necesites, ademas de contar con un nivel de soporte vía mail o telefónica. Se habilita la entrega de datos por CSV, TXT y XLSX. Una vez finalizado el tiempo para usar los créditos, podes recuperarlos comprando nuevamente la suscripcióno recargando créditos a tu plan   
                        </td>
                        <td>
                            El plan Enterprise es nuestro mejor plan, el que te va a garantizar el acceso total a la entrega de datos. Se te otorgan 100.000 créditos para consultar los datos públicos. Ademas de una atención personalizada por cualquier inquietud. Una vez finalizado el tiempo para usar los créditos, podes recuperarlos comprando nuevamente la suscripción o recargando créditos a tu plan
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
  );
}

export default SeccionTablaPlanes;
