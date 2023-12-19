import ExcelJS from 'exceljs';

export const JudicialesExcel = async (dataToDownload: any, consulta: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos');

  // Definir estilos para el encabezado
  const headerStyle = {
    font: { size: 15, bold: true },
    alignment: { horizontal: 'center' },
    fill: {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD9D9D9' },
    },
  };

  // Agregar fila de encabezado
  const headerRow = worksheet.addRow([
    "Ruc",
    "Type",
    "Id Juicio",
    "Delito",
    "Fecha Ingreso",
    "IE Documento Adjunto",
    "Nombre",
    "Cedula",
    "Materia",
    "Estado Juicio",
    "Judicatura",
    "Tipo Resolucion",
    "Tipo Accion",
    "Fecha Providencia",
    "Providencia",
    "Provincia",
    "Condicion"
  ]);

  // Aplicar estilo al encabezado
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: '0099CC' },
    };
    cell.font = {
      color: { argb: 'FFFFFF' },
      bold: true,
      size: 13,
    };
    cell.alignment = { horizontal: 'center' };
  });

  // Función para reemplazar valores nulos por "sin datos"
  const replaceNullWithSinDatos = (value: any) => {
    return value === null || value === "" ? "sin datos" : value;
  };

  // Recorrer el JSON y agregar los datos a la hoja de trabajo
  for (const ruc in dataToDownload) {
    if (Object.prototype.hasOwnProperty.call(dataToDownload, ruc)) {
      const rucData = dataToDownload[ruc];
      if (Object.keys(rucData).length === 0) {
        // Si el RUC es un objeto vacío, agregar una fila con "sin datos" en todas las columnas
        const rucRowData = [
          replaceNullWithSinDatos(ruc),
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos",
          "sin datos"
        ];

        worksheet.addRow(rucRowData);
      } else {
        // Si el RUC no es un objeto vacío, procesar los datos normales
        for (const entryKey in rucData) {
          if (Object.prototype.hasOwnProperty.call(rucData, entryKey)) {
            const entry = rucData[entryKey];
            const rowData = [
              replaceNullWithSinDatos(ruc),
              replaceNullWithSinDatos(entry.type),
              replaceNullWithSinDatos(entry.id_juicio),
              replaceNullWithSinDatos(entry.delito),
              replaceNullWithSinDatos(entry.fecha_ingreso),
              replaceNullWithSinDatos(entry.ie_documento_adjunto),
              replaceNullWithSinDatos(entry.nombre),
              replaceNullWithSinDatos(entry.cedula),
              replaceNullWithSinDatos(entry.materia),
              replaceNullWithSinDatos(entry.estado_juicio),
              replaceNullWithSinDatos(entry.judicatura),
              replaceNullWithSinDatos(entry.tipo_resolucion),
              replaceNullWithSinDatos(entry.tipo_accion),
              replaceNullWithSinDatos(entry.fecha_providencia),
              replaceNullWithSinDatos(entry.providencia),
              replaceNullWithSinDatos(entry.provincia),
              replaceNullWithSinDatos(entry.condicion)
            ];

            worksheet.addRow(rowData);
          }
        }
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
    column.width = maxLength < 10 ? 10 : maxLength + 2;
  });

  worksheet.autoFilter = {
    from: {
      row: 1,
      column: 1,
    },
    to: {
      row: worksheet.rowCount + 1,
      column: worksheet.columns.length,
    },
  };

  // Generar archivo Excel
  const buffer = await workbook.xlsx.writeBuffer();

  // Crear un Blob y enlace de descarga
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =  consulta+".xlsx";

  // Simular un clic en el enlace para iniciar la descarga
  a.click();
  // Liberar recursos
  URL.revokeObjectURL(url);
  return new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

};