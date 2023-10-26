import React from 'react';

const Accionistastable: React.FC<{ dataToDownload: any }> = ({ dataToDownload }) => (
  <table>
    <thead>
      <tr>
        <th className="header">Ruc</th>
        <th className="header" colSpan={8}>Administración Actual</th>
        <th className="header" colSpan={4}>Accionista Anterior</th>
      </tr>
      <tr>
        <th className="header"></th>
        <th className="header">Capital invertido</th>
        <th className="header">Capital total cia</th>
        <th className="header">Expediente</th>
        <th className="header">Nombre</th>
        <th className="header">Posesion efectiva</th>
        <th className="header">Ruc</th>
        <th className="header">Situacion legal</th>
        <th className="header">Valor nominal</th>
        {/* Add columns for "accionista_anterior_en" data */}
        <th className="header">Accionista Anterior Expediente</th>
        <th className="header">Accionista Anterior Nombre</th>
        <th className="header">Accionista Anterior Ruc</th>
        <th className="header">Accionista Anterior Situacion Legal</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];
        const accionista_actual_en = userData["0"]["accionista_actual_en"];
        if (accionista_actual_en) {
          return Object.keys(accionista_actual_en).map((key) => {
            const accionista = accionista_actual_en[key];
            return (
              <tr key={key}>
                <td>{ruc}</td>
                <td>{accionista.capital_invertido || "sin datos"}</td>
                <td>{accionista.capital_total_cia || "sin datos"}</td>
                <td>{accionista.expediente || "sin datos"}</td>
                <td>{accionista.nombre || "sin datos"}</td>
                <td>{accionista.posesion_efectiva || "sin datos"}</td>
                <td>{accionista.ruc || "sin datos"}</td>
                <td>{accionista.situacionlegal || "sin datos"}</td>
                <td>{accionista.valor_nominal || "sin datos"}</td>

                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
              </tr>
            );
          });
        }
        return null; // Skip this entry if "accionista_actual_en" doesn't exist
      })}

      {Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];
        const accionista_actual_en = userData["0"]["accionista_actual_en"];
        const accionista_anterior_en = userData["0"]["accionista_anterior_en"];

        if (accionista_actual_en) {
          return Object.keys(accionista_anterior_en).map((key) => {
            const accionistaAnterior = accionista_anterior_en[0] || {}; // Get "accionista_anterior_en" data
            return (
              <tr key={key}>
                <td>{ruc}</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>

                <td>{accionistaAnterior.expediente || "sin datos"}</td>
                <td>{accionistaAnterior.nombre || "sin datos"}</td>
                <td>{accionistaAnterior.ruc || "sin datos"}</td>
                <td>{accionistaAnterior.situacionlegal || "sin datos"}</td>
              </tr>
            );
          });
        }
        return null; // Skip this entry if "accionista_actual_en" doesn't exist
      })}
    </tbody>
  </table>
);

export default Accionistastable;
