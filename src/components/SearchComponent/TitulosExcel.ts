import ExcelJS from 'exceljs';

export const TitulosExcel = async (dataToDownload: any) => {
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
      for (const index in rucData) {
        if (Object.prototype.hasOwnProperty.call(rucData, index)) {
          const entry = rucData[index];
          for (const tituloIndex in entry.titulos) {
            if (Object.prototype.hasOwnProperty.call(entry.titulos, tituloIndex)) {
              const titulo = entry.titulos[tituloIndex];
              const rowData = [
                ruc,
                entry.nombre,
                entry.genero,
                entry.nacionalidad,
                titulo.nivel,
                titulo.titulo,
                titulo.institucion,
                titulo.tipo,
                titulo.reconocido,
                titulo.numero_de_registro,
                titulo.desde,
                titulo.observacion
              ];

              worksheet.addRow(rowData);
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
  a.download = "datos.xlsx";

  // Simular un clic en el enlace para iniciar la descarga
  a.click();
  // Liberar recursos
  URL.revokeObjectURL(url);
};
