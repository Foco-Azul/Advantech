import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
//import './creditos.css'
import NavMenu from '@/components/NavMenu/index';
import Pasarela from '@/components/Pasarela/Pasarela';
import CreditComponent from "@/components/Credits/CreditComponent";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import SearchComponent from "@/components/SearchComponent/SearchComponent";
import Footer from '@/components/Footer/Footer';


export default function Creditos() {

    return (
        <div>
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <br></br>
            <br></br>
            <div id="container-card-element">
                <h1>Compra tus créditos</h1>
                <br></br>
                <UserProvider>
                    <CreditComponent></CreditComponent>
                </UserProvider>
                {/* <br></br>
                <SearchComponent /> */}

            </div>
            <Footer></Footer>
        </div>
    );
}


