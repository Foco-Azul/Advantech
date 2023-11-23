import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";
import SeccionAyuda from "@/components/Inicio/SeccionAyuda/SeccionAyuda";
import SeccionRecursos from "@/components/Inicio/SeccionRecursos/SeccionRecursos";
import SeccionProductos from "@/components/Inicio/SeccionProductos/SeccionProductos";
import SeccionSuscripcion from "@/components/Inicio/SeccionSuscripcion/SeccionSuscripcion";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Inicio/Hero";
import NavMenu from "@/components/NavMenu";
import { Providers } from "./providers";
import { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';


export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Advantech datos",
  description: "Descubre Advantech Datos, la plataforma que te permite desbloquear el potencial de los datos en Ecuador. Encuentra datos públicos actualizados de personas y empresas de fuentes confiables. Impulsa tu organización al siguiente nivel con nuestros servicios de consulta, suscripciones y APIs. ¡Regístrate ahora y accede a información valiosa de manera rápida y sencilla!",
  openGraph: {
    images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
  },
  keywords: "Datos públicos"
}

export default function Page() {
  return (
    <UserProvider>
      <Providers>
        <div className="hero-back">
          <>
            <header className="w-full relative">
              <UserProvider>
                <NavMenu />
              </UserProvider>
            </header>
            <Hero />
            <SeccionSuscripcion />
            <SeccionProductos />
            <SeccionRecursos />
            <SeccionCreaTuCuenta />
            <Footer />
          </>
        </div>
      </Providers>
    </UserProvider>
  );
}
