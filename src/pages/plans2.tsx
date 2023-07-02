import React from 'react';
import SubscriptionComponent from '@/components/Suscription/SuscriptionComponent';
import NavMenu from '@/components/NavMenu/index';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import "../app/globals.css"

export default function Plans2() {
    return (
        <div>
            <header className="w-full relative">
                <UserProvider>
                    <NavMenu />
                </UserProvider>
            </header>
            <UserProvider>
                <SubscriptionComponent />
            </UserProvider>
        </div>
    );
}

