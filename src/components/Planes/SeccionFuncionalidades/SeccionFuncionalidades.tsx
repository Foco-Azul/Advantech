import './SeccionFuncionalidades.css';
import Image from 'next/image';
import IconCalendar from "./image/icon-calendar.svg"
import IconDownload from "./image/icon-download.svg"
import IconEarphones from "./image/icon-earphones.svg"
import IconPaper from "./image/icon-paper.svg"
import IconSearch from "./image/icon-search.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck} from "@fortawesome/free-regular-svg-icons";

function SeccionFuncionalidades() {

  return (
    <section className='seccion-funcionalidades'>
        <div>
            <div className="seccion-titulo">
                <h4>¿Qué incluye cada plan?</h4>
                <h2>Conoce más sobre cada una de nuestras funcionalidades</h2>
            </div>
            <div className="tarjeta-informativa">
                <Image src={IconSearch} width={80} height={80} alt="Advantech Datos"></Image>
                <h4>Créditos</h4>
                <p>Los créditos son nuestro tipo de transacción, estos se te descontarán cada que realices  una búsqueda, dependiendo de:</p>
                <ul>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Cada registro de datos tiene un valor en créditos.</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Los créditos se adquieren a través de la compra de planes de suscripción.</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Los créditos se incorporan a la billetera del usuario cada vez que se adquiere o se renueva un plan.</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Los créditos se mantendrán activos en la billetera siempre y cuando tengan un plan vigente.</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>En caso de vencerse el plan, los créditos van a quedar en la billetera del usuario hasta que compre un nuevo plan. Una vez actualizado el plan, los créditos vuelven a estar disponibles y se suman a los nuevos.
</span></li>
                </ul>
            </div>
            <div className="tarjeta-informativa">
                <Image src={IconCalendar} width={80} height={80} alt="Advantech Datos"></Image>
                <h4>Tiempo de duración</h4>
                <p>Es el tiempo que durará tu plan en nuestro sitio, una vez este tiempo culmine toma en cuenta lo siguiente:</p>
                <ul>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Para volver a realizar una búsqueda tendrás que adquirir un nuevo plan.</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Si es que en tu plan previo aún tenías créditos 
disponibles, estos se sumarán a tu nuevo plan.</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Tu plan podrá renovarse de manera automática si es que así lo decidiste al momento de su compra.</span></li>
                </ul>
            </div>
            <div className="tarjeta-informativa">
                <Image src={IconEarphones} width={80} height={80} alt="Advantech Datos"></Image>
                <h4>Nuestro soporte</h4>
                <p>Te brindamos la posibilidad de consultarnos por cualquier duda que tengamos con respecto a nuestro servicio.</p>
                <ul>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span> Puedes consultar vía formulario, mail y teléfono de contacto según la característica de tu suscripción.</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Un asesor personalizado se pondrá en contacto contigo y te ayudará a esclarecer todas tus dudas.</span></li>
                </ul>
            </div>
            <div className="tarjeta-informativa">
                <Image src={IconDownload} width={80} height={80} alt="Advantech Datos"></Image>
                <h4>Entrega de datos</h4>
                <p>Tenemos distintos mecanismos de entrega de datos para ayudarte a recibir más simple los datos consultados. Pueden ser por:</p>
                <ul>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>API</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Lote</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Mail</span></li>
                </ul>
            </div>
            <div className="tarjeta-informativa">
                <Image src={IconPaper} width={80} height={80} alt="Advantech Datos"></Image>
                <h4>Formatos de entrega</h4>
                <p>Nuestro servicio te permite acceder a los datos que necesites en diferentes formatos, listos para que puedas implementarlo de la forma que necesites. Disponible según plan de suscripción.</p>
                <ul>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>PDF</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>CSV</span></li>
                    <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>XLSX</span></li>
                </ul>
            </div>
        </div>
    </section>
  );
}

export default SeccionFuncionalidades;
