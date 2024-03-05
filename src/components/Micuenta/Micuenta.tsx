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
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { NoticiasExcel } from '../SearchComponent/NoticiasExcel';
import { JudicialesExcel } from '../SearchComponent/JudicialesExcel';
import { TitulosExcel } from '../SearchComponent/TitulosExcel';
import AccionistasExcel from '../SearchComponent/AccionistasExcel';
import SearchStatus from './SearchStatus';
import crypto from 'crypto';
import { jsPDF } from 'jspdf';
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

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
    const searchHistory = purchaseHistory.filter((purchase: any) => purchase.attributes.tipo == "busqueda");
    const [generatedApi, setGeneratedApi] = useState('');
    const [apiSectionVisible, setApiSectionVisible] = useState(true);
    const [user_admin, setuser_admin] = useState<string | null>(null);
    const [nameUser, setnameUser] = useState<string>("");
    const [actualizarEstadoConsulta, setActualizarEstadoConsulta] = useState(1);
    const [sortOrder, setSortOrder] = useState("desc");
    const [fuentes, Setfuentes] = useState<Array<any>>([]);

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
    // Estado para controlar la visibilidad del texto
    const [showText, setShowText] = useState(false);

    // Manejadores de eventos para mostrar y ocultar el texto
    const handleMouseEnter = () => {
        setShowText(true);
    };

    const handleMouseLeave = () => {
        setShowText(false);
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
        creditosfuentes()

    }, [user, mostrarCambiarUsuario, actualizarEstadoConsulta]);


    async function creditosfuentes() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/creditos-fuentes`, {

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
            Setfuentes(data.data)
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }

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
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials?filters[tipo][$eq]=compra&filters[tipo][$eq]=ajuste&filters[tipo][$eq]=bienvenida&sort[0]=fecha:desc&pagination[page]=${page}`, {

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

    const renamingMap = {
        //Mapeo Juicios
        type: "Tipo",
        id_juicio: "Nro. Juicio",
        delito: "Delito",
        condicion: "Condición",
        materia: "Materia",
        fecha_ingreso: "Fecha",
        estado_juicio: "Estado Juicio",
        tipo_resolucion: "Tipo Resolución",
        tipo_accion: "Tipo Acción",
        id_canton: "ID Canton",
        fecha_providencia: "Fecha Providencia",
        providencia: "Providencia",
        provincia: "Provincia",
        ciudad: "Ciudad",
        id_incidente_judicatura: "Nro Incidente",
        id_movimiento_juicio_incidente: "Nro Movimiento incidente",
        id_judicatura_destino: "Nro Judicatura destino",
        fecha_crea: "Fecha creación incidente",
        lst_litigante_actor_tipo_litigante: "Condición Actor",
        lst_litigante_actor_nombre_litigante: "Nombre Actor",
        lst_litigante_actor_representado_por: "Representado por Actor",
        id_litigante: "Nro Litigante Actor",
        total_actores: "Total Actores",
        lst_litigante_demandado_tipo_litigante: "Condición Demandado",
        lst_litigante_demandado_nombre_litigante: "Nombre Demandado",
        lst_litigante_demandado_representado_por: "Representado por Demandado",
        lst_litigante_demandado_id_litigante: "Nro Litigante Demandado",
        total_demandado: "Total Demandado",
        total_juicios: "Total Juicios",
        lst_litigante_actor: "Detalles litigante Actor",
        lst_litigante_demandado: "Detalles litigante Demandado",
        //Mapeo Accionistas
        administracion_actual_en: "Administración actual en",
        expediente: "Expediente",
        nombre: "Nombre",
        cedula : "Cédula",
        ruc: "RUC",
        nacionalidad: "Nacionalidad",
        cargo: "Cargo",
        fechanombramiento: "Fecha Nombramiento",
        fechatermino: "Fecha Termino",
        periodo: "Periodo",
        fecha_registromercantil: "Fecha registro Mercantil",
        articulo: "Articulo",
        n_registromercantil: "Nro Registro Mercantil",
        rladm: "Representante Legal /Administrador",
        accionista_actual_en: "Accionista actual en",
        capital_invertido: "Capital invertido",
        capital_total_cia: "Capital Total Cia.",
        valor_nominal: "Valor Nominal",
        situacionlegal: "Situación legal",
        posesión_efectiva: "Posesion Efectiva",
        administradores_anterior_en: "Administrador anterior en",
        accionista_anterior_en: "Accionista anterior en",
        accionista_en_las_siguientes_sociedades_extranjeras: "Accionista en sociedades extranjeras",
        //Mapeo Noticias
        lugar: "Lugar",
        noticias_del_delito: "No. Noticia del delito",
        estado: "Estado",
        unidad: "Unidad de denuncia",
        fecha: "Fecha de denuncia",
        digitador: "Nombre del Digitador",
        numero_informe: "No. Informe",
        resumen_unidad: "Resumen Unidad",
        sujetos_cedula: "No. Cédula",
        sujetos_nombre: "Nombre",
        sujetos_estado: "Estado",
        total_sujetos: "Total Sujetos",
        marca: "Marca",
        modelo: "Modelo",
        placa: "No. Placa",
        total_vehiculos: "Total Vehiculos",
        //Mapeo Titulos
        titulos_nivel: "Nivel",
        titulos_titulo: "Descripción Titulo",
        titulos_institucion: "Nombre de la institución",
        titulos_tipo: "Tipo",
        titulos_reconocido: "Titulo reconocido",
        titulos_numero_de_registro: "No. registro",
        titulos_desde: "Fecha desde",
        titulos_observacion: "Observación",
        total_titulos: "Total títulos"
    };

    function capitalizeKeys(obj: any, renamingMap: { [key: string]: string }): any {
        // Verificar si el argumento es un objeto
        if (typeof obj !== 'object' || obj === null) {
            // Si no es un objeto, devolverlo sin modificar
            return obj;
        }

        // Verificar si el objeto es un array
        if (Array.isArray(obj)) {
            // Si es un array, mapear cada elemento y capitalizarlo
            return obj.map(item => capitalizeKeys(item, renamingMap));
        }

        // Crear un nuevo objeto para almacenar las claves capitalizadas
        const newObj: any = {};

        // Iterar sobre las claves del objeto
        for (let key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                // Verificar si la clave necesita ser renombrada
                const newKey = renamingMap[key] || key;

                // Capitalizar la primera letra de la clave
                const capitalizedKey = newKey.charAt(0).toUpperCase() + newKey.slice(1);

                // Capitalizar el valor si es una cadena
                let value = obj[key];
                if (typeof value === 'string') {
                    value = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
                }

                // Recursivamente capitalizar las claves y los valores anidados
                newObj[capitalizedKey] = capitalizeKeys(value, renamingMap);
            }
        }

        return newObj;
    }



    // Función para filtrar los objetos por el nombre de la fuente y devolver solo fuente_long


    const DescargarPDF = async (query_id: string, fuente: string, puntero: any, consulta: string) => {

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
            console.log(noticias)
            const palabras = consulta.split(' ');
            const ultimaPalabra = palabras[palabras.length - 1];

            const fuenteencontrada = fuentes.filter((item: any) => {
                // Verificar si item es un objeto válido y tiene la propiedad attributes
                if (item && item.attributes && item.attributes.fuente) {
                    // Convertir fuente_long y ultimaPalabra a minúsculas para una comparación insensible a mayúsculas
                    const fuente = item.attributes.fuente.toLowerCase();
                    const ultimaPalabraLower = ultimaPalabra.toLowerCase();
                    // Comprobar si fuenteLong incluye la última palabra
                    if (fuente.includes(ultimaPalabraLower))
                        return item.attributes.fuente_long
                }
                return false; // Si no cumple las condiciones anteriores, filtrarlo
            });

            const origendatos = fuenteencontrada[0].attributes.fuente_long

            console.log("fuentes encontrada", fuenteencontrada)

            if (noticias) {
                const doc = new jsPDF('p', 'mm', 'a4'); // Configurar tamaño A4 (210 x 297 mm)

                const jsonobject = capitalizeKeys(noticias, renamingMap);
                const jsonDataString = JSON.stringify(jsonobject, null, 2);

                // Agregar imagen como encabezado solo en la primera página
                const imgData = "/Logo.png"

                // Calcula el ancho proporcional de la imagen al ancho del PDF (ajustado al margen)
                const pdfWidth = 250; // Ajusta este valor según el ancho deseado del contenido
                const imgProps = { width: pdfWidth, height: (pdfWidth * 97) / 903 };

                let y = 10; // Comienza desde una posición más baja para evitar problemas en la primera línea
                let firstPage = true; // Bandera para verificar la primera página

                // Función para agregar una nueva página y restablecer la posición vertical (y)
                const addNewPage = () => {
                    doc.addPage();
                    y = 10; // Reiniciar la posición vertical
                };

                // Contenido principal
                const cleanedData = jsonDataString
                    .replace(/[{},"]/g, "")  // Eliminar caracteres especiales
                    .replace(/_/g, " ")       // Reemplazar guiones bajos por espacios
                    .replace(/[\[\]]/g, "");  // Eliminar corchetes

                // Dividir el texto por saltos de línea, eliminar elementos duplicados y luego unirlos nuevamente
                const cleanedLines = cleanedData.split('\n').filter((line, index, array) => array.indexOf(line) === index).join('\n');

                const lines = doc.splitTextToSize(cleanedLines, pdfWidth);


                for (let i = 0; i < lines.length; i++) {
                    if (y + 10 > doc.internal.pageSize.getHeight()) {
                        addNewPage();
                    }

                    if (firstPage) {
                        doc.addImage(imgData, 'PNG', 0, 0, imgProps.width, imgProps.height);
                        doc.text(origendatos, 10, 40).setFontSize(15)
                        firstPage = false;
                        y += 32; // Incrementar la posición vertical después del encabezado en la primera página
                    }

                    doc.setFontSize(10); // Ajustar el tamaño de la fuente a 10

                    // Calcular la indentación y agregar espacios correspondientes
                    const indentation = lines[i].search(/\S/); // Encuentra la primera posición no vacía

                    if (indentation > 0) {
                        // Si hay indentación, agregar espacios antes del texto
                        const indentedLine = ' '.repeat(indentation) + lines[i].trim();
                        doc.text(indentedLine, 14, y);
                    } else {
                        // Si no hay indentación, agregar la línea directamente
                        doc.text(lines[i].trim(), 14, y);
                    }

                    y += 6; // Incrementar la posición vertical para la siguiente línea, ajustar según sea necesario
                }

                doc.save(`${consulta} - Advantech.pdf`);
            }
        }
    };


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
                                                {showText && (
                                                    <div className='text-hover'>
                                                        <p>
                                                            El día anunciado ya no podrá hacer uso <br />
                                                            de los servicios de advantech
                                                        </p>
                                                    </div>
                                                )}
                                                {/* Icono con evento onMouseEnter y onMouseLeave */}
                                                <span
                                                    className='micuenta-datos-title'
                                                    onMouseEnter={handleMouseEnter}
                                                    onMouseLeave={handleMouseLeave}
                                                >
                                                    <FontAwesomeIcon icon={faCircleQuestion} /> Fecha de vencimiento
                                                </span>
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
                                                            <th onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}> Fecha {sortOrder === "asc" ? "▲" : "▼"}  </th>
                                                            <th>Consumo créditos</th>
                                                            <th>Consulta</th>
                                                            <th>Estado consulta</th>
                                                            <th>Excel</th>
                                                            <th>Json</th>
                                                            <th>PDF</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {searchHistory.slice() // Copia el array para no modificar el original
                                                            .sort((a, b) => {
                                                                const dateA = new Date(a.attributes.publishedAt);
                                                                const dateB = new Date(b.attributes.publishedAt);
                                                                const orderFactor = sortOrder === "asc" ? 1 : -1;

                                                                return orderFactor * dateA.getTime() - orderFactor * dateB.getTime();
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

                                                                    <td className={search.attributes.status === "IN PROGRESS" ? "underline-text" : ""}>


                                                                        {search.attributes.status === "IN PROGRESS" ? (
                                                                            <button className='micuenta-download-button proceso'>En proceso</button>
                                                                        ) : search.attributes.status === "FAILED" ? (
                                                                            <button className='micuenta-download-button proceso' >Fallido</button>
                                                                        ) : search.attributes.puntero && Object.keys(search.attributes.puntero).length > 0 &&
                                                                            search.attributes.puntero[Object.keys(search.attributes.puntero)[0]].length <= 10 ? (
                                                                            <button className='micuenta-download-button' onClick={() => DescargarPDF(search.attributes.query_id, search.attributes.consulta, search.attributes.puntero, search.attributes.consulta)}>Descargar</button>
                                                                        ) :
                                                                            <>
                                                                                <Tooltip id="my-tooltip" />
                                                                                <a data-tooltip-id="my-tooltip" data-tooltip-content="Demasiados registros para ser mostrados en PDF">
                                                                                    <button className='micuenta-download-button proceso' >Descargar</button>
                                                                                </a>

                                                                            </>

                                                                        }

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
