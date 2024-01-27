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
import { NoticiasExcel } from '../SearchComponent/NoticiasExcel';
import { JudicialesExcel } from '../SearchComponent/JudicialesExcel';
import { TitulosExcel } from '../SearchComponent/TitulosExcel';
import AccionistasExcel from '../SearchComponent/AccionistasExcel';
import SearchStatus from './SearchStatus';
import crypto from 'crypto';
const Micuenta: React.FC = () => {

    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlan, setUserPlan] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null);
    const [userapi, setUserapi] = useState<string | null>("xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx");
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [userActivo, setUserActivo] = useState<boolean | null>(null);
    const [planId, setPlanId] = useState<number | null>(null);
    const currentDate = new Date();
    const [data, setData] = useState<any>(null);
    const vencimientoDate = userVencimiento ? new Date(userVencimiento) : null;
    const isPlanVencido = vencimientoDate ? vencimientoDate < currentDate : false;
    const [purchaseHistory, setPurchaseHistory] = useState<Array<any>>([]);
    const [showApiSection, setShowApiSection] = useState(false);
    const [apiSectionClicked, setApiSectionClicked] = useState(false);
    const purchaseHistoryFiltered = purchaseHistory.filter((purchase: any) => purchase.attributes.tipo == "compra" || purchase.attributes.tipo == "bienvenida" || purchase.attributes.tipo == "ajuste");
    const searchHistory = purchaseHistory.filter((purchase: any) => purchase.attributes.consulta !== null && purchase.attributes.creditos <= 0);
    const [generatedApi, setGeneratedApi] = useState('');
    const [apiSectionVisible, setApiSectionVisible] = useState(true);
    const [user_admin, setuser_admin] = useState<string | null>(null);
    const [nameUser, setnameUser] = useState<string>("");
    const [actualizarEstadoConsulta, setActualizarEstadoConsulta] = useState(1);

    interface PurchasePagina {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    }
    const [purchasePagosPaginas, setPurchasePagosPaginas] = useState<PurchasePagina | null>(null)
    const purchasePaginas = purchasePagosPaginas;
    const [botonActivo, setBotonActivo] = useState<number | null>(null);
    const [purchasePagosTodos, setPurchasePagos] = useState<any[]>([]);
    const purchasePagos = purchasePagosTodos;
    const [activeTab, setActiveTab] = useState<'datos' | 'compras' | 'soporte' | 'api' | 'pagos' | 'busquedas'>('datos');
    const apiKeyRef = useRef<HTMLDivElement | null>(null);
    const [isCopied, setIsCopied] = useState(false);
    const [apiset, setApiset] = useState(false);
    const { href: currentUrl, pathname } = useUrl() ?? {};
    const [mostrarEliminarCuenta, setMostrarEliminarCuenta] = useState(false);
    const [mostrarCambiarUsuario, setMostrarCambiarNombre] = useState(false);
    const [seCambioNombre, setseCambioNombre] = useState<boolean>(false);

    const cambiarNombre = (event: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = event.target.value;

        // Eliminar caracteres especiales utilizando una expresión regular
        inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

        // Limitar la longitud a 20 caracteres
        inputValue = inputValue.slice(0, 20);

        setnameUser(inputValue);
    };

    useEffect(() => {
        checkAndLogVerParam();
        getuser()
            .then((foundUser) => {
                if (foundUser) {

                    setUserPlan(foundUser.attributes.plan?.data?.attributes.Plan);
                    setUserName(foundUser.attributes.username);

                    setUserCredits(foundUser.attributes.creditos);
                    setUserVencimiento(foundUser.attributes.vencimiento);
                    setApiset(foundUser.attributes.plan?.data?.attributes.API)
                    setUserId(foundUser.id)
                    setPlanId(foundUser.attributes.plan?.data?.id)
                    setPurchaseHistory(foundUser.attributes.historials.data);
                    setUserActivo(foundUser.attributes.estaactivo)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
        getuserAdmin()
            .then((admin_foundUser) => {
                setuser_admin(admin_foundUser)
                if (user && user.email && admin_foundUser) {
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
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });

    }, [user, mostrarCambiarUsuario, actualizarEstadoConsulta]);

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
                case 'api':
                    setActiveTab('api');
                    break;
                // Agrega más casos según tus necesidades
                default:
                    break;
            }
        }
    };


    const DescargarJSON = async (query_id: string, consulta: string, puntero: any,) => {

        const secondResponse = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/get_full_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query_id: query_id,
                selection: puntero,
                key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
            }),
        });

        if (secondResponse.ok) {
            const secondJsonData = await secondResponse.json();

            if (secondJsonData) {
                // Convierte los datos a formato JSON
                const jsonData = JSON.stringify(secondJsonData, null, 2);

                // Crea un Blob con los datos JSON
                const blob = new Blob([jsonData], { type: 'application/json' });

                // Genera una URL para el Blob
                const url = URL.createObjectURL(blob);

                // Crea un enlace de descarga
                const a = document.createElement("a");
                a.href = url;
                a.download = consulta + ".json";

                // Simula un clic en el enlace para iniciar la descarga
                a.click();

                // Libera los recursos
                URL.revokeObjectURL(url);
            }
        }
    }


    const DescargaExcel = async (query_id: string, fuente: string, puntero: any, consulta: string) => {
        const secondResponse = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/get_full_data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query_id: query_id,
                selection: puntero,
                key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
            }),
        });

        if (secondResponse.ok) {
            const secondJsonData = await secondResponse.json();
            const noticias = secondJsonData.data;

            setData(noticias)

            if (noticias) {
                if (fuente.toLowerCase().includes("noticias")) {
                    NoticiasExcel(noticias, consulta)
                }
                if (fuente.toLowerCase().includes("judicial")) {
                    JudicialesExcel(noticias, consulta)
                }
                if (fuente.toLowerCase().includes("titulos")) {
                    TitulosExcel(noticias, consulta)
                }
                if (fuente.toLowerCase().includes("accionistas")) {
                    AccionistasExcel(noticias, consulta)
                }
            }

        }
    }


    function getStatusColor(status: any) {
        switch (status) {
            case "IN PROGRESS":
                return "#f1c816";
            case "FAILED":
                return "red";
            case "READY":
                return "green";
            default:
                return "black"; // Default color if status doesn't match any of the above
        }
    }


    function getStatusTranslation(status: any) {
        switch (status) {
            case "IN PROGRESS":
                return "En proceso";
            case "FAILED":
                return "Fallida";
            case "READY":
                return "Completada";
            default:
                return status; // Si no coincide con ninguno de los estados anteriores, se mantiene igual
        }
    }

    function handleOnClick() {
        // Cuando haces clic en el enlace, cambia el estado para mostrar el div "Eliminar cuenta"
        setMostrarEliminarCuenta(true);
    }
    function handleClosePopup() {
        setMostrarEliminarCuenta(false);
    }
    function mostrarCambiarNombre() {
        // Cuando haces clic en el enlace, cambia el estado para mostrar el div "Eliminar cuenta"
        setMostrarCambiarNombre(true);
    }
    function cerrar_mostrarCambiarNombre() {
        setMostrarCambiarNombre(false);
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
                window.location.href = '/api/auth/logout';
            } else {
                throw new Error(`Failed to create user, ${postResponse.status}`);
            }
        }
    };
    const handleCambiarNombre = async () => {
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
                            username: nameUser
                        },
                    }),
                    cache: "no-store",
                }
            );
            setseCambioNombre(true);
        }
    };

    function generateApiKey(userEmail: string): string {
        const currentDate = new Date();
        const minute = currentDate.getMinutes();
        const second = currentDate.getSeconds();

        // Agregar el minuto y el segundo a la cadena secreta
        const secret = `tu_secreto_${minute}_${second}`;

        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(userEmail);
        const apiKey = hmac.digest('hex');
        setUserapi(apiKey)
        return apiKey;
    }

    function letraANumero(letra: any) {
        // Convierte una letra a su posición en el alfabeto (ignora mayúsculas/minúsculas)
        return letra.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0) + 1;
    }

    function claveLetrasANumeros(clave: any) {
        // Convierte la clave de letras a números y suma todos los valores
        let suma = 0;
        for (let i = 0; i < clave.length; i++) {
            let char = clave[i];
            if (char.match(/[a-z]/i)) {
                suma += letraANumero(char);
            }
        }
        return suma;
    }

    function encriptar(texto: any) {
        let claveNumerica = claveLetrasANumeros(`${process.env.NEXT_PUBLIC_ADVANTECH_API_SECRET}`);
        let textoEncriptado = '';

        for (let i = 0; i < texto.length; i += 2) {
            let byte = parseInt(texto.substr(i, 2), 16);
            let encriptado = (byte + claveNumerica) % 256;
            textoEncriptado += encriptado.toString(16).padStart(2, '0');
        }
        return textoEncriptado;
    }



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
    async function getuserAdmin() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/admin-users`, {

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
            const admin_foundUser = data.data.find((obj: { attributes: { email: string | null | undefined; }; }) => obj.attributes.email === userEmail);


            return admin_foundUser;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }
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

            return foundUser;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }
    async function getHistorialPagos(page: number) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials?filters[tipo][$eq]=compra&filters[tipo][$eq]=devuelto&filters[tipo][$eq]=bienvenida&sort[0]=fecha:desc&pagination[page]=${page}`, {

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

            return foundUser;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }

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

    if (purchasePagosPaginas && purchasePagosPaginas.pageCount !== undefined) {

    } else {

    }

    function handleSearchStatusChange(queryId: string, newStatus: string): void {
        setTimeout(() => {
            setActualizarEstadoConsulta((actualizarEstadoConsulta) => actualizarEstadoConsulta + 1);

        }, 70000); // Ajusta el tiempo de espera en milisegundos según tus necesidades
    }


    const updateApiInDatabase = async (newApi: string) => {
        const postResponse = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${userId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data: {
                        apikey: newApi,
                    },
                }),
                cache: "no-store",
            }
        );

        if (postResponse.ok) {

        }
        // Manejar la respuesta del servidor según sea necesario
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
                        <h2 className="micuenta-h2">{userName}</h2>
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
                                {user.email && user_admin && (
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

                                {apiset && <button id='api'
                                    className={`tab-button ${activeTab === 'api' ? 'active' : ''}`}
                                    onClick={() => setActiveTab('api')}
                                >
                                    API
                                </button>}

                                <a href="/api/auth/logout" className={"tab-button"}>
                                    Salir
                                </a>

                            </div>

                            <div className='micuenta-datos-container'>
                                {activeTab === 'datos' && (
                                    <div>
                                        <h2 className='micuenta-h2-datos'>Mis datos</h2>
                                        <div className='micuenta-datos'>
                                            <div className='micuenta-datos-card'>
                                                <span className='micuenta-datos-title'>Mis créditos actuales </span>
                                                <span className='micuenta-datos-subtitle'>{userCredits?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span>
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
                                                {!isPlanVencido ? (
                                                    <span className='micuenta-datos-title'>Mi plan activo </span>
                                                ) : (
                                                    <span className='micuenta-datos-title'>Plan vencido </span>
                                                )}
                                                <span className='micuenta-datos-subtitle'>{userPlan}</span>
                                            </div>
                                            <div className='micuenta-datos-card'>
                                                <span className='micuenta-datos-title'>Fecha de vencimiento</span>
                                                {isPlanVencido && userPlan && (
                                                    <>
                                                        <span className='micuenta-datos-subtitle'>{userVencimiento}</span>
                                                        <Link href={"/planes"}>
                                                            <button className='tab-button renovar'>
                                                                Comprar Plan
                                                            </button>
                                                        </Link>
                                                    </>
                                                )}
                                                {!userPlan && (
                                                    <>
                                                        <span className='micuenta-datos-subtitle'>{userVencimiento}</span>
                                                        <Link href={"/planes"}>
                                                            <button className='tab-button renovar'>
                                                                Comprar Plan
                                                            </button>
                                                        </Link>
                                                    </>
                                                )}
                                                {!isPlanVencido && userPlan && (
                                                    <>
                                                        <span className='micuenta-datos-subtitle'>{userVencimiento}</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className='micuenta-datos-card username'>
                                                <span className='micuenta-datos-title'>Nombre de usuario</span>
                                                <span className='micuenta-datos-subtitle username'>{userName}</span>
                                                <>
                                                    <a>
                                                        <button className='tab-button renovar' onClick={mostrarCambiarNombre} >
                                                            Cambiar nombre
                                                        </button>
                                                    </a>
                                                </>
                                            </div>

                                            {/* Verificar si los créditos son 0 o el plan está vencido */}
                                            {mostrarCambiarUsuario && ( // Mostrar el div "Eliminar cuenta" si mostrarEliminarCuenta es true
                                                <div className="overlay">
                                                    <div className='cambiar-nombre'>
                                                        <div className="cerrar-popup">
                                                            <FontAwesomeIcon icon={faCircleXmark} size="2xl" onClick={cerrar_mostrarCambiarNombre} />
                                                        </div>
                                                        <h3 className='micuenta-h2'>Nombre de usuario</h3>
                                                        {!seCambioNombre ? (
                                                            <>
                                                                <div className='campo_cambiarNombre'>
                                                                    <input
                                                                        type="text"
                                                                        id="name"
                                                                        name="name"
                                                                        value={nameUser}
                                                                        onChange={cambiarNombre}
                                                                        required
                                                                    />
                                                                    <label htmlFor="name">Solo se permite caracteres Alfanumericos <br /> (Ej. Carlos123)</label>
                                                                </div>
                                                                <br />
                                                                <button
                                                                    className={`navigation-menu-button cambiar-nombre`}
                                                                    onClick={handleCambiarNombre}
                                                                >
                                                                    Cambiar nombre
                                                                </button>
                                                            </>
                                                        ) : (<>
                                                            <p>Se cambio correctamente el nombre de usuario</p>
                                                        </>)}
                                                    </div>
                                                </div>
                                            )}

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
                                                        <li>Sin embargo, tus registros de pagos, búsquedas, plan y creditos seguirán almacenados en nuestra base de datos.</li>
                                                        <li>Podras recuperar tu cuenta volviendo a iniciar sesión con tu mismo correo.</li>
                                                    </ul>
                                                    <br />
                                                    {userActivo && (
                                                        <p><strong>Al hacer clic en darse de baja se cerrará tu sesión actual.</strong></p>
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
                                                            <th>Descripción</th>
                                                            <th>Precio</th>
                                                            <th>Créditos</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {purchaseHistoryFiltered.map((purchase: any) => (
                                                            <tr key={purchase.id}>
                                                                <td>{purchase.attributes.fecha}</td>
                                                                <td>{purchase.attributes.consulta}</td>
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
                                                            <th>Estado consulta</th>
                                                            <th>Excel</th>
                                                            <th>Json</th>
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
                                                                    <td
                                                                    // style={{ color: getStatusColor(search.attributes.status) }} className={search.attributes.status == "IN PROGRESS" ? "underline-text" : ""}
                                                                    >
                                                                        {/* {getStatusTranslation(search.attributes.status)} */}
                                                                        <SearchStatus
                                                                            queryId={search.attributes.query_id}
                                                                            status={search.attributes.status}
                                                                            translation={getStatusTranslation(search.attributes.status)}
                                                                            createdAt={search.attributes.createdAt}
                                                                            getColor={getStatusColor}
                                                                            isUnderline={status => status === "IN PROGRESS"}
                                                                            onStatusChange={handleSearchStatusChange}
                                                                            selectedFuenteEspera={search.attributes.busqueda?.tiempo}
                                                                        ></SearchStatus>
                                                                    </td>

                                                                    <td className={search.attributes.status == "IN PROGRESS" ? "underline-text" : ""}>

                                                                        {search.attributes.status === "IN PROGRESS" ? (
                                                                            <button className='micuenta-download-button proceso' >En proceso</button>
                                                                        ) : search.attributes.status === "FAILED" ? (
                                                                            <button className='micuenta-download-button proceso' >Fallido</button>
                                                                        ) : (
                                                                            <button className='micuenta-download-button' onClick={() => DescargaExcel(search.attributes.query_id, search.attributes.consulta, search.attributes.puntero, search.attributes.consulta)}>Descargar</button>
                                                                        )}

                                                                    </td>


                                                                    <td className={search.attributes.status == "IN PROGRESS" ? "underline-text" : ""}>

                                                                        {search.attributes.status === "IN PROGRESS" ? (
                                                                            <button className='micuenta-download-button proceso'>En proceso</button>
                                                                        ) : search.attributes.status === "FAILED" ? (
                                                                            <button className='micuenta-download-button proceso' >Fallido</button>
                                                                        ) : (
                                                                            <button className='micuenta-download-button' onClick={() => DescargarJSON(search.attributes.query_id, search.attributes.consulta, search.attributes.puntero)}>Descargar</button>
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
                                {activeTab === 'pagos' && user.email && user_admin && (
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
                                                            <th>Razón Social</th>
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
                                                    <p>Si necesitas ayuda envíanos tu consulta mediante este formulario o envíanos a un email a <a href="mailto:soporte@advantech.com.ec">soporte@advantech.com.ec</a></p>

                                                    {userPlan == "Enterprise" &&
                                                        <>
                                                            <br></br>
                                                            <br></br>
                                                            <a className="tab-button" href={"https://api.whatsapp.com/send?phone=" + process.env.NEXT_PUBLIC_ADVANTECH_TELEFONO_SOPORTE} target='_blank'>Solicitar soporte por WhatsApp</a>

                                                        </>

                                                    }
                                                </div>
                                            </div>
                                            {userPlan !== null && <SeccionFormulario planActual={userPlan} />}
                                        </div>
                                    </div>

                                )}

                                {activeTab === 'api' && apiset && (
                                    <div>
                                        <h2 className="micuenta-h2-datos">API</h2>
                                        <div className="micuenta-datos api">
                                            <br />
                                            <br />
                                            <div>
                                                <div className="micuenta-api-box" onClick={copyApiKeyToClipboard}>
                                                    <div ref={apiKeyRef}>{userapi === 'xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx-xxxx' ? userapi : encriptar(userapi)}</div>
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
                                            {/* Botón para regenerar API */}
                                            {apiSectionVisible && userEmail && (
                                                <div
                                                    className="tab-button"
                                                    onClick={() => {
                                                        const newApi = generateApiKey(userEmail); // Asegúrate de tener userEmail disponible
                                                        setGeneratedApi(newApi);

                                                        updateApiInDatabase(newApi);
                                                    }}
                                                >
                                                    Regenerar API
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
