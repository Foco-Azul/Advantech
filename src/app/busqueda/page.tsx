
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../globals.css"
import './busqueda.css';
import SearchComponent from '@/components/SearchComponent/SearchComponent';
import SelectionSearch from '@/components/SearchComponent/SelectionSearch';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Busqueda",
  description: "Advantech Datos: Plataforma de búsqueda de datos en Ecuador. Realiza búsquedas simples o por lote de personas y empresas. Descarga datos en varios formatos.",
  openGraph: {
    images: ['https://dev.advantech.com.ec:1334/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
  },
  keywords: "Datos"
}


export default function Busqueda() {
  return (
    <div className="busqueda-back">
      <header className="w-full relative">
        <UserProvider>
          <NavMenu />
        </UserProvider>
      </header>
      <br></br>
      <br></br>
      <br></br>
      <h2 className="busqueda-h2">REALIZA LA BÚSQUEDA DE DATOS</h2>
      <h1 className="busqueda-h1">Puedes descargarlos en distintos formatos</h1>
      <br></br>
      <br></br>

      <div className='busqueda-containers'>
        <div className='busqueda-containers-buttons'>
        </div>
      </div>

      <UserProvider>
        {/* <SearchComponent /> */}
        <SelectionSearch></SelectionSearch>
      </UserProvider>
      <Footer />

    </div>
  );
}
