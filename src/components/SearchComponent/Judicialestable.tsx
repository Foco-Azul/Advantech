import React from 'react';

// Componente constante ExcelTable
const Judicialestable:React.FC<{ dataToDownload: any }> = ({ dataToDownload }) => (
  <table>
    <thead>
      <tr>
        <th className="header">Ruc</th>
        <th className="header">Type</th>
        <th className="header">Delito</th>
        <th className="header">Fecha Ingreso</th>
        <th className="header">Documento Adjunto</th>
        <th className="header">Nombre</th>
        <th className="header">Cedula</th>
        <th className="header">Materia</th>
        <th className="header">Estado Juicio</th>
        <th className="header">Judicatura</th>
        <th className="header">Tipo Resolucion</th>
        <th className="header">Tipo Accion</th>
        <th className="header">Fecha Providencia</th>
        <th className="header">Providencia</th>
        <th className="header">Provincia</th>
        <th className="header">Condicion</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(dataToDownload).map((ruc) => {
        const entryData = dataToDownload[ruc];

        if (Object.keys(entryData).length > 0) {
          return Object.keys(entryData).map((entryKey) => {
            const juicioData = entryData[entryKey];

            return (
              <tr key={entryKey}>
                <td>{ruc}</td>
                <td>{juicioData.type || "sin datos"}</td>
                <td>{juicioData.delito || "sin datos"}</td>
                <td>{juicioData.fecha_ingreso || "sin datos"}</td>
                <td>{juicioData.ie_documento_adjunto || "sin datos"}</td>
                <td>{juicioData.nombre || "sin datos"}</td>
                <td>{juicioData.cedula || "sin datos"}</td>
                <td>{juicioData.materia || "sin datos"}</td>
                <td>{juicioData.estado_juicio || "sin datos"}</td>
                <td>{juicioData.judicatura || "sin datos"}</td>
                <td>{juicioData.tipo_resolucion || "sin datos"}</td>
                <td>{juicioData.tipo_accion || "sin datos"}</td>
                <td>{juicioData.fecha_providencia || "sin datos"}</td>
                <td>{juicioData.providencia || "sin datos"}</td>
                <td>{juicioData.provincia || "sin datos"}</td>
                <td>{juicioData.condicion || "sin datos"}</td>
              </tr>
            );
          });
        } else {
          return (
            <tr key={ruc}>
              <td>{ruc}</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
              <td>sin datos</td>
            </tr>
          );
        }
      })}
    </tbody>
  </table>
);

export default Judicialestable;