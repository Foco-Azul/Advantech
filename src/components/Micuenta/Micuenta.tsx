"use client"
import React, { useEffect, useState } from 'react';
import "./Micuenta.css";
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';

const Micuenta: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlan, setUserPlan] = useState<string | null>(null);
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [planId, setPlanId] = useState<number | null>(null);
    const currentDate = new Date();
    const vencimientoDate = userVencimiento ? new Date(userVencimiento) : null;
    const isPlanVencido = vencimientoDate ? vencimientoDate < currentDate : false;
    const [purchaseHistory, setPurchaseHistory] = useState<Array<any>>([]);

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

    useEffect(() => {
        getuser()
            .then((foundUser) => {
                if (foundUser) {
                    setUserPlan(foundUser.attributes.plan?.data.attributes.Plan);
                    setUserCredits(foundUser.attributes.creditos);
                    setUserVencimiento(foundUser.attributes.vencimiento);
                    setUserId(foundUser.id)
                    setPlanId(foundUser.attributes.plan?.data.id)
                    setPurchaseHistory(foundUser.attributes.historials.data); // Set the purchase history
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
    }, [user]);

    const purchaseHistoryFiltered = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta === "");
    const searchHistory = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta !== null &&  purchase.attributes.creditos < 0);

    return (
        <UserProvider>
            <br></br>
            <br></br>
            <br></br>
            <h2 className="micuenta-h2">{userEmail}</h2>
            <h1 className="micuenta-h1">MI CUENTA</h1>
            <br></br>
            <br></br>
            <h2>{userEmail}</h2>
            <h2>Mis créditos actuales {userCredits}</h2>
            <h2>Mi plan activo {userPlan}</h2>
            <h2>Fecha de vencimiento del plan {userVencimiento}</h2>
            <h2>Mi historial de compras:</h2>
            <div className="purchase-history-container">
                <div className="purchase-history-scroll">
                    <h2>Mis compras:</h2>
                    <ul>
                        {purchaseHistoryFiltered.map((purchase: any) => (
                            <li key={purchase.id}>
                                <p>Fecha: {purchase.attributes.fecha}</p>
                                <p>Precio: {purchase.attributes.precio}</p>
                                <p>Créditos: {purchase.attributes.creditos}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <br></br>     <br></br>
            <h2>Mi historial de búsquedas:</h2>
            <div className="purchase-history-container">
                <div className="purchase-history-scroll">
                    <ul>
                        {searchHistory.map((search: any) => (
                            <li key={search.id}>
                                <p>Fecha: {search.attributes.fecha}</p>
                                <p>Precio: {search.attributes.precio}</p>
                                <p>Créditos: {search.attributes.creditos}</p>
                                <p>Consulta: {search.attributes.consulta}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </UserProvider >
    );
};

export default Micuenta;
