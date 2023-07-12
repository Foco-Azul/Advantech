import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";
import SeccionAyuda from "@/components/Inicio/SeccionAyuda/SeccionAyuda";
import SeccionRecursos from "@/components/Inicio/SeccionRecursos/SeccionRecursos";
import SeccionProductos from "@/components/Inicio/SeccionProductos/SeccionProductos";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero";
import NavMenu from "@/components/NavMenu";
import { Providers } from "./providers";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata:Metadata ={
  title:"Advantech datos",
  description:"esta es una descripcion de prueba",
  openGraph: {
    images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
  }
}
export default function Page() {
  return (
    <Providers>
      <div className="hero-back">
        <>
          <header className="w-full relative">
            <NavMenu />
          </header>
          <Hero />
          <SeccionProductos />
          <SeccionRecursos />
          <SeccionAyuda />
          <SeccionCreaTuCuenta />
          <Footer />
        </>
      </div>
    </Providers>
  );
}
