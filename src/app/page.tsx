import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";
import SeccionAyuda from "@/components/Inicio/SeccionAyuda/SeccionAyuda";
import SeccionRecursos from "@/components/Inicio/SeccionRecursos/SeccionRecursos";
import SeccionProductos from "@/components/Inicio/SeccionProductos/SeccionProductos";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero";
import NavMenu from "@/components/NavMenu";
import { Providers } from "./providers";
import Head from 'next/head';
import ImageSeo from '@/components/NavMenu/Brand.svg'

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Providers>
      <div className="hero-back">
        <Head>
          <title>Advantech datos SEO</title>
          <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
          <meta name="google" content="notranslate" key="notranslate" />
          <meta name="description" content="Aquí estamos poniendo una breve description" />
          <meta property="og:title" content="Advantech datos SEO" />
          <meta property="og:description" content="Aquí estamos poniendo una breve description" />
          <meta property="og:image" content={ImageSeo} />
        </Head>
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
