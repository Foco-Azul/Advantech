import ExcelJS from 'exceljs';

export const AccionistasExcel = async (dataToDownload: any) => {

  //Creacion del libro
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Accionistas');

  //Creacion del header principal
  const principalHeader = worksheet.addRow([
    '',
    'Accionista Actual',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'Accionista Anterior',
    '',
    '',
    '',
    'Administracion Actual',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'Administracion Anterior',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    'Accionista en sociedades extranjeras',
    '',
    ''
  ]);

  // Aplicar estilo al header principal
  principalHeader.eachCell((cell) => {
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
    cell.border = {
      top: { style: 'medium', color: { argb: '000000' } },
      left: { style: 'medium', color: { argb: '000000' } },
      bottom: { style: 'medium', color: { argb: '000000' } },
      right: { style: 'medium', color: { argb: '000000' } },
    };
    cell.alignment = { horizontal: 'center' };
  });

  // Fusionar las celdas del header principal y establecer el número de columnas combinadas

  //Accionista Actual
  worksheet.mergeCells('B1:I1');
  //Accionista Anterior
  worksheet.mergeCells('J1:M1');
  //Administracion Actual
  worksheet.mergeCells('N1:Y1');
  //Administracion Anterior
  worksheet.mergeCells('Z1:AK1');
  //Accionista en sociedades extranjeras
  worksheet.mergeCells('AL1:AN1');

  //Creacion del header secundario
  const headerRow = worksheet.addRow([
    'Ruc',
    //Accionista Actual
    'Expediente',
    'Nombre',
    'Ruc',
    'Capital invertido',
    'Capital total cia',
    'Valor nominal',
    'Situacion legal',
    'Posesion efectiva',
    //Accionista Anterior
    'Expediente',
    'Nombre',
    'Ruc',
    'Situacion Legal',
    //Administracion Actual
    'Expediente',
    'Nombre',
    'Ruc',
    'Nacionalidad',
    'Cargo',
    'Fecha nombramiento',
    'Fecha termino',
    'Periodo',
    'Fecha Registro Mercantil',
    'Articulo',
    'n_registromercantil',
    'rladm',
    //Administracion Anterior
    'Expediente',
    'Nombre',
    'Ruc',
    'Nacionalidad',
    'Cargo',
    'Fecha nombramiento',
    'Fecha termino',
    'Periodo',
    'Fecha Registro Mercantil',
    'Articulo',
    'n_registromercantil',
    'rladm',
    //Accionista en sociedades extranjeras
    'Expediente',
    'Nombre',
    'Nacionalidad',
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
    cell.border = {
      top: { style: 'thin', color: { argb: '000000' } },
      left: { style: 'thin', color: { argb: '000000' } },
      bottom: { style: 'thin', color: { argb: '000000' } },
      right: { style: 'thin', color: { argb: '000000' } },
    };
    cell.alignment = { horizontal: 'center' };
  });

  // Recorrer los datos y agregar filas a la hoja de trabajo
  for (const ruc in dataToDownload) {

    // Validar que dentro del Ruc venga data
    if (Object.keys(dataToDownload[ruc]).length != 0)

      //Entrar a las propiedades del Ruc
      if (dataToDownload.hasOwnProperty(ruc)) {
        const userData = dataToDownload[ruc]["0"];
        const accionista_actual_en = userData["accionista_actual_en"];
        const accionista_anterior_en = userData["accionista_anterior_en"];
        const administracion_actual_en = userData["administracion_actual_en"];
        const administradores_anterior_en = userData["administradores_anterior_en"];
        const accionista_sociedades_extranjeras = userData["accionista_en_las_siguientes_sociedades_extranjeras"];

        // Añadir datos del Accionista Actual
        if (accionista_actual_en) {
          for (const key in accionista_actual_en) {
            if (accionista_actual_en.hasOwnProperty(key)) {
              const accionista = accionista_actual_en[key];
              const rowData = [
                ruc,
                //accionistaActual
                accionista.expediente || 'sin datos',
                accionista.nombre || 'sin datos',
                accionista.ruc || 'sin datos',
                accionista.capital_invertido || 'sin datos',
                accionista.capital_total_cia || 'sin datos',
                accionista.valor_nominal || 'sin datos',
                accionista.situacionlegal || 'sin datos',
                accionista.posesion_efectiva || 'sin datos',
                //accionistaAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaSociedadExtranjera
                'sin datos',
                'sin datos',
                'sin datos',
              ];
              worksheet.addRow(rowData);
            }
          }
        }

        // Añadir datos del Accionista Anterior
        if (accionista_anterior_en) {
          for (const key in accionista_anterior_en) {
            if (accionista_anterior_en.hasOwnProperty(key)) {
              const accionistaAnterior = accionista_anterior_en[key];
              const rowData = [
                ruc,
                //accionistaActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaAnterior
                accionistaAnterior.expediente || 'sin datos',
                accionistaAnterior.nombre || 'sin datos',
                accionistaAnterior.ruc || 'sin datos',
                accionistaAnterior.situacionlegal || 'sin datos',
                //administracionActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaSociedadExtranjera
                'sin datos',
                'sin datos',
                'sin datos',
              ];
              worksheet.addRow(rowData);
            }
          }
        }

        // Añadir datos de la Administración Actual
        if (administracion_actual_en) {
          for (const key in administracion_actual_en) {
            if (administracion_actual_en.hasOwnProperty(key)) {
              const administracionActual = administracion_actual_en[key];
              const rowData = [
                ruc,
                //accionistaActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionActual
                administracionActual.expediente || 'sin datos',
                administracionActual.nombre || 'sin datos',
                administracionActual.ruc || 'sin datos',
                administracionActual.nacionalidad || 'sin datos',
                administracionActual.cargo || 'sin datos',
                administracionActual.fechanombramiento || 'sin datos',
                administracionActual.fechatermino || 'sin datos',
                administracionActual.periodo || 'sin datos',
                administracionActual.fecha_registromercantil || 'sin datos',
                administracionActual.articulo || 'sin datos',
                administracionActual.n_registromercantil || 'sin datos',
                administracionActual.rladm || 'sin datos',
                //administracionAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaSociedadExtranjera
                'sin datos',
                'sin datos',
                'sin datos',
              ];
              worksheet.addRow(rowData);
            }
          }
        }

        // Añadir datos de los Administradores Anteriores
        if (administradores_anterior_en) {
          for (const key in administradores_anterior_en) {
            if (administradores_anterior_en.hasOwnProperty(key)) {
              const administracionAnterior = administradores_anterior_en[key];
              const rowData = [
                ruc,
                //accionistaActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionAnterior
                administracionAnterior.expediente || 'sin datos',
                administracionAnterior.nombre || 'sin datos',
                administracionAnterior.ruc || 'sin datos',
                administracionAnterior.nacionalidad || 'sin datos',
                administracionAnterior.cargo || 'sin datos',
                administracionAnterior.fechanombramiento || 'sin datos',
                administracionAnterior.fechatermino || 'sin datos',
                administracionAnterior.periodo || 'sin datos',
                administracionAnterior.fecha_registromercantil || 'sin datos',
                administracionAnterior.articulo || 'sin datos',
                administracionAnterior.n_registromercantil || 'sin datos',
                administracionAnterior.rladm || 'sin datos',
                //accionistaSociedadExtranjera
                'sin datos',
                'sin datos',
                'sin datos',
              ];
              worksheet.addRow(rowData);
            }
          }
        }

        // Añadir datos de los Accionistas en Sociedades Extranjeras
        if (accionista_sociedades_extranjeras) {
          for (const key in accionista_sociedades_extranjeras) {
            if (accionista_sociedades_extranjeras.hasOwnProperty(key)) {
              const accionistaSociedadExtranjera = accionista_sociedades_extranjeras[key];
              const rowData = [
                ruc,
                //accionistaActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionActual
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //administracionAnterior
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                'sin datos',
                //accionistaSociedadExtranjera
                accionistaSociedadExtranjera.expediente || 'sin datos',
                accionistaSociedadExtranjera.nombre || 'sin datos',
                accionistaSociedadExtranjera.nacionalidad || 'sin datos',
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

  //Agregar filtros al Excel
  worksheet.autoFilter = {
    from: {
      row: 2, // Fila de encabezado
      column: 1, // Columna de inicio (1 para la primera columna)
    },
    to: {
      row: worksheet.rowCount + 1, // +1 para incluir la fila de encabezado
      column: worksheet.columns.length, // Última columna
    },
  };

  // Generar el archivo Excel
  const buffer = await workbook.xlsx.writeBuffer();

  // Crear un Blob y enlace de descarga
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'accionistas.xlsx';

  // Simular un clic en el enlace para iniciar la descarga
  a.click();

  // Liberar recursos
  URL.revokeObjectURL(url);
  return new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
};

export default AccionistasExcel;
