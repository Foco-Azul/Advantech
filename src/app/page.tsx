import Seccion_1 from "@/components/Inicio/Seccion_1";
import Seccion_2 from "@/components/Inicio/Seccion_2";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavMenu from "@/components/NavMenu";
import { Providers } from "./providers";

export const dynamic = "force-dynamic";


export default async function Page() {



  return (
    <Providers >

      <div className="hero-back">
        <>
          <header className="w-full relative">
            <NavMenu />
          </header>
          <Hero />
          <Seccion_2 />
          <Seccion_1 />
          <Footer />
        </>
      </div>

    </Providers>


  );
}
