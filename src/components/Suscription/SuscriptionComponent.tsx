import React, { useState, useEffect } from 'react';
import "./SuscriptionComponent.css";
import Pasarela from '../Pasarela/Pasarela';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

interface SubscriptionCardProps {
    price: number;
    plan: string;
    userPlanPrice: number | null;
    creditos: number;
    userCredits: number | null;
    planid: number;
    planvencimiento: number;
    uservencimiento: string | number | null;
    userid: number | null;
    buscador: boolean;
    api: boolean;
}

interface Plan {
    id: number;
    attributes: {
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

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ price, buscador, api, userid, plan, planvencimiento, userPlanPrice, uservencimiento, creditos, userCredits, planid }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSubscribe = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="subscription-card">
            <h2>{plan}</h2>
            <h3>Precio: ${price}</h3>
            <h3>Créditos: {creditos}</h3>
            <h3>Suscripción x {planvencimiento} meses</h3>
            <h3>{ buscador ? "Acceso al buscador" : "Sin acceso al buscador"}</h3>
            <h3>{ api ? "Acceso a la api" : "Sin acceso a la api"}</h3>
            {(uservencimiento && new Date(uservencimiento) < new Date()) && (price !== 0) && (
                <button onClick={handleSubscribe}>Suscribirse</button>
            )}
            {(uservencimiento && new Date(uservencimiento) > new Date()) && (userPlanPrice !== null && price > userPlanPrice) && (price !== 0) && (
                <button onClick={handleSubscribe}>Suscribirse</button>
            )}
            {isOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <button className="close-button" onClick={handleClose}>
                            X
                        </button>
                        <h4>Confirmar tu suscripción</h4>
                        <h3>Plan {plan}</h3>
                        <p>Precio: ${price}</p>
                        <p>Créditos a obtener {creditos}</p>
                        <Pasarela userid={userid} planvencimiento={planvencimiento} price={price} plan={plan} creditos={creditos} userCredits={userCredits} planid={planid} />
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
    const [userId, setUserId] = useState<number | null>(null);

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
                    const userPlanData = foundUser.attributes.plan?.data.attributes.Precio;
                    const userCredits = foundUser.attributes.creditos;
                    const userVencimiento = foundUser.attributes.vencimiento;
                    const userId = foundUser.id
                    setUserPlanPrice(userPlanData);
                    setUserCredits(userCredits);
                    setUserVencimiento(userVencimiento);
                    setUserId(userId);

                    console.log("Precio:", userPlanData)
                    console.log("Creditos:", userCredits)
                    console.log("Uservencimiento:", userVencimiento)
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

    return (
        <div className="subscription-component">

            <UserProvider>
                {plans.map(plan => (
                    <SubscriptionCard
                        key={plan.id}
                        planid={plan.id}
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
                    />
                ))}
            </UserProvider>
        </div>
    );
};

export default SubscriptionComponent;
