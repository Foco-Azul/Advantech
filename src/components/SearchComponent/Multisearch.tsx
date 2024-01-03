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
import AccionistasExcel from './AccionistasExcel';

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
  const [progress, setProgress] = useState(0);
  const [selectedFuenteLimite, setselectedFuenteLimite] = useState<number | null>(null);
  const [selectedFuenteEspera, setselectedFuenteEspera] = useState<number | null>(null);
  const [cantidadRucs, setcantidadRucs] = useState<number | null>(null);
  const [nombreArchivo, setnombreArchivo] = useState<string>("");


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

  }, [user]);



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
        // Obtener el nombre del archivo
        const fileName = file.name.replace(/\.[^/.]+$/, '');

        setnombreArchivo(fileName)
        // Verificar si el archivo es un archivo XLSX
        if (!binaryString.startsWith("PK")) {
          alert('El archivo no es un archivo XLSX válido.');
          // Limpiar el valor del input de archivos para permitir al usuario seleccionar otro archivo.
          e.target.value = '';
          return;
        }

        // Obtener la cantidad de pestañas (hojas) en el archivo Excel
        const numberOfSheets = workbook.SheetNames.length;

        if (numberOfSheets !== 1) {
          // Mostrar una alerta si el Excel no tiene exactamente una pestaña
          alert('El archivo debe tener solamente una pestaña.');
          // Limpiar el valor del input de archivos para permitir al usuario seleccionar otro archivo.
          e.target.value = '';
          return; // Salir de la función sin procesar el archivo
        }

        // Filtrar y mapear solo los valores que son números
        const filteredData = sheetData
          .flat()
          .filter((cell) => {
            // Verificar si la celda contiene solo letras o menos de 3 números (excluyendo el punto)
            const cellString = String(cell);
            const containsOnlyLetters = /^[a-zA-Z]+$/.test(cellString);
            const containsLessThanThreeNumbers = (cellString.match(/\d/g) || []).filter(digit => digit !== '.').length < 4;

            return !containsOnlyLetters && !containsLessThanThreeNumbers;
          });

        const uniqueData = [];
        const seen = new Set();

        for (const item of filteredData) {
          const strValue = String(item);
          if (!seen.has(strValue)) {
            seen.add(strValue);
            uniqueData.push(strValue);
          }
        }

        setcantidadRucs(uniqueData.length)

        if (selectedFuenteLimite && uniqueData.length > selectedFuenteLimite) {
          alert('Hay más de ' + selectedFuenteLimite + ' RUCs en el archivo. Por favor, verifica el archivo seleccionado.');
          // Limpiar el valor del input de archivos para permitir al usuario seleccionar otro archivo.
          e.target.value = '';
          return; // Salir de la función sin procesar el archivo
        }

        const dataAsString = uniqueData.join(', ');

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
    setselectedFuenteLimite(selectedFuenteObj ? selectedFuenteObj.attributes.limite : null)
    setselectedFuenteEspera(selectedFuenteObj ? selectedFuenteObj.attributes.espera : null)
  };

  const handleTypeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(e.target.value); // Actualiza el estado del tipo de búsqueda
  };

  const handleButtonClick = async () => {

    setIsLoadingData(true);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/create_search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          list: fileData?.split(', '),
          item_type: "cedulas",
          source: getSourceValue(),
          key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
        }),
      });

      //////////////////////////////////////////// RESTA DE CRÉDITOS /////////////////////////////////////////////

      if (userCredits) {
        var restacreditos = fileData && selectedFuenteCredito && userCredits - fileData?.split(', ').length * selectedFuenteCredito
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

      if (response.ok) {

        const jsonData = await response.json();

        //////////////////////////////// VERIFICAR EL ESTADO ////////////////////////////////

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
                  creditos: selectedFuenteCredito && fileData && fileData.split(', ').length * selectedFuenteCredito * -1,
                  fecha: currentDate,
                  precio: 0,
                  consulta: nombreArchivo + " - Lote - " + selectedSource,
                  plane: planId,
                  puntero: {},
                  status: "IN PROGRESS",
                  query_id: jsonData.query_id,
                  busqueda: JSON.stringify({
                    consulta: "Búsqueda por lote",
                    fuente: selectedSource,
                    archivo: nombreArchivo,
                    tipo: "lote",
                    tiempo: selectedFuenteEspera
                  }),
                },
              }),
              cache: "no-store",
            }
          );
        }






        let status = null;

        const HoraInicioenSegundos = Math.floor(new Date().getTime() / 1000);
        const CantidadTotaldeSegundos = cantidadRucs && selectedFuenteEspera && cantidadRucs * selectedFuenteEspera;
        
        while (status !== 'READY') {
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
          } else {
            // Si la API no está lista, calcula y actualiza el progreso antes de realizar la siguiente verificación
            const HoraActualenSegundos = Math.floor(new Date().getTime() / 1000);
            const tiempoTranscurrido = HoraActualenSegundos - HoraInicioenSegundos;
        
            if (CantidadTotaldeSegundos && CantidadTotaldeSegundos > 0) {
              setProgress((tiempoTranscurrido / CantidadTotaldeSegundos) * 100);
            }
        
            // Espera 1 segundo antes de realizar la siguiente verificación
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }
        
        //////////////////////////////// TRAER DATOS ////////////////////////////////

        const secondResponse = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/get_full_data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            query_id: jsonData.query_id,
            selection: {},
            key: `${process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY}`
          }),
        });

        if (secondResponse.ok) {
          const secondJsonData = await secondResponse.json();
          const noticias = secondJsonData.data;

          setData(noticias)

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
    // Verifica si existe data antes de copiarla al portapapeles
    if (data) {
      // Convierte data a formato JSON y lo copia al portapapeles
      const jsonData = JSON.stringify(data, null, 2);
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
            <option selected value="cedulas">Cédulas</option>
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
          <p>{Math.round(progress)}%</p>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <br></br>
          <p>Puedes esperar aquí o</p>
          <p>Visita tu  <a className='link-historial' href='/micuenta?ver=busquedas'>historial de búsquedas </a></p>
          <p>O realiza una<a className='link-historial' href='/busqueda'> nueva búsqueda</a></p>
          <br></br>

        </div>
      }
      {!data && fileData && fileData.split(', ').length >= 1 && selectedSource && selectedFuenteLimite && cantidadRucs && cantidadRucs <= selectedFuenteLimite &&
        <>
          <br></br>
          <p>Créditos a consumir: {selectedFuenteCredito && fileData && fileData?.split(', ').length * selectedFuenteCredito}</p>
          <p>Créditos disponibles: {userCredits}</p>
          <button onClick={handleButtonClick} className='download-button mostrar-datos'  >Obtener Datos</button>
        </>}
      {selectedFuenteLimite && cantidadRucs && cantidadRucs > selectedFuenteLimite &&
        <>
          <br></br>
          <p>La cantidad maxima de RUCs admitida es {selectedFuenteLimite}</p>
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

            {fuenteseleccionada == "noticias" && <button className='download-button' onClick={() => NoticiasExcel(data, nombreArchivo)}>Descargar Excel</button>}
            {fuenteseleccionada == "judicial" && <button className='download-button' onClick={() => JudicialesExcel(data, nombreArchivo)}>Descargar Excel</button>}
            {fuenteseleccionada == "titulos" && <button className='download-button' onClick={() => TitulosExcel(data, nombreArchivo)}>Descargar Excel</button>}
            {fuenteseleccionada == "accionistas" && <button className='download-button' onClick={() => AccionistasExcel(data, nombreArchivo)}>Descargar Excel</button>}


            <button className='download-button' onClick={handleDownloadJSON}>Descargar Json</button>

          </div>
          <br />
          <a className='volver-al-buscador lote' href='/busqueda' >Volver al buscador</a>
        </>
      )}

    </div>
  );
};

export default Multisearch;
