import './micuenta.css'
import NavMenu from '@/components/NavMenu/index';
import Micuenta from "@/components/Micuenta/Micuenta";
import { Metadata } from "next";
import Footer from '@/components/Footer/Footer';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export const metadata: Metadata = {
    title: "Mi cuenta",
    description: "esta es una descripcion de prueba",
    openGraph: {
        images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    }
}

export default function Micuentaview() {

    return (
        <div className="micuenta">
            <NavMenu></NavMenu>
            <UserProvider>
                <Micuenta></Micuenta>
            </UserProvider>
            <Footer></Footer>
        </div>
    );
}


