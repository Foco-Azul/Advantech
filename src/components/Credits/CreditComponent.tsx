"use client";
import React, { useState, useEffect } from 'react';
import "./CreditComponent.css";
import Pasarela from '../Pasarela/Pasarela';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';

interface SubscriptionCardProps {
    price: number;
    plan: string;
    userPlanPrice: number | null;
    creditos: number;
    userCredits: number | null;
    planid: number | null;
    planActual: number | null;
    planvencimiento: number;
    uservencimiento: string | number | null;
    userid: number | null;
    userCorreo: string | null;
    auth0: boolean | null;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ userid, price, plan, planvencimiento, userPlanPrice, uservencimiento, creditos, userCredits, planid, planActual, userCorreo, auth0 }) => {
    const { user } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const [esValido, setEsValido] = useState(true);
    const [buycredits, setBuyCredits] = useState<number>(0);
    const [buycreditsInput, setBuyCreditsInput] = useState<number>(0);
    const [priceTiers, setPriceTiers] = useState<any[]>([]);
    const [planValido, setPlanValido] = useState<boolean>(false);
    const [dataPlan, setDataPlan] = useState<Plan | null>(null);
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
        window.location.reload();
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value.replace(/[^\d]/g, '');
        const numericValue = parseFloat(inputValue);
        if(!planValido){
            if (!isNaN(numericValue)) {
                if (numericValue >= priceTiers[0]?.attributes.minimo){
                    if(numericValue <= priceTiers[priceTiers.length - 1]?.attributes.maximo){
                        setEsValido(true)
                        setBuyCredits(numericValue)
                    }else{
                        setBuyCredits(Math.round(priceTiers[priceTiers.length - 1]?.attributes.maximo))
                        setEsValido(true)
                    }
                }else{
                    if(numericValue > 0){
                        setBuyCredits(numericValue);
                        setEsValido(false);
                    }else{
                        setBuyCredits(0);
                        setEsValido(false);
                    }
                }
            } else {
                setEsValido(false);
                setBuyCredits(0);
            }
        }else{
            if (!isNaN(numericValue)) {
                if (numericValue >= Math.round(3 / ((dataPlan as Plan).attributes.Precio / (dataPlan as Plan).attributes.Creditos))){
                    if(numericValue <= (dataPlan as Plan).attributes.Creditos){
                        setEsValido(true)
                        setBuyCredits(numericValue)
                    }else{
                        setBuyCredits((dataPlan as Plan).attributes.Creditos)
                        setEsValido(true)
                    }
                }else{
                    if(numericValue > 0){
                        setEsValido(false);
                        setBuyCredits(numericValue);
                    }else{
                        setBuyCredits(0);
                        setEsValido(false);
                    }
                }
            } else {
                setEsValido(false);
                setBuyCredits(0);
            }
        }
    };
    
    async function planalacarta() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/plan-a-la-cartas`, {

                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                },
                cache: "no-store",
            });
            if (response.status !== 200) {
                throw new Error(`Failed to fetch data, ${response.status}`);
            }
            const data = await response.json();
            const planalacarta = data.data
            return planalacarta;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }

    useEffect(() => {
        if (!user) {
            // Lógica para obtener los datos de la API y establecer los price tiers
            planalacarta().then((data) => {
                setPriceTiers(data);
                setBuyCredits(data[0]?.attributes.minimo); // Establecer el valor inicial como el mínimo de la API
            });
        }else{
            if(uservencimiento && planActual !=4 && new Date(uservencimiento) > new Date()){
                getPlan(Number(planActual)).then((foundPlan) => {
                    if(foundPlan){
                        setDataPlan(foundPlan)
                        setPlanValido(true);
                        setBuyCredits(Math.round(3 / (foundPlan.attributes.Precio / foundPlan.attributes.Creditos)))
                    }else{
                        // Lógica para obtener los datos de la API y establecer los price tiers
                        planalacarta().then((data) => {
                            setPriceTiers(data);
                            setBuyCredits(data[0]?.attributes.minimo); // Establecer el valor inicial como el mínimo de la API
                        });
                        setPlanValido(false);
                    }
                })
                setPlanValido(false);
            }else{
                planalacarta().then((data) => {
                    setPriceTiers(data);
                    setBuyCredits(data[0]?.attributes.minimo); // Establecer el valor inicial como el mínimo de la API
                });
                setPlanValido(false);
            }
        }
        }, [user, planActual, userCredits]);
        async function getPlan(id : number) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/planes/${id}`,
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
          const foundPlan = await response.json();
          return foundPlan.data;
      }catch(e){

      }
    }

    // Aquí puedes hacer lo que necesites con el nuevo precio, como enviarlo a la pasarela de pago
    if(!planValido){
        let nuevoPrecio = 0;
        if (buycredits > 0) {
            const selectedTier = priceTiers.find(tier => buycredits >= tier.attributes.minimo && buycredits <= tier.attributes.maximo);
            if (selectedTier) {
                nuevoPrecio = buycredits * selectedTier.attributes.preciocredito;
            } else {
                nuevoPrecio = buycredits * priceTiers[priceTiers.length - 1].attributes.preciocredito;
            }
        }
        return (
            <div className="credit-card">
                <p className="credit-card-p">Tus créditos actuales: {userCredits}</p>
                <h3>Cantidad de créditos a comprar</h3>
                <input
                    className="credit-input"
                    type="text"
                    value={buycredits === 0
                        ? ''
                        : buycredits.toLocaleString('es-ES', {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                            useGrouping: true, // Usar agrupación de miles
                          })}
                    onChange={handleInputChange}
                />
    
                <hr className="credit-hr" />
    
                <h3>Precio: ${nuevoPrecio.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true,})}</h3>
                {shouldShowBuyCreditsButton && esValido && (
                    <p>${(nuevoPrecio / buycredits).toLocaleString('es-ES')} por crédito</p>
                )}
    
                {shouldShowBuyCreditsButton && esValido && (
                    <button className="credit-button" onClick={handleSubscribe}>Comprar {buycredits.toLocaleString('es-ES', {useGrouping: true})} créditos</button>
                )}
    
                {shouldShowVerifyAccountButton && (
                    <Link href={"/confirmar-correo"}><button className="credit-button">Verifica tu cuenta</button></Link>
                )}
                {shouldShowCreateAccountButton && (
                    <a href={"/api/auth/login"}> <button className="credit-button">Ingresa con tu cuenta</button></a>
                )}
    
                {isOpen && (
                    <div className="credit-popup">
                        <div className="credit-popup-content">
                            <button className="credit-close-button" onClick={handleClose}>
                                X
                            </button>
                            <h4>Confirmar tus creditos</h4>
                            <p>Precio: ${nuevoPrecio.toFixed(2)}</p>
                            <p>Créditos a obtener {buycredits.toLocaleString()}</p>
                            <br></br>
                            <Pasarela
                                planvencimiento={planvencimiento}
                                uservencimiento={uservencimiento}
                                price={nuevoPrecio}
                                plan={plan}
                                creditos={buycredits}
                                userCredits={userCredits}
                                planid={4}
                                planActual={planActual}
                                userid={userid}
                                userCorreo={userCorreo} />
                        </div>
                    </div>
                )}
            </div>
        );
    }else{
        let nuevoPrecio = 0;
        if (buycredits > 0) {
            const selectedTier = buycredits >= Math.round(3 / ((dataPlan as Plan).attributes.Precio / (dataPlan as Plan).attributes.Creditos)) && buycredits <= (dataPlan as Plan).attributes.Creditos;
            if (selectedTier) {
                nuevoPrecio = parseFloat((buycredits * ((dataPlan as Plan).attributes.Precio / (dataPlan as Plan).attributes.Creditos)).toFixed(2));
            }
        }
        return (
            <div className="credit-card">
                <p className="credit-card-p">Tus créditos actuales: {userCredits}</p>
                <h3>Cantidad de créditos a comprar</h3>
                <input
                    className="credit-input"
                    type="text" // Cambia el tipo de 'number' a 'text'
                    //min={priceTiers[0]?.attributes.minimo}
                    //max={priceTiers[priceTiers.length - 1]?.attributes.maximo}
                    value={buycredits === 0 ? '' : buycredits.toLocaleString('es-ES',{useGrouping: true})}
                    onChange={handleInputChange}
                />
    
                <hr className="credit-hr" />
    
                <h3>Precio: ${nuevoPrecio.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true})}</h3>
                {shouldShowBuyCreditsButton && esValido && (
                    <p>${(nuevoPrecio / buycredits).toLocaleString('es-ES')} por crédito</p>
                )}
    
                {shouldShowBuyCreditsButton && esValido && (
                    <button className="credit-button" onClick={handleSubscribe}>Comprar {buycredits.toLocaleString('es-ES', {useGrouping: true})} créditos</button>
                )}
    
                {shouldShowVerifyAccountButton && (
                    <Link href={"/confirmar-correo"}><button className="credit-button">Verifica tu cuenta</button></Link>
                )}
                {shouldShowCreateAccountButton && (
                    <a href={"/api/auth/login"}> <button className="credit-button">Ingresa con tu cuenta</button></a>
                )}
    
                {isOpen && (
                    <div className="credit-popup">
                        <div className="credit-popup-content">
                            <button className="credit-close-button" onClick={handleClose}>
                                X
                            </button>
                            <h4>Confirmar tus creditos</h4>
                            <p>Precio: ${nuevoPrecio.toFixed(2)}</p>
                            <p>Créditos a obtener {buycredits.toLocaleString()}</p>
                            <br></br>
                            <Pasarela
                                planvencimiento={planvencimiento}
                                uservencimiento={uservencimiento}
                                price={nuevoPrecio}
                                plan={plan}
                                creditos={buycredits}
                                userCredits={userCredits}
                                planid={4}
                                planActual={planActual}
                                userid={userid}
                                userCorreo={userCorreo} />
                        </div>
                    </div>
                )}
            </div>
        );
    }
};
interface Plan {
    id: number;
    attributes: {
      lan: string;
      Buscador: boolean;
      Precio: number;
      API: boolean;
      Creditos: number;
      Vencimiento: number;
      XLSX: boolean;
      CSV: boolean;
      TXT: boolean;
      PDF: boolean;
      Soporte: boolean;
    };
  }
