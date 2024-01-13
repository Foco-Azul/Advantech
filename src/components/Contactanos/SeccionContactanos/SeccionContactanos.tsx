import './SeccionContactanos.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck} from "@fortawesome/free-regular-svg-icons";
import { faEnvelopesBulk, faPhone} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

function SeccionContactanos() {
  return (
    <section className="seccion-contactanos">
      <div className="contactanos-contenido">
        <div className="seccion-titulo">
          <h4>Contáctanos</h4>
          <h2>Ponte en contacto con nuestro equipo</h2>
          <p>Atenderemos con gusto a todas tus consultas y te ayudaremos a poder adquirir nuestros planes.</p>
          <ul>
            <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Obtén una mejor explicación sobre nuestros planes</span></li>
            <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Realiza consultas sobre nuestra documentación</span></li>
            <li><FontAwesomeIcon icon={faCircleCheck} size="xl" /><span>Descubre los casos de uso para tu empresa</span></li>
          </ul>
          <p>En nuestra página de Documentación encontrarás tutoriales sobre el uso de nuestros productos y contacto directo de soporte técnico.</p>
          <div className='contacto'>
            <Link href="mailto:info@advantech.com.ec" target='_blank'><FontAwesomeIcon icon={faEnvelopesBulk} size="2xl" /></Link>
            <p>Envíanos un correo electrónico haciendo clic en el ícono de la izquierda o al correo <Link href="mailto:info@advantech.com.ec" target='_blank'>info@advantech.com.ec</Link></p>
          </div>
          <br />
          {/*
          <div className='contacto'>
            <Link href="tel:+593984765158" target='_blank'><FontAwesomeIcon icon={faPhone} size="2xl" /></Link>
            <p>Envíanos un mensaje o realiza una llamada haciendo clic en el ícono de la izquierda o al número <Link href="tel:+593984765158" target='_blank'>+593 984 765 158</Link></p>
          </div>
          */}
        </div>
      </div>
    </section>
  );
}

export default SeccionContactanos;
