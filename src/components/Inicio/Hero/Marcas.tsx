import Image from "next/image";
import "./Marcas.css";
import Marca_1 from "./image/logo.svg"
import Marca_2 from "./image/logo-1.svg"
import Marca_3 from "./image/logo-2.svg"
import Marca_4 from "./image/logo-3.svg"
import Marca_5 from "./image/logo-4.svg"
import Marca_6 from "./image/logo-5.svg"
function Marcas() {
  return (
        <section className="hero-marcas">
            <div>
            <Image src={Marca_1} alt={"Advantech-marca-1"}></Image>
            <Image src={Marca_2} alt={"Advantech-marca-2"}></Image>
            <Image src={Marca_3} alt={"Advantech-marca-3"}></Image>
            <Image src={Marca_4} alt={"Advantech-marca-4"}></Image>
            <Image src={Marca_5} alt={"Advantech-marca-5"}></Image>
            <Image src={Marca_6} alt={"Advantech-marca-6"}></Image>
            </div>
        </section>
    )
}

export default Marcas;

  