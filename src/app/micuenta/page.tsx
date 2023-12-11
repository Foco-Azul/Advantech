import './micuenta.css'
import NavMenu from '@/components/NavMenu/index';
import Micuenta from "@/components/Micuenta/Micuenta";
import { Metadata } from "next";
import Footer from '@/components/Footer/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
    title: "Mi cuenta",
    description: "Advantech Datos: Tu fuente confiable para acceder a información de personas de manera rápida y automática. Explora nuestros recursos, guías de uso y soluciones personalizadas. ¡Crea una cuenta hoy mismo y obtén acceso a datos de múltiples fuentes!",
    openGraph: {
        images: ['https://dev.advantech.com.ec:1334/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    }
}

export default function Micuentaview() {

    return (
        <div className="micuenta">
            <NavMenu></NavMenu>
            <UserProvider>
                <Micuenta/>
            </UserProvider>
            <Footer></Footer>
        </div>
    );
}


