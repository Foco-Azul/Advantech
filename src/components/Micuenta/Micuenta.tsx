"use client"
import React, { useEffect, useState, useRef } from 'react';
import "./Micuenta.css";
import "./script.js";
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import { useUrl } from 'nextjs-current-url';
import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";

const Micuenta: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlan, setUserPlan] = useState<string | null>(null);
    const [userapi, setUserapi] = useState<string | null>("xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx");
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [planId, setPlanId] = useState<number | null>(null);
    const currentDate = new Date();
    const vencimientoDate = userVencimiento ? new Date(userVencimiento) : null;
    const isPlanVencido = vencimientoDate ? vencimientoDate < currentDate : false;
    const [purchaseHistory, setPurchaseHistory] = useState<Array<any>>([]);
    const [showApiSection, setShowApiSection] = useState(false);
    const [apiSectionClicked, setApiSectionClicked] = useState(false);
    const purchaseHistoryFiltered = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta === "");
    const searchHistory = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta !== null && purchase.attributes.creditos < 0);
    const [activeTab, setActiveTab] = useState<'datos' | 'compras' | 'soporte' | 'api' | 'busquedas'>('datos');
    const apiKeyRef = useRef<HTMLDivElement | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [apiset, setApiset] = useState(false);
    const { href: currentUrl, pathname } = useUrl() ?? {};
    

    // Función para mostrar u ocultar la sección API
    const toggleApiSection = () => {
        // Si no se ha hecho clic en la sección API, entonces realiza la llamada para obtener el valor real de la API
        if (!apiSectionClicked) {
            getuser()
                .then((foundUser) => {
                    if (foundUser) {
                        setUserapi(foundUser.attributes.apikey);
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch user data:', error);
                });
            setApiSectionClicked(true); // Actualiza el estado para indicar que se hizo clic en la sección API
        }
        setShowApiSection(!showApiSection);
    };
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
                    setApiset(foundUser.attributes.plan?.data.attributes.API)
                    setUserId(foundUser.id)
                    setPlanId(foundUser.attributes.plan?.data.id)
                    setPurchaseHistory(foundUser.attributes.historials.data);
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
    }, [user]);


    const copyApiKeyToClipboard = () => {
        if (apiKeyRef.current) {
            const apiKeyText = apiKeyRef.current.innerText;
            navigator.clipboard.writeText(apiKeyText).then(() => {
                setIsCopied(true); // Actualiza el estado para mostrar "Copiado"
                setTimeout(() => {
                    setIsCopied(false); // Restaura el estado después de un tiempo
                }, 2000); // Cambia esto si deseas que el mensaje desaparezca más rápido o más lento
            });
        }
    };
    return (
        <UserProvider>
            <>
            <br />
            {user !== undefined && (
            <div className="micuenta-div-container">
                <br></br>
                <br></br>
                <br></br>
                <h2 className="micuenta-h2">{userEmail}</h2>
                <h1 className="micuenta-h1">MI CUENTA</h1>
                <br></br>
                <br></br>
                <div className="micuenta-container">
                    <div className="tab-buttons">
                        <button id='datos'
                            className={`tab-button ${activeTab === 'datos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('datos')}
                        >
                            Mis Datos
                        </button>
                        <button id='compras'
                            className={`tab-button ${activeTab === 'compras' ? 'active' : ''}`}
                            onClick={() => setActiveTab('compras')}
                        >
                            Historial de Compras
                        </button>
                        <button id='busquedas'
                            className={`tab-button ${activeTab === 'busquedas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('busquedas')}
                        >
                            Historial de Búsquedas
                        </button>
                        <button id='soporte'
                            className={`tab-button ${activeTab === 'soporte' ? 'active' : ''}`}
                            onClick={() => setActiveTab('soporte')}
                        >
                            Soporte
                        </button>

                        {apiset && <button id='api'
                            className={`tab-button ${activeTab === 'api' ? 'active' : ''}`}
                            onClick={() => setActiveTab('api')}
                        >
                            API
                        </button>}

                    </div>

                    <div className='micuenta-datos-container'>
                        {activeTab === 'datos' && (
                            <div>
                                <h2 className='micuenta-h2-datos'>Mis datos</h2>
                                <div className='micuenta-datos'>
                                    <div className='micuenta-datos-card'>
                                        <span className='micuenta-datos-title'>Mis créditos actuales </span>
                                        <span className='micuenta-datos-subtitle'>{userCredits}</span>
                                        {(userCredits != null && userCredits < 5) && (
                                            <>
                                                <Link href={"/planes"}>
                                                    <button className='tab-button renovar' >
                                                        Recargar Créditos
                                                    </button>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    <div className='micuenta-datos-card'>
                                        <span className='micuenta-datos-title'>Mi plan activo </span>
                                        <span className='micuenta-datos-subtitle'>{userPlan}</span>
                                    </div>
                                    <div className='micuenta-datos-card'>
                                        <span className='micuenta-datos-title'>Fecha de vencimiento</span>
                                        <span className='micuenta-datos-subtitle'>{userVencimiento}</span>
                                        {(isPlanVencido) && (
                                            <>
                                                <Link href={"/planes"}>
                                                    <button className='tab-button renovar' >
                                                        Renovar Plan
                                                    </button>
                                                </Link>
                                            </>
                                        )}
                                    </div>
                                    {/* Verificar si los créditos son 0 o el plan está vencido */}

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
                                                {searchHistory.slice() // Copia el array para no modificar el original
                                                    .sort((a, b) => {
                                                        const dateA = new Date(a.attributes.fecha);
                                                        const dateB = new Date(b.attributes.fecha);
                                                        if (dateA > dateB) return -1; // Ordena por fecha en orden descendente (más reciente primero)
                                                        if (dateA < dateB) return 1;
                                                        return 0;
                                                    })
                                                    .map((search: any) => (
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

                        {activeTab === 'soporte' && (
                            <div>
                                <h2 className='micuenta-h2-datos'>Soporte</h2>
                                <div className='micuenta-datos'>

                                    <div className='micuenta-datos-card'>
                                        <span className='micuenta-datos-title'> Tipo de soporte</span>
                                        <span className='micuenta-datos-subtitle'>{userPlan}</span>
                                    </div>
                                    <div>
                                        <br></br>
                                        <p>Si necesitas ayuda envianos un mail a </p>
                                        <a href="mailto:contacto@advantech.com">contacto@advantech.com</a>
                                        {userPlan == "Enterprise" &&
                                            <>
                                                <br></br>
                                                <br></br>
                                                <a className="tab-button" href="https://api.whatsapp.com/send?phone=17049707717">Solicitar soporte por WhatsApp</a>
                                            </>

                                        }
                                    </div>
                                    {/* Verificar si los créditos son 0 o el plan está vencido */}

                                </div>
                            </div>
                        )}

                        {/* Resto de tu código ... */}
                        {activeTab === 'api' && (
                            <div>
                                <h2 className="micuenta-h2-datos">API</h2>
                                <div className="micuenta-datos api">
                                    {/* No se muestra el botón "Mostrar API" cuando se ha hecho clic */}

                                    <br></br>
                                    <br></br>
                                    {/* Sección API condicionalmente visible */}
                                    <div>
                                        <div className="micuenta-api-box" onClick={copyApiKeyToClipboard}>
                                            <div ref={apiKeyRef}>{userapi}</div>
                                        </div>
                                        {isCopied && <div className="copied-text">Copiado</div>}
                                    </div>
                                    <br></br>
                                    {!apiSectionClicked && (
                                        <div
                                            className="tab-button"
                                            onClick={() => {
                                                toggleApiSection();
                                                setApiSectionClicked(true);
                                            }}
                                        >
                                            Mostrar API
                                        </div>
                                    )}

                                </div>
                            </div>
                        )}


                    </div>
                </div>
            </div >
             )}
             {user === undefined && (
            <SeccionCreaTuCuenta />
            )}
            </>
        </UserProvider >
    );
};

export default Micuenta;
