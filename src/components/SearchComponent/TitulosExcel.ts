import ExcelJS from 'exceljs';

export const TitulosExcel = async (dataToDownload: any, consulta: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos');

  // Agregar encabezados
  const headerRow = worksheet.addRow([
    "Ruc",
    "Nombre",
    "Genero",
    "Nacionalidad",
    "Nivel",
    "Titulo",
    "Institucion",
    "Tipo",
    "Reconocido",
    "Numero de Registro",
    "Desde",
    "Observacion"
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

  // Recorrer el JSON y agregar los datos a la hoja de trabajo
  for (const ruc in dataToDownload) {
    if (Object.prototype.hasOwnProperty.call(dataToDownload, ruc)) {
      const rucData = dataToDownload[ruc];

      // Agregar fila con RUC y "Sin datos" en todas las columnas si el objeto está vacío
      if (Object.keys(rucData).length === 0) {
        const noDataRow = worksheet.addRow([
          ruc,
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos",
          "Sin datos"
        ]);

        noDataRow.eachCell((cell) => {
          cell.font = {
            size: 13,
          };
          cell.alignment = { horizontal: 'center' };
        });
      } else {
        // Agregar datos
        for (const index in rucData) {
          if (Object.prototype.hasOwnProperty.call(rucData, index)) {
            const entry = rucData[index];
            for (const tituloIndex in entry.titulos) {
              if (Object.prototype.hasOwnProperty.call(entry.titulos, tituloIndex)) {
                const titulo = entry.titulos[tituloIndex];
                const rowData = [
                  ruc,
                  entry.nombre || "Sin datos",
                  entry.genero || "Sin datos",
                  entry.nacionalidad || "Sin datos",
                  titulo.nivel || "Sin datos",
                  titulo.titulo || "Sin datos",
                  titulo.institucion || "Sin datos",
                  titulo.tipo || "Sin datos",
                  titulo.reconocido || "Sin datos",
                  titulo.numero_de_registro || "Sin datos",
                  titulo.desde || "Sin datos",
                  titulo.observacion || "Sin datos"
                ];

                worksheet.addRow(rowData);
              }
            }
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
