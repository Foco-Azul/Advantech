
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
  description: "esta es una descripcion de prueba",
  openGraph: {
    images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
  }
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
