import Image from "next/image";
import './SeccionCreaTuCuenta.css'
import ImageGrafico from "./image/grafico.svg"
import Link from "next/link";

function SeccionCreaTuCuenta() {
  return (
        <section className="seccion-crea-tu-cuenta">
            <div>
                <div className="crea-tu-cuenta">
                    <div className="content-izq">
                        <h4>Crea tu cuenta gratuita</h4>
                        <h2>Y descubre más ventajas con Advantech</h2>
                        <p>Aprovecha estas ventajas en tu empresa para poder destacar sobre los demás.</p>
                        <a href={"/api/auth/login"}><button className="hero-button">Crear cuenta</button></a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SeccionCreaTuCuenta;

  