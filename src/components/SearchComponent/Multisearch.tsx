import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';
import { UserProvider, useUser } from '@auth0/nextjs-auth0/client';
import CircularProgress from '@mui/material/CircularProgress';
import ExcelJS from 'exceljs';
import "./Multisearch.css"
import Noticiastable from './Noticiastable';
import { NoticiasExcel } from './NoticiasExcel';
import { JudicialesExcel } from './JudicialesExcel';
import Judicialestable from './Judicialestable';

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
  const [selectedFuenteConsulta, setSelectedFuenteConsulta] = useState<string | null>(null);

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

        // Filtrar y mapear las celdas que contienen números
        const numbers = sheetData
          .flat()
          .filter((cell) => typeof cell === 'number' && !isNaN(cell));

        // Eliminar números duplicados usando una matriz y un conjunto auxiliar
        const uniqueNumbers = [];
        const seen = new Set();

        for (const num of numbers) {
          if (!seen.has(num)) {
            seen.add(num);
            uniqueNumbers.push(num);
          }
        }

        // Mostrar los números únicos en la consola
        console.log('Números únicos encontrados:', uniqueNumbers);

        // Convierte los números únicos en una cadena separada por comas y consoléala.
        const numbersAsString = uniqueNumbers.join(', ');
        console.log('Números únicos como cadena:', numbersAsString);

        // Guardar los datos del archivo Excel en el estado
        setFileData(numbersAsString);
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
    setSelectedSource(selectedValue); // Update the selected source state when the user selects an option

    // Find the selected fuente object from the CreditosFuentes array
    const selectedFuenteObj = CreditosFuentes.find(
      (fuenteObj) => fuenteObj.attributes.fuente === selectedValue
    );

    // Update the selectedFuenteCredito state with the corresponding credito value
    setSelectedFuenteCredito(selectedFuenteObj ? selectedFuenteObj.attributes.credito : null);
    setSelectedFuenteConsulta(selectedFuenteObj ? selectedFuenteObj.attributes.consulta : null);
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

          if (selectedSource === "judicial") {
            JudicialesExcel(noticias);
          }

          if (selectedSource === "noticias") {
            NoticiasExcel(noticias);
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

  const handleDownloadExcel = async (dataToDownload: any) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Datos');

    // Definir estilos para el encabezado
    const headerStyle = {
      font: { size: 15, bold: true }, // Cambiamos el tamaño de fuente a 15
      alignment: { horizontal: 'center' },
      fill: {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD9D9D9' }, // Color de relleno gris
      },
    };

    // Agregar fila de encabezado
    const headerRow = worksheet.addRow([
      "Ruc",
      "Type",
      "Lugar",
      "Noticia del delito",
      "Estado",
      "Delito",
      "Unidad",
      "Fecha",
      "Digitador",
      "Numero informe",
      "Resumen unidad",
      "Sujetos",
      "Cedula",
      "Nombre",
      "Estado"
    ]);

    // Aplicar estilo al encabezado
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '0099CC' },
      };
      cell.font = {
        color: { argb: 'FFFFFF' }, // Color de fuente blanco
        bold: true,
        size: 13,
      };
      cell.alignment = { horizontal: 'center' }; // Alineación horizontal centrada
    });

    // Recorrer el JSON y agregar los datos a la hoja de trabajo
    for (const key in dataToDownload) {
      if (Object.prototype.hasOwnProperty.call(dataToDownload, key)) {
        const entryData = dataToDownload[key];
        const ruc = key;

        // Verificar si hay datos para este "ruc"
        if (Object.keys(entryData).length > 0) {
          for (const entryKey in entryData) {
            if (Object.prototype.hasOwnProperty.call(entryData, entryKey)) {
              const sujetos = entryData[entryKey]["sujetos"];
              if (sujetos) {
                for (const sujetoKey in sujetos) {
                  if (Object.prototype.hasOwnProperty.call(sujetos, sujetoKey)) {
                    const sujetoData = sujetos[sujetoKey];
                    const rowData = [
                      ruc, // Columna "Ruc"
                      entryData[entryKey].type || "",
                      entryData[entryKey]["lugar"] || "",
                      entryData[entryKey]["Noticia del delito"] || "",
                      entryData[entryKey]["estado"] || "",
                      entryData[entryKey]["delito"] || "",
                      entryData[entryKey]["unidad"] || "",
                      entryData[entryKey]["fecha"] || "",
                      entryData[entryKey]["digitador"] || "",
                      entryData[entryKey]["numero informe"] || "",
                      entryData[entryKey]["resumen unidad"] || "",
                      sujetoKey, // Columna "sujetos"
                      sujetoData["cedula"] || "", // Columna "cedula"
                      sujetoData["nombre"] || "", // Columna "nombre"
                      sujetoData["estado"] || "" // Columna "estado"
                    ];

                    worksheet.addRow(rowData);
                  }
                }
              }
            }
          }
        } else {
          // Agregar una fila solo si el "ruc" está vacío
          const rucRowData = [ruc, "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos", "sin datos"];
          worksheet.addRow(rucRowData);
        }
      }
    }

    // Ajustar automáticamente el ancho de las columnas al contenido

    worksheet.columns.forEach((column) => {
      let maxLength = 0;
      if (column.eachCell) {
        column.eachCell({ includeEmpty: true }, (cell) => {
          const columnLength = cell.value ? cell.value.toString().length + 10 : 0;
          if (columnLength > maxLength) {
            maxLength = columnLength;
          }
        });
      }
      column.width = maxLength < 10 ? 10 : maxLength + 2; // Establecer un ancho mínimo
    });

    worksheet.autoFilter = {
      from: {
        row: 1, // Fila de encabezado
        column: 1, // Columna de inicio (1 para la primera columna)
      },
      to: {
        row: worksheet.rowCount + 1, // +1 para incluir la fila de encabezado
        column: worksheet.columns.length, // Última columna
      },
    };

    // Generar archivo Excel
    const buffer = await workbook.xlsx.writeBuffer();

    // Crear un Blob y enlace de descarga
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "datos.xlsx";

    // Simular un clic en el enlace para iniciar la descarga
    a.click();
    // Liberar recursos
    URL.revokeObjectURL(url);

  };

  return (
    <div>

      {!data &&
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
              <option className='options' key={fuente.id} value={fuente.attributes.fuente}>
                {fuente.attributes.consulta}
              </option>
            ))}
          </select>
        </div>
      }


      {!data && <>
        <br></br>
        <label className='buscador-label-excel'>Subir Excel</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileChange}
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
          <p>Créditos a consumir: {fileData && selectedFuenteCredito && fileData.split(', ').length * selectedFuenteCredito}</p>
          <button onClick={handleButtonClick} className='download-button mostrar-datos'  >Obtener Datos</button>
        </>}

      {data && (

        <>
          <p>Datos obtenidos sobre  {selectedFuenteConsulta}</p>
          <br></br>
          <div className='table-container' onClick={copyDataToClipboard}>

            {fuenteseleccionada == "noticias" && <Noticiastable dataToDownload={data} />}
            {fuenteseleccionada == "judicial" && <Judicialestable dataToDownload={data} />}

          </div>

          <div className='download-button-container'>

            {fuenteseleccionada == "noticias" && <button className='download-button excel' onClick={() => NoticiasExcel(data)}>Descargar Excel</button>}
            {fuenteseleccionada == "judicial" && <button className='download-button excel' onClick={() => JudicialesExcel(data)}>Descargar Excel</button>}

            <button className='download-button json' onClick={handleDownloadJSON}>Descargar Json</button>

          </div>
        </>
      )}

    </div>
  );
};

export default Multisearch;