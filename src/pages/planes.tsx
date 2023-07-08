import React from 'react';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import Footer from '@/components/Footer/Footer';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../app/globals.css"
import './planes.css'

export default function Planes() {
    return (
        <div className="plans-back">
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <br></br>
            <br></br>
            <h2 className="plans2-h2">PRECIOS</h2>
            <h1 className="plans2-h1">Planes flexibles que se adaptan a tu necesidad de datos</h1>
            <UserProvider>
                <SubscriptionComponent />
            </UserProvider>
            <Footer/>
        </div>
    );
}