const CreditComponent: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlanPrice, setUserPlanPrice] = useState<number | null>(null);
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [planActual, setPlanActual] = useState<number | null>(null);
    const [userCorreo, setUserCorreo] = useState<string | null>(null);
    const [auth0, setAuth0] = useState<boolean | null>(null);
    const [planValido, setPlanValido] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            getuser().then((foundUser) => {
                if (foundUser) {
                    const userPlanData = foundUser.attributes.plan.data?.attributes.Precio;
                    const userCredits = foundUser.attributes.creditos;
                    const userVencimiento = foundUser.attributes.vencimiento;
                    const userId = foundUser.id
                    const planActual = foundUser?.attributes?.plan?.data?.id ?? 4;
                    const userCorreo = foundUser.attributes.email;
                    const auth0 = foundUser.attributes.auth0;
                    setUserPlanPrice(userPlanData);
                    setUserCredits(userCredits);
                    setUserVencimiento(userVencimiento);
                    setUserId(userId)
                    setPlanActual(planActual);
                    setUserCorreo(userCorreo);
                    setAuth0(auth0);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
        }
    }, [user]);
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
    const currentDate = new Date();
    const vencimientoDate = userVencimiento ? new Date(userVencimiento) : null;
    return (
        <div className="credit-component">
            <UserProvider>
                <SubscriptionCard
                    userPlanPrice={userPlanPrice}
                    userCredits={userCredits}
                    uservencimiento={userVencimiento}
                    price={0}
                    plan={'de creditos'}
                    creditos={0}
                    planid={4}
                    planActual={planActual}
                    planvencimiento={6}
                    userid={userId}
                    userCorreo={userCorreo}
                    auth0={auth0} />
            </UserProvider>
        </div>
    );
};

export default CreditComponent;
