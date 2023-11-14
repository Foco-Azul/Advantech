
import Image from "next/image";
import './SeccionSuscripcion.css'
import Link from "next/link";
import IconPc from "./image/icon-pc.svg"
import ImageSuscripcion from "./image/Planes2.png"

function SeccionRecursos() {
    return (
        <section className={`seccion-suscripcion`}>
            <div>
                <div className="seccion-suscripcion-marcas">

                </div>
                <div className="seccion-suscripcion-encabezado">
                    <h2>Suscripción para obtener información de bases de datos públicas</h2>
                    <p>Advantech Datos es una suscripción que te brinda acceso a bases de datos de personas de distintas fuentes públicas.</p>
                </div>
                <div className="seccion-suscripcion-tipo">
                    <div className="suscripcion-imagen">
                        <Image src={ImageSuscripcion} alt="Advantech Datos"></Image>
                    </div>
                    <div className="seccion-suscripcion-tipo-empresa">
                        <Image src={IconPc} width={80} height={80} alt="advantech-suscripcion"></Image>
                        <h4>Planes a tu medida</h4>
                        <p>Nuestros planes están preparados para que puedas lograr tus objetivos empresariales y personales. Nuestros datos son consultados de distintas fuentes públicas así nos aseguramos de brindarte datos fiables y actualizados periódicamente.</p>
                    </div>
                </div>
                <div className="seccion-suscripcion-footer">
                    <Link href={"planes"}><button className="hero-button">Ver planes de precios</button></Link>
                </div>
            </div>
        </section>
    )
}

export default SeccionRecursos;

