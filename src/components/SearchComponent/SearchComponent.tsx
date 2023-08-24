import React, { useEffect, useState } from 'react';
import "./SearchComponent.css";
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import SeccionCreaTuCuenta from '../Inicio/SeccionCreaTuCuenta/SeccionCreaTuCuenta';
import SubscriptionComponent from '../Suscription/SuscriptionComponent';
import CreditComponent from '../Credits/CreditComponent';
import Tabla from '../Tabla/Tabla';
import TablaBusqueda from './TablaBusqueda'

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
            console.log("creditos-fuentes", data.data)
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
        creditosfuentes()

    }, [user]);

    const handleButtonClick = async () => {
        try {
            const response = await fetch('https://splunk.hctint.com:9876/data/create_search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    list: [searchInputValue],
                    source: getSourceValue(),
                    key: 'valid_api_key'
                }),
            });

            if (response.ok) {
                const jsonData = await response.json();
                setData(jsonData);

                const secondResponse = await fetch('https://splunk.hctint.com:9876/data/get_full_data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query_id: jsonData.query_id,
                        creator_key: 'valid_api_key',
                        selection: {},
                        key: 'valid_api_key'
                    }),
                });

                if (secondResponse.ok) {
                    const secondJsonData = await secondResponse.json();
                    const noticias = secondJsonData.data;
                    setDatosTabla(noticias);
                    console.log(noticias)
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
                } else {
                    console.error('Segunda llamada a la API fallida:', secondResponse.statusText);
                }
            } else {
                console.error('Primera llamada a la API fallida:', response.statusText);
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    type SelectionObject = {
        [key: string]: string[];
    };

    const handleThirdApiButtonClick = async () => {
        try {
            console.log("NombreRuc:", NombreRuc);
            console.log("Query_id:", data.query_id);
            const selectionObj: SelectionObject = {}; // Provide type information here

            // selectionObj[NombreRuc] = ["0", "1"];

            selectionObj[NombreRuc] = SeleccionUsuario;

            const response = await fetch('https://splunk.hctint.com:9876/data/get_full_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query_id: data.query_id,
                    selection: selectionObj,
                    creator_key: 'valid_api_key',
                    key: 'valid_api_key'
                }),
            });

            if (response.ok) {
                const jsonData = await response.json();
                setDatos(jsonData);
                setData(jsonData);
                if (userCredits) {
                    var restacreditos = selectedFuenteCredito && userCredits - selectedFuenteCredito
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
        return selector.value;
    };

    const handleConvertToPdf = () => {
        if (Datos && Datos.data) {
            const doc = new jsPDF('p', 'mm', 'a4'); // Configurar tamaño A4 (210 x 297 mm)
            const jsonobject = Datos.data
            const jsonDataString = JSON.stringify(jsonobject, null, 2);

            // Agregar imagen como encabezado solo en la primera página
            const imgData = 'https://admin.advantech.com.ec/uploads/Encabezado_47b7f38973.png';

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
        console.log('Elementos seleccionados:', selectedItems);
        setSeleccionUsuario(selectedItems)
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
    };

    const handleReloadPage = () => {
        window.location.reload(); // This will reload the page
    };

    return (
        <UserProvider>
            {user ? (
                isPlanVencido ? (
                    <>
                        <h2 className='busqueda-h2'>TU PLAN A VENCIDO, ACTUALIZA TU SUSCRIPCIÓN</h2>
                        <br></br>
                        <SubscriptionComponent></SubscriptionComponent>
                    </>
                ) : (
                    userCredits !== null && userCredits <= 0 ? (
                        <>
                            <h2 className='busqueda-h2'>TUS CRÉDITOS SE AGOTARON, COMPRA MÁS PARA CONTINUAR</h2>
                            <br></br>
                            <div className="busqueda-creditos">
                                <Tabla></Tabla>
                                <UserProvider>
                                    <CreditComponent></CreditComponent>
                                </UserProvider>
                            </div>
                        </>
                    ) : (
                        < div className='search'>

                            {!DatosTabla &&
                                <div>
                                    <div className='buscador-container'>
                                        <label className='buscador-label'> Ingresa un nombre completo o RUC</label>
                                        <input
                                            type="text"
                                            value={searchInputValue}
                                            onChange={(e) => setSearchInputValue(e.target.value.toUpperCase())}
                                            className='search-inputs'
                                            placeholder='Nombre completo o RUC'
                                        />
                                    </div>
                                    <div className='buscador-container'>
                                        <label className='buscador-label'> Selecciona la fuente de datos</label>
                                        <select
                                            id="sourceSelector"
                                            value={selectedSource}
                                            onChange={handleSourceSelect}
                                        >
                                            <option value="" disabled hidden>
                                                Seleccionar fuente
                                            </option>
                                            {CreditosFuentes.map((fuente) => (
                                                <option key={fuente.id} value={fuente.attributes.fuente}>
                                                    {fuente.attributes.fuente}
                                                </option>
                                            ))}
                                        </select>
                                        <button onClick={handleButtonClick} className='search-menu-button'>
                                            Obtener datos
                                        </button>
                                    </div>
                                </div>
                            }
                            <br />
                            <br />
                            {data ? (
                                <div>
                                    {/* <pre className='search-json'>{JSON.stringify(data, null, 2)}</pre> */}
                                    {mostrartabla &&
                                        <>
                                            <label className='buscador-label-datos'>Datos sobre {searchInputValue}</label>
                                            <p>Selecciona los datos que quieres traer en detalle</p>

                                            <TablaBusqueda data={DatosTabla} onSelectedItems={handleSelectedItems} />
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
                                        {mostrartabla && <><p>Mis créditos:{userCredits}</p>
                                            <p>Créditos a consumir:{selectedFuenteCredito && selectedFuenteCredito}</p>
                                        </>}

                                        {seleccionUsuarioCount == 0 && <button className='busqueda-menu-button' onClick={handleReloadPage}>
                                            Iniciar una nueva búsqueda
                                        </button>
                                        }

                                    </div>
                                    {
                                        userCredits && selectedFuenteCredito && userCredits >= selectedFuenteCredito &&
                                        seleccionUsuarioCount > 0 && mostrartabla &&
                                        <button className='search-menu-button' onClick={handleThirdApiButtonClick}>
                                            Obtener en detalle los datos seleccionados
                                        </button>
                                    }
                                    {
                                        userCredits && selectedFuenteCredito && userCredits < selectedFuenteCredito * seleccionUsuarioCount &&
                                        <>
                                            <br></br>
                                            <p className='search-error'>Tus créditos no son suficientes para traer estos datos</p>
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
                                            <button className='busqueda-menu-button' onClick={handleConvertToXls}>
                                                Convertir a XLS
                                            </button>
                                        </div>
                                        <button className='busqueda-menu-button' onClick={handleReloadPage}>
                                            Iniciar una nueva búsqueda
                                        </button>
                                    </>
                                )}
                            </>
                        </div>)
                )
            ) : (
                <><h2 className='busqueda-h2'>CREA TU CUENTA PARA CONTINUAR</h2><br></br><SeccionCreaTuCuenta></SeccionCreaTuCuenta></>
            )}
        </UserProvider >


    );
};

export default SearchComponent;
