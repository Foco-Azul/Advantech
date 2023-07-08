import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";
import SeccionAyuda from "@/components/Inicio/SeccionAyuda/SeccionAyuda";
import SeccionRecursos from "@/components/Inicio/SeccionRecursos/SeccionRecursos";
import Footer from "@/components/Footer/Footer";
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
          <Hero/>
          <SeccionRecursos/>
          <SeccionAyuda/>
          <SeccionCreaTuCuenta />
          <Footer />
        </>
      </div>

    </Providers>


  );
}
