import ExcelJS from 'exceljs';

export const JudicialesExcel = async (dataToDownload: any, consulta: string) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Datos');

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
    "RUC/Nombre",
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
    "Condicion",
    "Id Incidente Judicatura",
    "Id Movimiento Juicio Incidente",
    "Id Judicatura Destino",
    "Fecha Crea",
    "Incidente",
    "Litigante Actor Tipo",
    "Litigante Actor Nombres",
    "Litigante Actor Representado Por",
    "Litigante Actor Id",
    "Litigante Demandado Tipo",
    "Litigante Demandado Nombres",
    "Litigante Demandado Representado Por",
    "Litigante Demandado Id",
    "Litigante Actor",
    "Litigante Demandado"
  ]);
  
  worksheet.getColumn(1).numFmt = '@';
  
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
          const incidentes = entry.incidente || [];

          // Agregar fila principal
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

          // Agregar filas para cada incidente
          for (const incidente of incidentes) {
            const incidenteRowData = [
              replaceNullWithSinDatos(ruc), // RUC/Nombre (copiado del padre)
              replaceNullWithSinDatos(entry.type), // Type (copiado del padre)
              replaceNullWithSinDatos(entry.id_juicio), // Id Juicio (copiado del padre)
              replaceNullWithSinDatos(entry.delito), // Delito (copiado del padre)
              replaceNullWithSinDatos(entry.fecha_ingreso), // Fecha Ingreso (copiado del padre)
              replaceNullWithSinDatos(entry.ie_documento_adjunto), // IE Documento Adjunto (copiado del padre)
              replaceNullWithSinDatos(entry.nombre), // Nombre (copiado del padre)
              replaceNullWithSinDatos(entry.cedula), // Cedula (copiado del padre)
              replaceNullWithSinDatos(entry.materia), // Materia (copiado del padre)
              replaceNullWithSinDatos(entry.estado_juicio), // Estado Juicio (copiado del padre)
              replaceNullWithSinDatos(entry.judicatura), // Judicatura (copiado del padre)
              replaceNullWithSinDatos(entry.tipo_resolucion), // Tipo Resolucion (copiado del padre)
              replaceNullWithSinDatos(entry.tipo_accion), // Tipo Accion (copiado del padre)
              replaceNullWithSinDatos(entry.fecha_providencia), // Fecha Providencia (copiado del padre)
              replaceNullWithSinDatos(entry.providencia), // Providencia (copiado del padre)
              replaceNullWithSinDatos(entry.provincia), // Provincia (copiado del padre)
              replaceNullWithSinDatos(entry.condicion), // Condicion (copiado del padre)
              replaceNullWithSinDatos(incidente.id_incidente_judicatura),
              replaceNullWithSinDatos(incidente.id_movimiento_juicio_incidente),
              replaceNullWithSinDatos(incidente.id_judicatura_destino),
              replaceNullWithSinDatos(incidente.fecha_crea),
              replaceNullWithSinDatos(incidente.incidente),
              "", // Litigante Actor Tipo (vacío por ahora)
              "", // Litigante Actor Nombres (vacío por ahora)
              "", // Litigante Actor Representado Por (vacío por ahora)
              "", // Litigante Actor Id (vacío por ahora)
              "", // Litigante Demandado Tipo (vacío por ahora)
              "", // Litigante Demandado Nombres (vacío por ahora)
              "", // Litigante Demandado Representado Por (vacío por ahora)
              "", // Litigante Demandado Id (vacío por ahora)
              replaceNullWithSinDatos(incidente.litigante_actor),
              replaceNullWithSinDatos(incidente.litigante_demandado)
            ];
            worksheet.addRow(incidenteRowData);

            // Agregar filas para cada litigante actor
            const litiganteActores = incidente.lst_litigante_actor || [];
            for (const litiganteActor of litiganteActores) {
              const litiganteActorRowData = [
                replaceNullWithSinDatos(ruc), // RUC/Nombre (copiado del padre)
                replaceNullWithSinDatos(entry.type), // Type (copiado del padre)
                replaceNullWithSinDatos(entry.id_juicio), // Id Juicio (copiado del padre)
                replaceNullWithSinDatos(entry.delito), // Delito (copiado del padre)
                replaceNullWithSinDatos(entry.fecha_ingreso), // Fecha Ingreso (copiado del padre)
                replaceNullWithSinDatos(entry.ie_documento_adjunto), // IE Documento Adjunto (copiado del padre)
                replaceNullWithSinDatos(entry.nombre), // Nombre (copiado del padre)
                replaceNullWithSinDatos(entry.cedula), // Cedula (copiado del padre)
                replaceNullWithSinDatos(entry.materia), // Materia (copiado del padre)
                replaceNullWithSinDatos(entry.estado_juicio), // Estado Juicio (copiado del padre)
                replaceNullWithSinDatos(entry.judicatura), // Judicatura (copiado del padre)
                replaceNullWithSinDatos(entry.tipo_resolucion), // Tipo Resolucion (copiado del padre)
                replaceNullWithSinDatos(entry.tipo_accion), // Tipo Accion (copiado del padre)
                replaceNullWithSinDatos(entry.fecha_providencia), // Fecha Providencia (copiado del padre)
                replaceNullWithSinDatos(entry.providencia), // Providencia (copiado del padre)
                replaceNullWithSinDatos(entry.provincia), // Provincia (copiado del padre)
                replaceNullWithSinDatos(entry.condicion), // Condicion (copiado del padre)
                replaceNullWithSinDatos(incidente.id_incidente_judicatura), // Id Incidente Judicatura (copiado del incidente)
                replaceNullWithSinDatos(incidente.id_movimiento_juicio_incidente), // Id Movimiento Juicio Incidente (copiado del incidente)
                replaceNullWithSinDatos(incidente.id_judicatura_destino), // Id Judicatura Destino (copiado del incidente)
                replaceNullWithSinDatos(incidente.fecha_crea), // Fecha Crea (copiado del incidente)
                replaceNullWithSinDatos(incidente.incidente), // Incidente (copiado del incidente)
                replaceNullWithSinDatos(litiganteActor.tipo_litigante),
                replaceNullWithSinDatos(litiganteActor.nombres_litigante),
                replaceNullWithSinDatos(litiganteActor.representado_por),
                replaceNullWithSinDatos(litiganteActor.id_litigante),
                "", // Litigante Demandado Tipo (vacío)
                "", // Litigante Demandado Nombres (vacío)
                "", // Litigante Demandado Representado Por (vacío)
                "", // Litigante Demandado Id (vacío)
                "", // Litigante Actor (vacío)
                "" // Litigante Demandado (vacío)
              ];
              worksheet.addRow(litiganteActorRowData);
            }

            // Agregar filas para cada litigante demandado
            const litiganteDemandados = incidente.lst_litigante_demandado || [];
            for (const litiganteDemandado of litiganteDemandados) {
              const litiganteDemandadoRowData = [
                replaceNullWithSinDatos(ruc), // RUC/Nombre (copiado del padre)
                replaceNullWithSinDatos(entry.type), // Type (copiado del padre)
                replaceNullWithSinDatos(entry.id_juicio), // Id Juicio (copiado del padre)
                replaceNullWithSinDatos(entry.delito), // Delito (copiado del padre)
                replaceNullWithSinDatos(entry.fecha_ingreso), // Fecha Ingreso (copiado del padre)
                replaceNullWithSinDatos(entry.ie_documento_adjunto), // IE Documento Adjunto (copiado del padre)
                replaceNullWithSinDatos(entry.nombre), // Nombre (copiado del padre)
                replaceNullWithSinDatos(entry.cedula), // Cedula (copiado del padre)
                replaceNullWithSinDatos(entry.materia), // Materia (copiado del padre)
                replaceNullWithSinDatos(entry.estado_juicio), // Estado Juicio (copiado del padre)
                replaceNullWithSinDatos(entry.judicatura), // Judicatura (copiado del padre)
                replaceNullWithSinDatos(entry.tipo_resolucion), // Tipo Resolucion (copiado del padre)
                replaceNullWithSinDatos(entry.tipo_accion), // Tipo Accion (copiado del padre)
                replaceNullWithSinDatos(entry.fecha_providencia), // Fecha Providencia (copiado del padre)
                replaceNullWithSinDatos(entry.providencia), // Providencia (copiado del padre)
                replaceNullWithSinDatos(entry.provincia), // Provincia (copiado del padre)
                replaceNullWithSinDatos(entry.condicion), // Condicion (copiado del padre)
                replaceNullWithSinDatos(incidente.id_incidente_judicatura), // Id Incidente Judicatura (copiado del incidente)
                replaceNullWithSinDatos(incidente.id_movimiento_juicio_incidente), // Id Movimiento Juicio Incidente (copiado del incidente)
                replaceNullWithSinDatos(incidente.id_judicatura_destino), // Id Judicatura Destino (copiado del incidente)
                replaceNullWithSinDatos(incidente.fecha_crea), // Fecha Crea (copiado del incidente)
                replaceNullWithSinDatos(incidente.incidente), // Incidente (copiado del incidente)
                "", // Litigante Actor Tipo (vacío)
                "", // Litigante Actor Nombres (vacío)
                "", // Litigante Actor Representado Por (vacío)
                "", // Litigante Actor Id (vacío)
                replaceNullWithSinDatos(litiganteDemandado.tipo_litigante),
                replaceNullWithSinDatos(litiganteDemandado.nombres_litigante),
                replaceNullWithSinDatos(litiganteDemandado.representado_por),
                replaceNullWithSinDatos(litiganteDemandado.id_litigante),
                "", // Litigante Actor (vacío)
                "" // Litigante Demandado (vacío)
              ];
              worksheet.addRow(litiganteDemandadoRowData);
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