import React from 'react';

// Componente constante ExcelTable
const Noticiastable: React.FC<{ dataToDownload: any }> = ({ dataToDownload }) => (
  <table>
    <thead>
      <tr>
        <th className="header">Ruc</th>
        <th className="header">Type</th>
        <th className="header">Lugar</th>
        <th className="header">Noticia del delito</th>
        <th className="header">Estado</th>
        <th className="header">Delito</th>
        <th className="header">Unidad</th>
        <th className="header">Fecha</th>
        <th className="header">Digitador</th>
        <th className="header">Numero informe</th>
        <th className="header">Resumen unidad</th>
        <th className="header">Sujetos</th>
        <th className="header">Cedula</th>
        <th className="header">Nombre</th>
        <th className="header">Estado</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(dataToDownload).map((ruc) => {
        const entryData = dataToDownload[ruc];

        if (Object.keys(entryData).length > 0) {
          return Object.keys(entryData).map((entryKey) => {
            const sujetos = entryData[entryKey]["sujetos"];

            return sujetos
              ? Object.keys(sujetos).map((sujetoKey) => {
                  const sujetoData = sujetos[sujetoKey];
                  return (
                    <tr key={sujetoKey}>
                      <td>{ruc}</td>
                      <td>{entryData[entryKey].type || ""}</td>
                      <td>{entryData[entryKey]["lugar"] || ""}</td>
                      <td>{entryData[entryKey]["Noticia del delito"] || ""}</td>
                      <td>{entryData[entryKey]["estado"] || ""}</td>
                      <td>{entryData[entryKey]["delito"] || ""}</td>
                      <td>{entryData[entryKey]["unidad"] || ""}</td>
                      <td>{entryData[entryKey]["fecha"] || ""}</td>
                      <td>{entryData[entryKey]["digitador"] || ""}</td>
                      <td>{entryData[entryKey]["numero informe"] || ""}</td>
                      <td>{entryData[entryKey]["resumen unidad"] || ""}</td>
                      <td>{sujetoKey}</td>
                      <td>{sujetoData["cedula"] || ""}</td>
                      <td>{sujetoData["nombre"] || ""}</td>
                      <td>{sujetoData["estado"] || ""}</td>
                    </tr>
                  );
                })
              : null;
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
            </tr>
          );
        }
      })}
    </tbody>
  </table>
);

export default Noticiastable;
