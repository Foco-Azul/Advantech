"use client"
import React, { useEffect, useState, useRef } from 'react';
import "./Micuenta.css";
import "./script.js";
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import Link from "next/link";
import { useUrl } from 'nextjs-current-url';
import SeccionCreaTuCuenta from "@/components/Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta";
import SeccionFormulario from "@/components/Micuenta/SeccionFormulario/SeccionFormulario";
import { ArrowRight } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";


const Micuenta: React.FC = () => {
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlan, setUserPlan] = useState<string | null>(null);
    const [userapi, setUserapi] = useState<string | null>("xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx");
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userActivo, setUserActivo] = useState<boolean | null>(null);
    const [planId, setPlanId] = useState<number | null>(null);
    const currentDate = new Date();
    const vencimientoDate = userVencimiento ? new Date(userVencimiento) : null;
    const isPlanVencido = vencimientoDate ? vencimientoDate < currentDate : false;
    const [purchaseHistory, setPurchaseHistory] = useState<Array<any>>([]);
    const [showApiSection, setShowApiSection] = useState(false);
    const [apiSectionClicked, setApiSectionClicked] = useState(false);
    const purchaseHistoryFiltered = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta === "");
    const searchHistory = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta !== null && purchase.attributes.creditos < 0);
    console.log("planActual2", planId)
    interface PurchasePagina {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      }
    const [purchasePagosPaginas, setPurchasePagosPaginas] = useState<PurchasePagina | null>(null)
    const purchasePaginas = purchasePagosPaginas;
    const correos = [
        'carlosvargasbazoalto@gmail.com',  
        'santiago.rodriguez@hctint.com'];
    const [botonActivo, setBotonActivo] = useState<number | null>(null);
    const [purchasePagosTodos, setPurchasePagos] = useState<any[]>([]);
    const purchasePagos = purchasePagosTodos;
    const [activeTab, setActiveTab] = useState<'datos' | 'compras' | 'soporte' | 'api' | 'pagos' | 'busquedas'>('datos');
    const apiKeyRef = useRef<HTMLDivElement | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [apiset, setApiset] = useState(false);
    const { href: currentUrl, pathname } = useUrl() ?? {};
    const [mostrarEliminarCuenta, setMostrarEliminarCuenta] = useState(false);
    // Agregar la función para verificar y mostrar el valor de 'ver' en la consola
    const checkAndLogVerParam = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const codigo = urlSearchParams.get('ver');
        if (codigo) {
            switch (codigo) {
                case 'datos':
                    setActiveTab('datos');
                    break;
                case 'compras':
                    setActiveTab('compras');
                    break;
                case 'busquedas':
                    setActiveTab('busquedas');
                    break;
                case 'soporte':
                    setActiveTab('soporte');
                    break;
                // Agrega más casos según tus necesidades
                default:
                    break;
            }
        }
    };

    function handleOnClick() {
        // Cuando haces clic en el enlace, cambia el estado para mostrar el div "Eliminar cuenta"
        setMostrarEliminarCuenta(true);
    }
    function handleClosePopup() {
        setMostrarEliminarCuenta(false);
    }
    const handleDarseDeBaja = async () => {
        if (user) {
            // Realizar el POST con los datos requeridos
            const postResponse = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${userId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        data: {
                            estaactivo: false
                        },
                    }),
                    cache: "no-store",
                }
            );
            if (postResponse.status === 200) {
                console.log("la cuenta fue dado de baja");
                const postResponse2 = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/correo-enviados`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`
                        },
                        body: JSON.stringify({
                            data: {
                                nombre: userEmail,
                                asunto: "Cuenta inactiva",
                                para: userEmail,
                                contenido: "30"
                            },
                        }),
                        cache: "no-store",
                    }
                );
                // Recargar la página después de completar ambos POST
                window.location.reload();
            } else {
                console.log(postResponse.status);
                throw new Error(`Failed to create user, ${postResponse.status}`);
            }
        }
    };
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?filters[email][$eq]=${userEmail}&populate=plan.*&populate=historials.archivo`, {

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
    async function getHistorialPagos(page: number) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials?filters[consulta][$eq]=&pagination[page]=${page}`, {

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
            const foundUser = data

            console.log("founduserPagos", foundUser)
            return foundUser;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }
    useEffect(() => {
        // Llamar a la función cuando se carga el componente
        checkAndLogVerParam();
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
                    setUserActivo(foundUser.attributes.estaactivo)
                    console.log(foundUser)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
        console.log("user",user)
        if(user && user.email && correos.includes(user.email)){
            getHistorialPagos(1)
                .then((foundUser) => {
                    if (foundUser) {
                        setPurchasePagos(foundUser.data);
                        setPurchasePagosPaginas(foundUser.meta.pagination)
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch user data:', error);
                });
        }
    }, [user]);
    const handleButtonClick = (key: number) => {
        setBotonActivo(key);
        getHistorialPagos(key)
        .then((foundUser) => {
            if (foundUser) {
                setPurchasePagos(foundUser.data);
                setPurchasePagosPaginas(foundUser.meta.pagination)
            }
        })
        .catch((error) => {
            console.error('Failed to fetch user data:', error);
        });
    };

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
    console.log("searchHistory",purchaseHistoryFiltered)
    console.log("purchasePagos",purchasePagos) 
    if (purchasePagosPaginas && purchasePagosPaginas.pageCount !== undefined) {
        console.log("purchasePaginas", purchasePagosPaginas.pageCount);
      } else {
        console.log("purchasePaginas is undefined or pageCount is not defined.");
      }

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
                                {user.email && correos.includes(user.email) && (
                                    <button
                                        id='pagos'
                                        className={`tab-button ${activeTab === 'pagos' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('pagos')}
                                    >
                                        Facturación
                                    </button>
                                )}
                                <button id='soporte'
                                    className={`tab-button ${activeTab === 'soporte' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('soporte')}
                                >
                                    Soporte
                                </button>

                                <a href="/api/auth/logout" className={"tab-button"}>
                                    Salir
                                </a>

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
                                        <div className='darse-de-baja'>
                                            <a className="hero-icon-container" onClick={handleOnClick}>
                                                Darse de baja <ArrowRight className="hero-icon" />
                                            </a>
                                        </div>

                                        {mostrarEliminarCuenta && ( // Mostrar el div "Eliminar cuenta" si mostrarEliminarCuenta es true
                                            <div className="overlay">
                                                <div className='eliminar-cuenta'>
                                                    <div className="cerrar-popup">
                                                        <FontAwesomeIcon icon={faCircleXmark} size="2xl" onClick={handleClosePopup} />
                                                    </div>
                                                    <h3 className='micuenta-h2'>Darse de baja</h3>
                                                    <ul>
                                                        <li>Tu acceso al sitio se eliminará por completo.</li>
                                                        <li>Ya no recibirás correos electrónicos por parte de Advantech Datos.</li>
                                                        <li>Sin embargo, tus registros de pagos y búsquedas seguirán almacenados en nuestra base de datos.</li>
                                                    </ul>
                                                    <br />
                                                    {userActivo ? (
                                                        <p><strong>Tu cuenta se dará de baja en las próximas 24 horas.</strong></p>
                                                    ) : (
                                                        <p><strong>Esta cuenta se la dará de baja en las próximas 24 horas.</strong></p>
                                                    )}
                                                    {userActivo ? (
                                                        <button
                                                            className={`navigation-menu-button`}
                                                            onClick={handleDarseDeBaja}
                                                        >
                                                            Darse de baja
                                                        </button>
                                                    ) : (
                                                        <br />
                                                    )}
                                                </div>
                                            </div>
                                        )}

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
                                                            <th>Archivo</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {searchHistory.slice() // Copia el array para no modificar el original
                                                            .sort((a, b) => {
                                                                const dateA = new Date(a.attributes.publishedAt);
                                                                const dateB = new Date(b.attributes.publishedAt);
                                                                if (dateA > dateB) return -1; // Ordena por fecha en orden descendente (más reciente primero)
                                                                if (dateA < dateB) return 1;
                                                                return 0;
                                                            })
                                                            .map((search: any) => (
                                                                <tr key={search.id}>
                                                                    <td>{search.attributes.fecha}</td>
                                                                    <td>{search.attributes.creditos}</td>
                                                                    <td>{search.attributes.consulta}</td>
                                                                    <td>
                                                                        {search.attributes.archivo.data?.attributes.url ? (
                                                                            <a
                                                                                href={`${process.env.NEXT_PUBLIC_STRAPI_URL}${search.attributes.archivo.data?.attributes.url}`}
                                                                                target="_blank"
                                                                                rel="noopener noreferrer"
                                                                            >
                                                                                ⤵️
                                                                            </a>
                                                                        ) : (
                                                                            <span>No disponible</span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ))}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </>
                                )}
                               {activeTab === 'pagos' && user.email && correos.includes(user.email) &&(
                                    <>
                                        <h2 className='micuenta-h2-datos'>Facturación</h2>
                                        <div className="purchase-history-container pagos">
                                            <div className="purchase-history-scroll">
                                                <table className="micuenta-history-table">
                                                    <thead className="micuenta-history-table-head pagos">
                                                        <tr>
                                                            <th>Fecha</th>
                                                            <th>Precio</th>
                                                            <th>Créditos</th>
                                                            <th>Correo</th>
                                                            <th>Nombres</th>
                                                            <th>Raazon Social</th>
                                                            <th>Teléfono</th>
                                                            <th>Dirección</th>
                                                            <th>Ruc/Cedula</th>  
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {purchasePagos.map((purchase: any) => (
                                                            <tr key={purchase.id}>
                                                                <td>{purchase.attributes.fecha}</td>
                                                                <td>${purchase.attributes.precio}</td>
                                                                <td>{purchase.attributes.creditos}</td>
                                                                <td>{purchase.attributes.factura?.email}</td>
                                                                <td>{purchase.attributes.factura?.nombres}</td>
                                                                <td>{purchase.attributes.factura?.razonSocial}</td>
                                                                <td>{purchase.attributes.factura?.telefono}</td>
                                                                <td>{purchase.attributes.factura?.direccion}</td>
                                                                <td>{purchase.attributes.factura?.rucCedula}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className='btn-acciones'>
                                            {purchasePagosPaginas && Array.from({ length: purchasePagosPaginas.pageCount }, (_, index) => (
                                             <button
                                             className={`paginas ${botonActivo === index + 1 ? 'activo' : ''}`}
                                             key={index + 1}
                                             onClick={() => handleButtonClick(index + 1)}
                                           >
                                             {index + 1}
                                           </button>
                                            ))}
                                        </div>
                                        </>
                                )}

                                {activeTab === 'soporte' && (
                                    <div className='mi-cuenta-soporte'>
                                        <h2 className='micuenta-h2-datos'>Soporte</h2>
                                        <div>
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
                                            </div>
                                            {userPlan !== null && <SeccionFormulario planActual={userPlan} />}
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
