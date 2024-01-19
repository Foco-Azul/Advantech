"use client";
import React, { useState, useEffect } from 'react';
import "./SuscriptionComponent.css";
import Pasarela from '../Pasarela/Pasarela';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass, faDatabase, faTable, faCalendarDays, faHeadset, faDownload, faFile} from "@fortawesome/free-solid-svg-icons";

interface SubscriptionCardProps {
    price: number;
    plan: string;
    userPlanPrice: number | null;
    creditos: number;
    userCredits: number | null;
    planid: number;
    planActual: number | null;
    planvencimiento: number;
    uservencimiento: string | number | null;
    userid: number | null;
    buscador: boolean;
    api: boolean;
    xlsx: boolean;
    csv: boolean;
    txt: boolean;
    pdf: boolean;
    soporte: boolean;
    userCorreo: string | null;
    auth0: boolean | null;
}

interface Plan {
    id: number;
    attributes: {
        XLSX: boolean;
        CSV: boolean;
        TXT: boolean;
        PDF: boolean;
        Soporte: boolean;
        Plan: string;
        Buscador: boolean;
        Precio: number;
        Vencimiento: number;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        API: boolean;
        Creditos: number;
    };
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ price, buscador, api, userid, plan, planvencimiento, userPlanPrice, txt, uservencimiento, creditos, userCredits, xlsx, csv, pdf, soporte, planid, planActual, userCorreo, auth0}) => {
    const { user} = useUser();
    const [isOpen, setIsOpen] = useState(false);
    // Lógica para determinar cuándo mostrar cada botón
    const shouldShowCreateAccountButton = user === undefined;
    const shouldShowVerifyAccountButton =
        user &&
        user.sub &&
        user.sub.includes('auth0') &&
        auth0 === false;
    const shouldShowBuyCreditsButton =
        user &&
        ((user.sub && user.sub.includes('auth0') && auth0 === true) || (user.sub && !user.sub.includes('auth0')));

    const handleSubscribe = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <div className="subscription-card">
            <div className="subscription-card-header">
                <h2 className="subscription-plan">{plan}</h2>
                <h3 className="subscription-price"> {(price != 0) ? `$ ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}` : "Desde $3"}</h3>
                <h3 className="subscription-pricecredits">   {(price != 0) ? ` ${price / creditos} / crédito` : ""}</h3>
            </div>
            <hr className="subscription-hr" />
            <div className="subscription-caracteristics">
                <h3><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#009fde", }} />
                    {(price != 0) ? ` ${creditos.toLocaleString()} créditos` : `Hasta  ${creditos.toLocaleString()} créditos`}
                </h3>
                <h3><FontAwesomeIcon icon={faCalendarDays} style={{ color: "#009fde", }}  />
                    Duración de {planvencimiento} meses
                </h3>
                <h3><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#009fde", }} />
                    {buscador ? "Acceso al buscador" : "Sin acceso al buscador"}
                </h3>
                <h3>
                    <FontAwesomeIcon icon={faHeadset} style={{ color: "#009fde" }} />
                    {soporte && (plan === "Personalizado" || plan === "Estándar" || plan === "Premium")
                        ? "Soporte por formulario"
                        : plan === "Enterprise"
                        ? "Soporte por Formulario | Teléfono"
                        : "Soporte personalizado"}
                </h3>
                <h3><FontAwesomeIcon icon={faDownload} style={{ color: "#009fde", }} />
                    {soporte && (plan === "Personalizado" || plan === "Estándar" || plan === "Premium")
                        ? "Entrega de datos (Lotes | Email)"
                        : plan === "Enterprise"
                        ? "Entrega de datos (API | Lotes | Email)"
                        : "Entrega de datos"}
                </h3>
                <h3><FontAwesomeIcon icon={faFile} style={{ color: "#009fde", }} />        
                        Formato de entrega de datos&nbsp;  
                        {[pdf ? "PDF" : null, xlsx ? "XLSX" : null, txt ? "TXT" : null]
                            .filter(element => element !== null)
                            .join(", ")}
                </h3>
            </div>
            {(shouldShowBuyCreditsButton && uservencimiento && new Date(uservencimiento) < new Date()) && (price !== 0) && (
                <button className='subscription-card-button' onClick={handleSubscribe}>Suscribirse</button>
            )}
            {(shouldShowBuyCreditsButton && uservencimiento && new Date(uservencimiento) > new Date()) && (userPlanPrice !== null && price > userPlanPrice) && (price !== 0) && (
                <button className='subscription-card-button' onClick={handleSubscribe}>Suscribirse</button>
            )}
            {(shouldShowVerifyAccountButton && price !== 0) && (
                <Link href={"/confirmar-correo"}><button className="subscription-card-button">Verifica tu cuenta</button></Link>
            )}
            {(shouldShowCreateAccountButton && price !== 0) && (
                <a href={"/api/auth/login"}> <button className="subscription-card-button">Ingresa con tu cuenta</button></a>
            )}
            {(price == 0) &&
                <Link href="/personalizado" legacyBehavior passHref>
                    <button className='subscription-card-button' > Saber más del plan personalizado </button>
                </Link>}
            {isOpen && (
                <div className="subscription-popup">
                    <div className="subscription-popup-content">
                        <button className="subscription-close-button" onClick={handleClose}>
                            X
                        </button>
                        <h4>Confirmar tu suscripción</h4>
                        <h2 className="subscription-plan" >Plan {plan}</h2>
                        <h3 className="subscription-price">Precio: ${price.toLocaleString()}</h3>
                        <p>Créditos a obtener {creditos}</p>
                        <hr className="subscription-hr" />
                        <br></br>
                        <Pasarela
                            userid={userid}
                            planvencimiento={planvencimiento}
                            uservencimiento={uservencimiento}
                            price={price}
                            plan={plan}
                            creditos={creditos}
                            userCredits={userCredits}
                            planid={planid}
                            planActual={planActual}
                            userCorreo={userCorreo}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const SubscriptionComponent: React.FC = () => {
    const [plans, setPlans] = useState<Plan[]>([]);
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlanPrice, setUserPlanPrice] = useState<number | null>(null);
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userCorreo, setUserEmail] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [planActual, setPlanActual] = useState<number | null>(null);
    const [auth0, setAuth0] = useState<boolean | null>(null);

    useEffect(() => {
        getPlanes()
            .then((data) => {
                const sortedPlans = data.sort(
                    (a: { attributes: { Precio: number } }, b: { attributes: { Precio: number } }) =>
                        a.attributes.Precio - b.attributes.Precio
                );
                setPlans(sortedPlans);
            })
        getuser()
            .then((foundUser) => {
                if (foundUser) {
                    const userPlanData = foundUser.attributes.plan.data?.attributes.Precio;
                    const userCredits = foundUser.attributes.creditos;
                    const userVencimiento = foundUser.attributes.vencimiento;
                    const userId = foundUser.id
                    const planActual = foundUser?.attributes?.plan?.data?.id ?? -1;
                    const userCorreo = foundUser.attributes.email;
                    const auth0 = foundUser.attributes.auth0;
                    setUserPlanPrice(userPlanData);
                    setUserCredits(userCredits);
                    setUserVencimiento(userVencimiento);
                    setUserEmail(userCorreo);
                    setUserId(userId);
                    setPlanActual(planActual ?? -1);
                    setAuth0(auth0);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
    }, [user]);

    async function getPlanes() {
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/planes`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                    },
                    cache: "no-store",
                }
            );
            if (response.status !== 200) {
                throw new Error(`Failed to fetch data, ${response.status}`);
            }
            const data = await response.json();
            return data.data;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }

    async function getuser() {
        try {
            const respuestaUnica = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?populate=*&filters[email][$eq]=${userEmail}`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                },
                cache: "no-store",
            });
            const datosRespuesta = await respuestaUnica.json();
            const usuarioStrapi = datosRespuesta.data.find((obj: { attributes: { email: string; }; }) => obj.attributes.email === userEmail);
            return usuarioStrapi;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }
    return (
        <div className="subscription-component">
            <UserProvider>
                {plans.map(plan => (
                    <SubscriptionCard
                        key={plan.id}
                        planid={plan.id}
                        planActual={planActual}
                        price={plan.attributes.Precio}
                        plan={plan.attributes.Plan}
                        userPlanPrice={userPlanPrice}
                        creditos={plan.attributes.Creditos}
                        userCredits={userCredits}
                        planvencimiento={plan.attributes.Vencimiento}
                        uservencimiento={userVencimiento}
                        userid={userId}
                        buscador={plan.attributes.Buscador}
                        api={plan.attributes.API}
                        xlsx={plan.attributes.XLSX}
                        csv={plan.attributes.CSV}
                        txt={plan.attributes.TXT}
                        pdf={plan.attributes.PDF}
                        soporte={plan.attributes.Soporte}
                        userCorreo={userCorreo}
                        auth0={auth0} 
                    />
                ))}
            </UserProvider>
        </div>
    );
};

export default SubscriptionComponent;


