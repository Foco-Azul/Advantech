import ExcelJS from 'exceljs';

export const NoticiasExcel = async (dataToDownload: any, consulta: string) => {
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
    "RUC/Nombre",
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
                    entryData[entryKey]["noticia_del_delito"] || "",
                    entryData[entryKey]["estado"] || "",
                    entryData[entryKey]["delito"] || "",
                    entryData[entryKey]["unidad"] || "",
                    entryData[entryKey]["fecha"] || "",
                    entryData[entryKey]["digitador"] || "",
                    entryData[entryKey]["numero_informe"] || "",
                    entryData[entryKey]["resumen_unidad"] || "",
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
  a.download = consulta+".xlsx";

  // Simular un clic en el enlace para iniciar la descarga
  a.click();
  // Liberar recursos
  URL.revokeObjectURL(url);
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
};