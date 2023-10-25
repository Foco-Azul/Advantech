import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import CircularProgress from '@mui/material/CircularProgress';
import "./Multisearch.css"
import Noticiastable from './Noticiastable';
import { NoticiasExcel } from './NoticiasExcel';
import { JudicialesExcel } from './JudicialesExcel';
import Judicialestable from './Judicialestable';
import Titulostable from './Titulostable';
import { TitulosExcel } from './TitulosExcel';
import Accionistastable from './Accionistastable';

const Multisearch: React.FC = () => {
  const [fileData, setFileData] = useState<string | null>(null);
  const { user, error, isLoading } = useUser();
  const userEmail = user?.email;
  const [CreditosFuentes, setCreditosFuente] = useState<any[]>([]);
  const [userCredits, setUserCredits] = useState<number | null>(null);
  const [userVencimiento, setUserVencimiento] = useState<number | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [planId, setPlanId] = useState<number | null>(null);
  const [userPlanPrice, setUserPlanPrice] = useState<number | null>(null);
  const [selectedSource, setSelectedSource] = useState<string>('');
  const [selectedFuenteCredito, setSelectedFuenteCredito] = useState<number | null>(null);
  const [fuenteseleccionada, setFuenteseleccionada] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [data, setData] = useState<any>(null);
  const currentDate = new Date();
  const [selectedFuenteConsulta, setSelectedFuenteConsulta] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>("nombres"); // Por defecto selecciona "nombre"
  
  async function enviarCorreo(jsonResponse: { data: { id: any; }; }){
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
    console.log("url de historial", data.data.attributes.archivo.data.attributes.url);
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
              contenido: process.env.NEXT_PUBLIC_STRAPI_URL+data.data.attributes.archivo.data.attributes.url,
            },
          }),
          cache: "no-store",
        }
      );
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

  useEffect(() => {
    // Agrega un event listener para el evento 'beforeunload'
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isLoadingData) {
        // Mostrar un cuadro de diálogo personalizado en lugar de la alerta del navegador
        e.preventDefault();
        e.returnValue = '';
        const confirmationMessage = 'Estás abandonando la página mientras se realiza una búsqueda. ¿Estás seguro?';
        if (window.confirm(confirmationMessage)) {
          e.returnValue = null; // Permite abandonar la página si el usuario confirma
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Limpia el event listener cuando el componente se desmonta
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isLoadingData]);

  const handleDownloadJSON = () => {
    if (data) {
      // Convierte los datos a formato JSON
      const jsonData = JSON.stringify(data, null, 2);

      // Crea un Blob con los datos JSON
      const blob = new Blob([jsonData], { type: 'application/json' });

      // Genera una URL para el Blob
      const url = URL.createObjectURL(blob);

      // Crea un enlace de descarga
      const a = document.createElement("a");
      a.href = url;
      a.download = "datos.json";

      // Simula un clic en el enlace para iniciar la descarga
      a.click();

      // Libera los recursos
      URL.revokeObjectURL(url);
    }
  };

  async function getuser() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/auth0users?populate=*&filters[email][$eq]=${userEmail}`, {

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
      console.log("creditos-fuentes", data)
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data, ${error}`);
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const binaryString = event.target?.result as string;
        const workbook = XLSX.read(binaryString, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Filtrar y mapear las celdas que no están vacías ni contienen caracteres especiales
        const filteredData = sheetData
          .flat()
          .filter((cell) => {
            if (typeof cell === 'string') {
              // Verificar si la celda no está vacía y no contiene caracteres especiales
              return cell.trim() !== '' && /^[A-Za-z0-9\s]+$/.test(cell);
            } else if (typeof cell === 'number') {
              // Conservar los números sin filtrar
              return true;
            }
            return false;
          });

        // Eliminar valores duplicados usando una matriz y un conjunto auxiliar
        const uniqueData = [];
        const seen = new Set();

        for (const item of filteredData) {
          if (!seen.has(item)) {
            seen.add(item);
            uniqueData.push(item);
          }
        }

        // Mostrar los valores únicos en la consola
        console.log('Valores únicos encontrados:', uniqueData);

        // Convierte los valores únicos en una cadena separada por comas y consoléala.
        const dataAsString = uniqueData.join(', ');
        console.log('FileData', dataAsString);

        // Guardar los datos del archivo Excel en el estado
        setFileData(dataAsString);
      };

      reader.readAsBinaryString(file);
    }
  };

  const getSourceValue = () => {
    const selector = document.getElementById('sourceSelector') as HTMLSelectElement;
    setFuenteseleccionada(selector.value)
    return selector.value;
  };

  const handleSourceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    // Encuentra el objeto de fuente seleccionada desde el array CreditosFuentes
    const selectedFuenteObj = CreditosFuentes.find(
      (fuenteObj) => fuenteObj.attributes.fuente === selectedValue
    );

    // Actualiza el estado de la fuente de datos seleccionada y la fuente de consulta
    setSelectedSource(selectedFuenteObj ? selectedFuenteObj.attributes.fuente : "");
    setSelectedFuenteCredito(selectedFuenteObj ? selectedFuenteObj.attributes.credito : null);
    setSelectedFuenteConsulta(selectedFuenteObj ? selectedFuenteObj.attributes.consulta : null);
  };

  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value); // Actualiza el estado del tipo de búsqueda
  };


  const handleButtonClick = async () => {


    setIsLoadingData(true);
    try {
      const response = await fetch('https://splunk.hctint.com:9876/data/create_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          list: fileData?.split(', '),
          item_type: selectedType,
          source: getSourceValue(),
          key: 'valid_api_key'
        }),
      });

      console.log("filedata", fileData)

      if (response.ok) {
        const jsonData = await response.json();
        console.log("json", jsonData)
        const secondResponse = await fetch('https://splunk.hctint.com:9876/data/get_full_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query_id: jsonData.query_id,
            selection: {},
            creator_key: 'valid_api_key',
            key: 'valid_api_key'
          }),
        });

        if (secondResponse.ok) {
          const secondJsonData = await secondResponse.json();
          console.log("secondJsonData:", secondJsonData)
          const noticias = secondJsonData.data;

          console.log("notocias:", noticias)

          setData(noticias)

          // if (selectedSource === "judicial") {
          //   JudicialesExcel(noticias);
          // }

          // if (selectedSource === "noticias") {
          //   NoticiasExcel(noticias);
          // }

          // if (selectedSource === "titulos") {
          //   TitulosExcel(noticias);
          // }


          //////////////////////////////////////////// RESTA DE CRÉDITOS /////////////////////////////////////////////


          if (userCredits) {
            var restacreditos = fileData && selectedFuenteCredito && userCredits - selectedFuenteCredito * fileData.length
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

          //////////////////////////////////////////// HISTORIAL /////////////////////////////////////////////

          if (selectedSource === "judicial") {
            if (selectedFuenteCredito !== null) {
              const newformdata = new FormData();

              // Create an object with your data
              const postData = {
                auth_0_user: userId,
                creditos: selectedFuenteCredito && fileData && fileData.split(', ').length * selectedFuenteCredito * -1,
                fecha: currentDate,
                precio: 0,
                consulta: "Búsqueda por lote",
                plane: planId,
              };

              // Append the JSON data as a string
              newformdata.append('data', JSON.stringify(postData));

              // Generate the Excel file as a Blob using the generateExcelBlob function
              const excelBlob = await JudicialesExcel(noticias);

              // Append the Excel Blob to FormData
              newformdata.append('files.archivo', excelBlob, 'Noticias del delito.xlsx');

              // Now, you can make your fetch request
              const posthistorial = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                  },
                  body: newformdata, // Use the FormData object as the body
                  cache: "no-store",
                }
              );
              if (posthistorial.ok) {
                const jsonResponse = await posthistorial.json();
                console.log("Respuesta de la API:", jsonResponse);
                enviarCorreo(jsonResponse);
              }
            }
            
          }

          if (selectedSource === "noticias") {
            if (selectedFuenteCredito !== null) {
              const newformdata = new FormData();

              // Create an object with your data
              const postData = {
                auth_0_user: userId,
                creditos: selectedFuenteCredito && fileData && fileData.split(', ').length * selectedFuenteCredito * -1,
                fecha: currentDate,
                precio: 0,
                consulta: "Búsqueda por lote",
                plane: planId,
              };

              // Append the JSON data as a string
              newformdata.append('data', JSON.stringify(postData));

              // Generate the Excel file as a Blob using the generateExcelBlob function
              const excelBlob = await NoticiasExcel(noticias);

              // Append the Excel Blob to FormData
              newformdata.append('files.archivo', excelBlob, 'Noticias del delito.xlsx');

              // Now, you can make your fetch request
              const posthistorial = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                  },
                  body: newformdata, // Use the FormData object as the body
                  cache: "no-store",
                }
              );
              if (posthistorial.ok) {
                const jsonResponse = await posthistorial.json();
                console.log("Respuesta de la API:", jsonResponse);
                enviarCorreo(jsonResponse);
            }
            }
          }

          if (selectedSource === "titulos") {
            if (selectedFuenteCredito !== null) {
              const newformdata = new FormData();

              // Create an object with your data
              const postData = {
                auth_0_user: userId,
                creditos: selectedFuenteCredito && fileData && fileData.split(', ').length * selectedFuenteCredito * -1,
                fecha: currentDate,
                precio: 0,
                consulta: "Búsqueda por lote",
                plane: planId,
              };

              // Append the JSON data as a string
              newformdata.append('data', JSON.stringify(postData));

              // Generate the Excel file as a Blob using the generateExcelBlob function
              const excelBlob = await TitulosExcel(noticias);

              // Append the Excel Blob to FormData
              newformdata.append('files.archivo', excelBlob, 'Noticias del delito.xlsx');

              // Now, you can make your fetch request
              const posthistorial = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/historials`,
                {
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_KEY}`,
                  },
                  body: newformdata, // Use the FormData object as the body
                  cache: "no-store",
                }
              );
              if (posthistorial.ok) {
                const jsonResponse = await posthistorial.json();
                console.log("Respuesta de la API:", jsonResponse);
                enviarCorreo(jsonResponse);
            }
            }
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
      setIsLoadingData(false);

    }

  };

  const copyDataToClipboard = () => {
    console.log('Clic en datos');
    // Verifica si existe data antes de copiarla al portapapeles
    if (data) {
      // Convierte data a formato JSON y lo copia al portapapeles
      const jsonData = JSON.stringify(data, null, 2);
      console.log("copiar")
      navigator.clipboard.writeText(jsonData)
        .then(() => {
          alert('Datos copiados al portapapeles');
        })
        .catch((error) => {
          console.error('Error al copiar datos al portapapeles:', error);
        });
    }
  };

  return (
    <div>

      {!data &&
        <div className='buscador-container'>
          <label className='buscador-label aviso'>En los siguientes campos tienes que seleccionar la fuente de datos, y consecuentemente subir el archivo en formato xlsx (Excel).</label>
          <br></br>
          <label className='buscador-label'>Selecciona el tipo de búsqueda</label>
          <select
            id="typeSelector"
            value={selectedType}
            onChange={handleTypeSelect}
            className='search-inputs'
          >
            <option value="nombres">Nombres</option>
            <option value="cedulas">Cédulas</option>
          </select>
          <br></br>
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
              <option className='options' key={fuente.id} value={fuente.attributes.fuente}>
                {fuente.attributes.consulta}
              </option>
            ))}
          </select>
        </div>
      }

      {!data && <>
        <br></br>
        <label className='buscador-label-excel'>Sube tu archivo en formato Excel (*.xlsx)</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
          className='input-file'
        />
        <br></br></>
      }

      {isLoadingData &&
        <div className='loading-overlay'>
          <p>Estamos procesando tus datos</p>
          <br></br>
          {/* <p>En breve comenzará la descarga</p> */}
          <CircularProgress></CircularProgress>
        </div>
      }
      {!data && fileData && fileData.split(', ').length >= 1 &&
        <>
          <br></br>
          <p>Créditos a consumir: {selectedFuenteCredito && fileData && fileData?.split(', ').length * selectedFuenteCredito}</p>

          <button onClick={handleButtonClick} className='download-button mostrar-datos'  >Obtener Datos</button>
        </>}

      {data && (

        <>
          <p>Datos obtenidos sobre  {selectedFuenteConsulta}</p>
          <br></br>
          <div className='table-container' onClick={copyDataToClipboard}>

            {fuenteseleccionada == "noticias" && <Noticiastable dataToDownload={data} />}
            {fuenteseleccionada == "judicial" && <Judicialestable dataToDownload={data} />}
            {fuenteseleccionada == "titulos" && <Titulostable dataToDownload={data} />}
            {fuenteseleccionada == "accionistas" && <Accionistastable dataToDownload={data} />}

          </div>

          <div className='download-button-container'>

            {fuenteseleccionada == "noticias" && <button className='download-button excel' onClick={() => NoticiasExcel(data)}>Descargar Excel</button>}
            {fuenteseleccionada == "judicial" && <button className='download-button excel' onClick={() => JudicialesExcel(data)}>Descargar Excel</button>}
            {fuenteseleccionada == "titulos" && <button className='download-button excel' onClick={() => TitulosExcel(data)}>Descargar Excel</button>}

            <button className='download-button json' onClick={handleDownloadJSON}>Descargar Json</button>

          </div>
        </>
      )}

    </div>
  );
};

export default Multisearch;
