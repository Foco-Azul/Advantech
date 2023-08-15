"use client";
import React, { useState, useEffect } from 'react';
import "./CreditComponent.css";
import Pasarela from '../Pasarela/Pasarela';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

interface SubscriptionCardProps {
    price: number;
    plan: string;
    userPlanPrice: number | null;
    creditos: number;
    userCredits: number | null;
    planid: number | null;
    planvencimiento: number;
    uservencimiento: string | number | null;
    userid: number | null;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ userid, price, plan, planvencimiento, userPlanPrice, uservencimiento, creditos, userCredits, planid }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [buycredits, setBuyCredits] = useState(0);
    const [priceTiers, setPriceTiers] = useState<any[]>([]);

    const handleSubscribe = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        if (!isNaN(inputValue) && inputValue >= priceTiers[0]?.attributes.minimo && inputValue <= priceTiers[priceTiers.length - 1]?.attributes.maximo) {
            setBuyCredits(inputValue);
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
            console.log("planalacarta:", planalacarta)
            return planalacarta;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }

    useEffect(() => {
        // Lógica para obtener los datos de la API y establecer los price tiers
        planalacarta().then((data) => {
            setPriceTiers(data);
            setBuyCredits(data[0]?.attributes.minimo); // Establecer el valor inicial como el mínimo de la API
        });
    }, []);


    let nuevoPrecio = 0;
    if (buycredits > 0) {
        const selectedTier = priceTiers.find(tier => buycredits >= tier.attributes.minimo && buycredits <= tier.attributes.maximo);
        if (selectedTier) {
            nuevoPrecio = buycredits * selectedTier.attributes.preciocredito;
        } else {
            nuevoPrecio = buycredits * priceTiers[priceTiers.length - 1].attributes.preciocredito;
        }
    }

    // Aquí puedes hacer lo que necesites con el nuevo precio, como enviarlo a la pasarela de pago
    console.log('Nuevo precio:', nuevoPrecio);


    return (
        <div className="credit-card">
            <p className="credit-card-p">Tus créditos actuales: {userCredits}</p>
            <h3>Cantidad de créditos a comprar</h3>
            <input
                className="credit-input"
                type="number"
                min={priceTiers[0]?.attributes.minimo}
                max={priceTiers[priceTiers.length - 1]?.attributes.maximo}
                value={buycredits.toString()}
                onChange={handleInputChange}
                placeholder="Ingrese la cantidad de créditos"
            />
            <hr className="credit-hr" />

            <h3>Precio: ${nuevoPrecio.toFixed(2)}</h3>
            <p>${(nuevoPrecio / buycredits).toFixed(2)} por crédito</p>

            <button className="credit-button" onClick={handleSubscribe}>Comprar {buycredits} créditos</button>

            {isOpen && (
                <div className="credit-popup">
                    <div className="credit-popup-content">
                        <button className="credit-close-button" onClick={handleClose}>
                            X
                        </button>
                        <h4>Confirmar tus creditos</h4>
                        <p>Precio: ${nuevoPrecio.toFixed(2)}</p>
                        <p>Créditos a obtener {buycredits}</p>
                        <br></br>
                        <Pasarela
                            planvencimiento={planvencimiento}
                            price={nuevoPrecio}
                            plan={plan}
                            creditos={buycredits}
                            userCredits={userCredits}
                            planid={4}
                            userid={userid}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

const CreditComponent: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlanPrice, setUserPlanPrice] = useState<number | null>(null);
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [planId, setPlanId] = useState<number | null>(null);

    useEffect(() => {
        getuser()
            .then((foundUser) => {
                if (foundUser) {
                    const userPlanData = foundUser.attributes.plan?.data.attributes.Precio;
                    const userCredits = foundUser.attributes.creditos;
                    const userVencimiento = foundUser.attributes.vencimiento;
                    const userId = foundUser.id
                    const planId = foundUser.attributes.plan?.data.id

                    setUserPlanPrice(userPlanData);
                    setUserCredits(userCredits);
                    setUserVencimiento(userVencimiento);
                    setUserId(userId)
                    setPlanId(planId)

                    console.log("Precio:", userPlanData)
                    console.log("Creditos:", userCredits)
                    console.log("Uservencimiento:", userVencimiento)
                    console.log("userid:", userId)
                    console.log("planid:", planId)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });

    }, [user]);

    async function getuser() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?populate=*`, {

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
            const foundUser = data.data.find((obj: { attributes: { email: string | null | undefined; }; }) => obj.attributes.email === userEmail);

            console.log("founduser", foundUser)
            return foundUser;
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
                    planvencimiento={6}
                    userid={userId}
                />

            </UserProvider>
        </div>
    );
};

export default CreditComponent;
