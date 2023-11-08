import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import './alacarta.css'
import NavMenu from '@/components/NavMenu/index';
import Pasarela from '@/components/Pasarela/Pasarela';
import CreditComponent from "@/components/Credits/CreditComponent";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Footer from '@/components/Footer/Footer';
import { Metadata } from "next";
import Tabla from "@/components/Tabla/Tabla";

export const metadata: Metadata = {
    title: "Personalizado",
    description: "Advantech Datos: Compra créditos según tus necesidades. Explora nuestro plan personalizado y elige entre varios rangos de precio. Obtén acceso a datos relevantes para tu industria. ¡Únete a nosotros hoy mismo!",
    openGraph: {
        images: ['https://admin.advantech.com.ec/uploads/image_seo_Mesa_de_trabajo_1_4020ecf6f5.png']
    }
}

export default function Alacarta() {

    return (
        <div className="alacarta-back">
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <br></br>
            <br></br>
            <h2 className="alacarta-h2">PLAN A LA CARTA</h2>
            <h1 className="alacarta-h1">Compra créditos según tus necesidades</h1>

            <div id="container-card-element" className="alacarta-container">
                <br></br>
                <div className="alacarta-items">
                    <Tabla></Tabla>
                    <UserProvider>
                        <CreditComponent></CreditComponent>
                    </UserProvider>
                    {/* <br></br>
                <SearchComponent /> */}
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}


