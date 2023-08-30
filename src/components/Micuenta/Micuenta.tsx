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

    // ... your existing getuser function ...
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
                    setPurchaseHistory(foundUser.attributes.historials.data);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
    }, [user]);

    const purchaseHistoryFiltered = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta === "");
    const searchHistory = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta !== null && purchase.attributes.creditos < 0);

    const [activeTab, setActiveTab] = useState<'datos' | 'compras' | 'busquedas'>('datos');

    return (
        <UserProvider>
            <div>
                <br></br>
                <br></br>
                <br></br>
                <h2 className="micuenta-h2">{userEmail}</h2>
                <h1 className="micuenta-h1">MI CUENTA</h1>
                <br></br>
                <br></br>
                <div className="micuenta-container">
                    <div className="tab-buttons">
                        <button
                            className={`tab-button ${activeTab === 'datos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('datos')}
                        >
                            Mis Datos
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'compras' ? 'active' : ''}`}
                            onClick={() => setActiveTab('compras')}
                        >
                            Historial de Compras
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'busquedas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('busquedas')}
                        >
                            Historial de Búsquedas
                        </button>
                    </div>

                    <div className='micuenta-datos-container'>
                        {activeTab === 'datos' && (
                            <div>
                                <h2 className='micuenta-h2-datos'>Mis datos</h2>
                                <div className='micuenta-datos'>
                                    <div className='micuenta-datos-card'>
                                        <span className='micuenta-datos-title'>Mis créditos actuales </span>
                                        <span className='micuenta-datos-subtitle'>{userCredits}</span>
                                    </div>
                                    <div className='micuenta-datos-card'>
                                        <span className='micuenta-datos-title'>Mi plan activo </span>
                                        <span className='micuenta-datos-subtitle'>{userPlan}</span>
                                    </div>
                                    <div className='micuenta-datos-card'>
                                        <span className='micuenta-datos-title'>Fecha de vencimiento</span>
                                        <span className='micuenta-datos-subtitle'>{userVencimiento}</span>
                                    </div>
                                </div>
                            </div>

                        )}
                        {activeTab === 'compras' && (
                            <>
                                <h2 className='micuenta-h2-datos'>Mi historial de compras</h2>
                                <div className="purchase-history-container">
                                    <div className="purchase-history-scroll">
                                        <table className="micuenta-history-table">
                                            <thead className="micuenta-history-table-head">
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Precio</th>
                                                    <th>Créditos</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {purchaseHistoryFiltered.map((purchase: any) => (
                                                    <tr key={purchase.id}>
                                                        <td>{purchase.attributes.fecha}</td>
                                                        <td>${purchase.attributes.precio}</td>
                                                        <td>{purchase.attributes.creditos}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div></>


                        )}
                        {activeTab === 'busquedas' && (
                            <>
                                <h2 className='micuenta-h2-datos'>Mi historial de búsquedas</h2>
                                <div className="purchase-history-container">
                                    <div className="purchase-history-scroll">
                                        <table className="micuenta-history-table">
                                            <thead className="micuenta-history-table-head" >
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Consumo créditos</th>
                                                    <th>Consulta</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {searchHistory.map((search: any) => (
                                                    <tr key={search.id}>
                                                        <td>{search.attributes.fecha}</td>
                                                        <td>{search.attributes.creditos}</td>
                                                        <td>{search.attributes.consulta}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>



                </div>

            </div>
        </UserProvider>
    );
};

export default Micuenta;
