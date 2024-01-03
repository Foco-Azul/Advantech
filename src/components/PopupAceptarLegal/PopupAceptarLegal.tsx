'use client';
import React, { useEffect, useState } from 'react';
import "./PopupAceptarLegal.css";
import Link from 'next/link';
import { getLocalStorage, setLocalStorage } from '@/lib/storageHelper';

export default function VerificarCorreo(){
    const [cookieConsent, setCookieConsent] = useState(false);

    useEffect (() => {
        const storedCookieConsent = getLocalStorage("cookie_consent", null)

        setCookieConsent(storedCookieConsent)
    }, [setCookieConsent])

    
    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", 'update', {
            'analytics_storage': newValue
        });

        setLocalStorage("cookie_consent", cookieConsent)

    }, [cookieConsent]);
    return(
        <>
            <div className={`aceptar-legal my-10 mx-auto max-w-max md:max-w-screen-sm
                            fixed bottom-0 left-0 right-0 
                            ${cookieConsent != null ? "hidden" : "flex"} px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                            `}>

                <div className='text-center'>
                    <Link href="/respaldo-legal"><p><span className='font-bold text-sky-400'>Al navegar en nuestro sitio, aceptas nuestros términos y políticas. Ver más.</span></p></Link>
                </div>
                
                <div className='flex gap-2'>
                    <button className='navigation-menu-button' onClick={() => setCookieConsent(false)}>Confirmar</button>
                </div>   
            </div>
        </>
    )
}