import React, { useEffect, useState } from 'react';
import "./SearchComponent.css";
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import SeccionCreaTuCuenta from '../Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta';
import SubscriptionComponent from '../Suscription/SuscriptionComponent';
import CreditComponent from '../Credits/CreditComponent';
import Tabla from '../Tabla/Tabla';
import TablaBusquedaNoticiasDelDelito from './TablaBusquedaNoticiasDelDelito'
import TablaBusquedaJudiciales from './TablaBusquedaJudiciales';
import CircularProgress from '@mui/material/CircularProgress';
import { validateInput } from './InputValidationUtil'; // Import the validation function
import Link from "next/link";
import Multisearch from "./Multisearch"
import TablaBusquedaTitulos from './TablaBusquedaTitulos';
import TablaBusquedaAccionistas from './TablaBusquedaAccionistas';
import { NoticiasExcel } from './NoticiasExcel';
import { JudicialesExcel } from './JudicialesExcel';
import { TitulosExcel } from './TitulosExcel';
import AccionistasExcel from './AccionistasExcel';
import { ArrowRight } from "lucide-react";

const SearchComponent: React.FC = () => {
    const [data, setData] = useState<any>(null);
    const [propiedadArray, setPropiedadArray] = useState<string[]>([]);
    const [isSecondApiResponseSuccessful, setIsSecondApiResponseSuccessful] = useState(false);
    const [NombreRuc, setNombreRuc] = useState("");
    const [searchInputValue, setSearchInputValue] = useState("");
    const [Datos, setDatos] = useState<any>(null);
    const { user, error, isLoading } = useUser();
    const userEmail = user?.email;
    const [userPlanPrice, setUserPlanPrice] = useState<number | null>(null);
    const [userCredits, setUserCredits] = useState<number | null>(null);
    const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [planId, setPlanId] = useState<number | null>(null);
    const currentDate = new Date();
    const vencimientoDate = userVencimiento ? new Date(userVencimiento) : null;
    const isPlanVencido = vencimientoDate ? vencimientoDate < currentDate : false;
    const [DatosTabla, setDatosTabla] = useState<any>(null);
    const [SeleccionUsuario, setSeleccionUsuario] = useState<string[]>([]);
    const [CreditosFuentes, setCreditosFuente] = useState<any[]>([]);
    const [selectedSource, setSelectedSource] = useState<string>(''); // Initialize the selected source state as an empty string
    const [selectedFuenteCredito, setSelectedFuenteCredito] = useState<number | null>(null);
    const seleccionUsuarioCount = SeleccionUsuario.length;
    const [mostrartabla, setMostrartabla] = useState(true);
    const [isLoadingData, setIsLoadingData] = useState(false);
    const [inputErrors, setInputErrors] = useState<{ specialCharacters?: string; emptyInput?: string }>({});
    const [fuenteseleccionada, setFuenteseleccionada] = useState("");
    const [selectedType, setSelectedType] = useState<string>("nombres"); // Por defecto selecciona "nombre"

    const getCurrentHour = () => {
        return new Date().getHours();
    };

    const isNightTime = () => {
        const currentHour = getCurrentHour();
        return currentHour >= 21 || currentHour < 7;
    };

    async function enviarCorreo(jsonResponse: { data: { attributes: any; id: any; }; }) {
        const nuevoHistorial = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials/${jsonResponse.data.id}?populate=archivo`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                },
                cache: "no-store",
            }
        );
        const data = await nuevoHistorial.json();
        const postCorreo = await fetch(
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
                        asunto: "Busqueda completada",
                        para: userEmail,
                        json: JSON.stringify({
                            url: `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.data.attributes.archivo.data.attributes.url}`,
                            consulta: jsonResponse.data.attributes.consulta,
                            fecha: jsonResponse.data.attributes.fecha,
                        }),
                    },
                }),
                cache: "no-store",
            }
        );
    }
    async function getuser() {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?filters[email][$eq]=${userEmail}&populate=*`, {
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
            setCreditosFuente(data.data)
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch data, ${error}`);
        }
    }

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
                }
            })
            .catch((error) => {
                console.error('Failed to fetch user data:', error);
            });
        creditosfuentes()
        const savedSearchInputValue = localStorage.getItem('searchInputValue');
        const savedSelectedSource = localStorage.getItem('selectedSource');

        if (savedSearchInputValue && user) {
            // Si hay un valor en el localStorage, autorellenar el campo de búsqueda
            setSearchInputValue(savedSearchInputValue);
        }

        if (savedSelectedSource && user) {
            // Si hay un valor en el localStorage, autorellenar el campo de búsqueda
            setSelectedSource(savedSelectedSource);
        }

    }, [user]);

    const handleButtonClick = async () => {
        const errors = validateInput(searchInputValue);

        if (Object.keys(errors).length === 0) {
            setInputErrors({}); // Reset input error
            // Reset empty input error
            setIsLoadingData(true);
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/create_search', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        list: [searchInputValue],
                        item_type: selectedType,
                        source: getSourceValue(),
                        key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
                    }),
                });

                let continueLoop = true;

                if (response.ok) {
                    const jsonData = await response.json();
                    let status = null;
                    while (continueLoop && status !== 'READY') {
                        const response = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/status', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                query_id: jsonData.query_id,
                                key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
                            }),
                        });

                        const statusData = await response.json();
                        status = statusData.status;

                        if (status === 'READY') {
                            // Procesa la respuesta si es necesario
                        }
                        else if (status === 'FAILED') {
                            // Si el estado es 'FAILED', establece los datos de la tabla en un objeto vacío
                            setDatosTabla({ searchInputValue: {} });
                            continueLoop = false; // Sal del bucle si el estado es 'FAILED'
                        }
                        else {
                            // Si la API no está lista, espera 1 segundo antes de realizar la siguiente verificación
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        }
                    }


                    setData(jsonData);
                    const secondResponse = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/get_public_data', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            query_id: jsonData.query_id,
                            key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
                        }),
                    });

                    if (secondResponse.ok) {
                        const secondJsonData = await secondResponse.json();
                        const noticias = secondJsonData.data;
                        setDatosTabla(noticias);
                        let primeraPropiedad;
                        for (let propiedad in noticias) {
                            if (noticias.hasOwnProperty(propiedad)) {
                                primeraPropiedad = propiedad;
                                break;
                            }
                        }

                        if (primeraPropiedad !== undefined) {
                            setNombreRuc(primeraPropiedad);
                            const properties = [];
                            for (let nombrePropiedad in noticias[primeraPropiedad]) {
                                properties.push(nombrePropiedad);
                            }



                            setPropiedadArray(properties);
                            setIsSecondApiResponseSuccessful(true);

                            // Automatically select all items and call the third API
                            const allItems = Object.keys(noticias[primeraPropiedad]);
                            handleSelectedItems(allItems);
                        }
                        if (!user) {
                            // Guardar searchInputValue en el localStorage si el usuario no está registrado
                            localStorage.setItem('searchInputValue', searchInputValue);
                        }

                        if (user) {
                            localStorage.removeItem('searchInputValue');
                            localStorage.removeItem('selectedSource');
                        }



                    } else {
                        console.error('Segunda llamada a la API fallida:', secondResponse.statusText);
                    }
                } else {
                    console.error('Primera llamada a la API fallida:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            } finally {
                setIsLoadingData(false); // Set loading state to false after the response is received
            }
        } else {
            setInputErrors(errors);
        }
    };


    type SelectionObject = {
        [key: string]: string[];
    };

    const handleThirdApiButtonClick = async () => {
        try {
            const selectionObj: SelectionObject = {}; // Provide type information here
            // selectionObj[NombreRuc] = ["0", "1"];
            selectionObj[NombreRuc] = SeleccionUsuario;

            const response = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/get_full_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query_id: data.query_id,
                    selection: selectionObj,
                    key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
                }),
            });

            if (response.ok) {

                const jsonData = await response.json();
                setDatos(jsonData);
                setData(jsonData);

                if (selectedFuenteCredito !== null) {
                    const posthistorial = await fetch(
                        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                data: {
                                    auth_0_user: userId,
                                    creditos: selectedFuenteCredito * seleccionUsuarioCount * -1,
                                    fecha: currentDate,
                                    precio: 0,
                                    consulta: searchInputValue + " - " + fuenteseleccionada,
                                    plane: planId,
                                    status: "READY",
                                    query_id: data.query_id,
                                    puntero: selectionObj,
                                    tipo: "busqueda",
                                    busqueda: JSON.stringify({
                                        fuente: selectedSource,
                                        consulta: searchInputValue,
                                        tipo: "simple"
                                    }),
                                },
                            }),
                            cache: "no-store",
                        }
                    );
                }


                if (userCredits) {
                    var restacreditos = selectedFuenteCredito && userCredits - selectedFuenteCredito * seleccionUsuarioCount
                    const postResponse = await fetch(
                        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users/${userId}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                data: {
                                    plan: planId,
                                    creditos: restacreditos,
                                },
                            }
                            ),
                            cache: "no-store",
                        }
                    );
                }
                setMostrartabla(false)

            }
        } catch (error) {
            console.error('Error al ejecutar la tercera API:', error);
        }
    };


    const getSourceValue = () => {
        const selector = document.getElementById('sourceSelector') as HTMLSelectElement;
        setFuenteseleccionada(selector.value)
        return selector.value;
    };

    const handleConvertToPdf = () => {
        if (Datos && Datos.data) {
            const doc = new jsPDF('p', 'mm', 'a4'); // Configurar tamaño A4 (210 x 297 mm)
            const jsonobject = Datos.data
            const jsonDataString = JSON.stringify(jsonobject, null, 2);

            // Agregar imagen como encabezado solo en la primera página
            const imgData = 'https://dev.advantech.com.ec:1334/uploads/Encabezado_47b7f38973.png';

            // Calcula el ancho proporcional de la imagen al ancho del PDF (ajustado al margen)
            const pdfWidth = 230; // Ajusta este valor según el ancho deseado del contenido
            const imgProps = { width: pdfWidth, height: (pdfWidth * 97) / 903 };

            let y = 0; // Variable para controlar la posición vertical del texto
            let firstPage = true; // Bandera para verificar la primera página

            // Función para agregar una nueva página y restablecer la posición vertical (y)
            const addNewPage = () => {
                doc.addPage();
                y = 0;
                y += 10; // Incrementar la posición vertical para evitar superponer el texto en la imagen
            };

            // Contenido principal
            const lines = doc.splitTextToSize(jsonDataString, pdfWidth);
            for (let i = 0; i < lines.length; i++) {
                if (y + 10 > doc.internal.pageSize.getHeight()) { // Comprobar si hay suficiente espacio vertical
                    addNewPage(); // Agregar una nueva página si no hay suficiente espacio
                }

                if (firstPage) {
                    doc.addImage(imgData, 'PNG', 0, 0, imgProps.width, imgProps.height);
                    firstPage = false;
                    y += 60; // Incrementar la posición vertical después del encabezado en la primera página
                }

                doc.text(lines[i], 15, y);
                y += 10; // Incrementar la posición vertical para la siguiente línea
            }

            doc.save(`${NombreRuc} - Advantech.pdf`);
        }
    };

    const handleConvertToXls = () => {
        // Simular llamado a la API y descargar los datos como XLS
        const data = JSON.parse(Datos.data);

        const xlsData = convertToXls(data);
        const blob = new Blob([xlsData], { type: 'application/vnd.ms-excel' });
        saveAs(blob, 'data.xls');
    }

    const convertToXls = (data: any) => {
        let xlsData = 'data:text/csv;charset=utf-8,';

        const flattenData = (obj: any): string[] => {
            const result: string[] = [];
            Object.keys(obj).forEach((key) => {
                const value = obj[key];
                if (typeof value === 'object' && !Array.isArray(value)) {
                    result.push(...flattenData(value));
                } else {
                    result.push(value);
                }
            });
            return result;
        };

        const keys = Object.keys(data["VERA VERA MARIA ALEJANDRA"]["0"]);
        const values = Object.values(data["VERA VERA MARIA ALEJANDRA"]["0"]);
        const flattenedValues = flattenData(values);

        // Insertar un espacio vacío en la segunda posición del arreglo de valores
        flattenedValues.splice(1, 0, '');

        xlsData += keys.join(',') + '\n';
        xlsData += flattenedValues.join(',') + '\n';
        return xlsData;
    };

    const handleSelectedItems = (selectedItems: string[]) => {
        // Aquí puedes manejar los elementos seleccionados como desees
        setSeleccionUsuario(selectedItems)
    };

    const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedType(e.target.value); // Actualiza el estado del tipo de búsqueda
    };


    const handleSourceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        setSelectedSource(selectedValue); // Update the selected source state when the user selects an option

        // Find the selected fuente object from the CreditosFuentes array
        const selectedFuenteObj = CreditosFuentes.find(
            (fuenteObj) => fuenteObj.attributes.fuente === selectedValue
        );

        // Update the selectedFuenteCredito state with the corresponding credito value
        setSelectedFuenteCredito(selectedFuenteObj ? selectedFuenteObj.attributes.credito : null);

        if (!user) {
            localStorage.setItem('selectedSource', selectedValue);
        }
    };

    const handleReloadPage = () => {
        window.location.reload(); // This will reload the page
    };
    return (
        <UserProvider>

            <div className='search'>
                {!DatosTabla && (
                    <div>
                        <div className='buscador-container'>

                            <label className='buscador-label aviso'>En los siguientes campos tienes que completar con el nombre o RUC de la persona o entidad que deseas buscar, además selecciona la fuente de donde quieres los datos.</label>
                            <br />
                            <a href="/guia-de-busqueda" className="hero-icon-container">
                                ¿Cómo funciona? <ArrowRight className="hero-icon" />
                            </a>
                            <br />
                            <label className='buscador-label'>Selecciona el tipo de búsqueda</label>
                            <select
                                id="typeSelector"
                                value={selectedType}
                                onChange={handleTypeSelect}
                                className='search-inputs'
                            >
                                <option value="nombres" >Nombre</option>
                                <option value="cedulas">Cédula</option>
                            </select>
                            <br></br>
                            <label className='buscador-label'>Ingresa un {selectedType.slice(0, -1)}</label>
                            <input
                                type="text"
                                value={searchInputValue}
                                onChange={(e) => setSearchInputValue(e.target.value.toUpperCase())}
                                className='search-inputs'
                                placeholder={selectedType.slice(0, -1).charAt(0).toUpperCase() + selectedType.slice(0, -1).slice(1)}
                            />
                            {inputErrors.specialCharacters && <p className="error-message">{inputErrors.specialCharacters}</p>}
                            {inputErrors.emptyInput && <p className="error-message">{inputErrors.emptyInput}</p>}
                        </div>
                        <div className='buscador-container'>

                            <label className='buscador-label'>Selecciona la fuente de datos</label>
                            <select
                                id="sourceSelector"
                                value={selectedSource}
                                onChange={handleSourceSelect}
                                className='search-inputs'
                            >
                                <option value="" disabled hidden>
                                    Seleccionar fuente
                                </option>
                                {CreditosFuentes.map((fuente) => (
                                    // Verificar si la propiedad estaactivo es true
                                    fuente.attributes.estaactivo === true && (
                                        <option key={fuente.id} value={fuente.attributes.fuente}>
                                            {fuente.attributes.consulta}
                                        </option>
                                    )
                                ))}
                            </select>
                            {selectedSource !== '' && searchInputValue != "" && (
                                <>
                                    {!isLoadingData ? (
                                        <>
                                            <button onClick={handleButtonClick} className='search-menu-button'>
                                                Obtener datos
                                            </button>

                                        </>

                                    ) : (
                                        <>  <div className='loading-overlay'>
                                            <p>Estamos procesando tus datos</p>
                                            <br></br>
                                            {isNightTime() && <p>En la noche, las fuentes pueden tardar más en procesar solicitamos de tu paciencia</p>}
                                            <br></br>
                                            <CircularProgress></CircularProgress>
                                        </div>
                                        </>
                                    )}
                                </>
                            )}

                        </div>
                    </div>
                )}
                <br />
                {data ? (
                    <div>
                        {
                            mostrartabla &&
                            <>
                                <label className='buscador-label-datos'>Datos sobre {searchInputValue}</label>
                                <p>
                                    {DatosTabla != null && Object.keys(DatosTabla[Object.keys(DatosTabla)[0]]).length > 0 ? (
                                        <div>
                                            {"Obtuvimos " +
                                                Object.keys(DatosTabla[Object.keys(DatosTabla)[0]]).length +
                                                " registros para " +
                                                searchInputValue +
                                                " de la fuente " + fuenteseleccionada +
                                                ", selecciona los registros que desees, y descargarlos."}
                                            <br />
                                            {"Tenemos un filtro a la izquierda donde puedes precisar más los datos de tu búsqueda. Recuerda que la descarga tiene un valor de " +
                                                selectedFuenteCredito +
                                                " créditos."}
                                        </div>
                                    ) : (
                                        "Obtuvimos 0 registros para " + searchInputValue + ", verifica los datos ingresados, RECUERDA que para datos más precisos puedes buscar por RUC o cédula."
                                    )}
                                </p>

                                {fuenteseleccionada == "noticias" &&
                                    <>
                                        <TablaBusquedaNoticiasDelDelito data={DatosTabla} onSelectedItems={handleSelectedItems} />
                                    </>
                                }

                                {fuenteseleccionada == "judicial" &&
                                    <>
                                        <TablaBusquedaJudiciales data={DatosTabla} onSelectedItems={handleSelectedItems} />
                                    </>
                                }

                                {fuenteseleccionada == "titulos" &&
                                    <>
                                        <TablaBusquedaTitulos data={DatosTabla} onSelectedItems={handleSelectedItems} />
                                    </>
                                }


                                {fuenteseleccionada == "accionistas" &&
                                    <>
                                        <TablaBusquedaAccionistas data={DatosTabla} onSelectedItems={handleSelectedItems} />
                                    </>
                                }

                            </>
                        }
                    </div>
                ) : (
                    <>
                        {/* <p>Loading...</p> */}
                    </>
                )}
                {isSecondApiResponseSuccessful && (
                    <>
                        <br></br>
                        <div>
                            {!mostrartabla &&
                                <div className='json-container'>
                                    <pre className='search-json'>{JSON.stringify(data, null, 2)}</pre>
                                </div>
                            }
                            {user && mostrartabla && DatosTabla != null && Object.keys(DatosTabla[Object.keys(DatosTabla)[0]]).length > 0 &&
                                <>
                                    <p>Mis créditos:{userCredits}</p>
                                    <p>Créditos a consumir:{selectedFuenteCredito && selectedFuenteCredito * seleccionUsuarioCount}</p>
                                </>
                            }

                            {user && seleccionUsuarioCount == 0 && <button className='busqueda-menu-button' onClick={handleReloadPage}>
                                Iniciar una nueva búsqueda
                            </button>
                            }

                        </div>
                        {    //Caso con créditos y usuario
                            user && userCredits != null && selectedFuenteCredito && userCredits >= selectedFuenteCredito * seleccionUsuarioCount &&
                            seleccionUsuarioCount > 0 && mostrartabla && !isPlanVencido &&
                            <>
                                <button className='search-menu-button' onClick={handleThirdApiButtonClick}>
                                    Obtener en detalle los datos seleccionados
                                </button>

                            </>
                        }
                        <a className='volver-al-buscador' href='/busqueda' >
                            Volver al buscador
                        </a>
                        {
                            //Caso sin créditos
                            user && userCredits != null && selectedFuenteCredito && (userCredits < selectedFuenteCredito * seleccionUsuarioCount) &&
                            <>
                                <br></br>
                                <p className='search-error'>Tus créditos no son suficientes para traer estos datos</p>
                                <Link href="/personalizado" legacyBehavior passHref>
                                    <button className='search-menu-button' >
                                        Recargar créditos en tu cuenta
                                    </button>
                                </Link>
                            </>
                        }
                        {
                            //Caso usuario vencido 
                            user && isPlanVencido && planId &&
                            <>
                                <br></br>
                                <p className='search-error'>Tu plan esta vencido</p>
                                <Link href="/planes" legacyBehavior passHref>
                                    <button className='search-menu-button' >
                                        Renueva tu suscripción para continuar
                                    </button>
                                </Link>
                            </>
                        }
                        {
                            //Caso usuario vencido 
                            user && (planId == null || planId == undefined) &&
                            <>
                                <br></br>
                                <p className='search-error'>Recuerda que para que puedas descargar los datos encontrados, por favor suscribete a un plan.</p>
                                <Link href="/planes" legacyBehavior passHref>
                                    <button className='search-menu-button' >
                                        Suscribete para continuar
                                    </button>
                                </Link>
                            </>
                        }
                        {
                            //Caso sin usuario
                            !user &&
                            <>
                                <br></br>
                                <p className='search-error'>Recuerda que para que puedas descargar los datos encontrados, por favor crea una cuenta, y suscribete a un plan.</p>
                                <a href={"/api/auth/login"}>
                                    <button className='search-menu-button' >
                                        Ingresa con tu cuenta para continuar
                                    </button>
                                </a>
                            </>
                        }

                    </>
                )}
                <>
                    {Datos && (
                        <>
                            <div>
                                <button className='busqueda-menu-button' onClick={handleConvertToPdf}>
                                    Convertir a PDF
                                </button>
                                {/* <button className='busqueda-menu-button' onClick={handleConvertToXls}>
                                    Convertir a XLS
                                </button> */}
                                {fuenteseleccionada == "noticias" && <button className='download-button' onClick={() => NoticiasExcel(data.data, searchInputValue + " - " + fuenteseleccionada)}>Descargar Excel</button>}
                                {fuenteseleccionada == "judicial" && <button className='download-button' onClick={() => JudicialesExcel(data.data, searchInputValue + " - " + fuenteseleccionada)}>Descargar Excel</button>}
                                {fuenteseleccionada == "titulos" && <button className='download-button' onClick={() => TitulosExcel(data.data, searchInputValue + " - " + fuenteseleccionada)}>Descargar Excel</button>}
                                {fuenteseleccionada == "accionistas" && <button className='download-button' onClick={() => AccionistasExcel(data.data, searchInputValue + " - " + fuenteseleccionada)}>Descargar Excel</button>}
                            </div>
                            <button className='busqueda-menu-button' onClick={handleReloadPage}>
                                Iniciar una nueva búsqueda
                            </button>
                        </>
                    )}
                </>
            </div>
        </UserProvider>
    );

};

export default SearchComponent;
