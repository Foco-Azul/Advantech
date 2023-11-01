import React from 'react';

const Accionistastable: React.FC<{ dataToDownload: any }> = ({ dataToDownload }) => (
  <table>
    <thead>
      <tr>
        <th className="header">Ruc</th>
        <th className="header" colSpan={8}>Accionista Actual</th>
        <th className="header" colSpan={4}>Accionista Anterior</th>
        <th className="header" colSpan={11}>Administracion Actual</th>
        <th className="header" colSpan={11}>Administracion Anterior</th>
        <th className="header" colSpan={3}>Accionista en sociedades extranjeras</th>
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
        {/* Add columns for "Administracion Actual" data */}
        <th className="header">Nombre</th>
        <th className="header">Ruc</th>
        <th className="header">Nacionalidad</th>
        <th className="header">Cargo</th>
        <th className="header">Fecha nombramiento</th>
        <th className="header">Fechatermino</th>
        <th className="header">Periodo</th>
        <th className="header">Fecha registromercantil</th>
        <th className="header">Articulo</th>
        <th className="header">Registro mercantil</th>
        <th className="header">Rladm</th>
        {/* Add columns for "Administracion Anterior" data */}
        <th className="header">Nombre</th>
        <th className="header">Ruc</th>
        <th className="header">Nacionalidad</th>
        <th className="header">Cargo</th>
        <th className="header">Fecha nombramiento</th>
        <th className="header">Fechatermino</th>
        <th className="header">Periodo</th>
        <th className="header">Fecha registromercantil</th>
        <th className="header">Articulo</th>
        <th className="header">Registro mercantil</th>
        <th className="header">Rladm</th>

        <th className="header">Expediente</th>
        <th className="header">Nombre</th>
        <th className="header">Nacionalidad</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];
        const accionista_actual_en = userData?.["0"]?.["accionista_actual_en"];
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
          });
        }
        return null; // Skip this entry if "accionista_actual_en" doesn't exist
      })}

      {Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];
        const accionista_anterior_en = userData?.["0"]?.["accionista_anterior_en"];

        if (accionista_anterior_en) {
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
          });
        }

        return null; // Skip this entry if "accionista_actual_en" doesn't exist
      })
      }


      {Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];
        const administracion_actual_en = userData?.["0"]?.["administracion_actual_en"];

        if (administracion_actual_en) {
          return Object.keys(administracion_actual_en).map((key) => {
            const administracionActual = administracion_actual_en[0] || {}; // Get "accionista_anterior_en" data
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

                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>

                <td>{administracionActual.nombre || "sin datos"}</td>
                <td>{administracionActual.ruc || "sin datos"}</td>
                <td>{administracionActual.nacionalidad || "sin datos"}</td>
                <td>{administracionActual.cargo || "sin datos"}</td>
                <td>{administracionActual.fechanombramiento || "sin datos"}</td>
                <td>{administracionActual.fechatermino || "sin datos"}</td>
                <td>{administracionActual.periodo || "sin datos"}</td>
                <td>{administracionActual.fecha_registromercantil || "sin datos"}</td>
                <td>{administracionActual.articulo || "sin datos"}</td>
                <td>{administracionActual.n_registromercantil || "sin datos"}</td>
                <td>{administracionActual.rladm || "sin datos"}</td>

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
          });
        }

        return null; // Skip this entry if "accionista_actual_en" doesn't exist
      })
      }

      {Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];
        const administradores_anterior_en = userData?.["0"]?.["administradores_anterior_en"];

        if (administradores_anterior_en) {
          return Object.keys(administradores_anterior_en).map((key) => {
            const administracionAnterior = administradores_anterior_en[0] || {}; // Get "accionista_anterior_en" data
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

                <td>{administracionAnterior.nombre || "sin datos"}</td>
                <td>{administracionAnterior.ruc || "sin datos"}</td>
                <td>{administracionAnterior.nacionalidad || "sin datos"}</td>
                <td>{administracionAnterior.cargo || "sin datos"}</td>
                <td>{administracionAnterior.fechanombramiento || "sin datos"}</td>
                <td>{administracionAnterior.fechatermino || "sin datos"}</td>
                <td>{administracionAnterior.periodo || "sin datos"}</td>
                <td>{administracionAnterior.fecha_registromercantil || "sin datos"}</td>
                <td>{administracionAnterior.articulo || "sin datos"}</td>
                <td>{administracionAnterior.n_registromercantil || "sin datos"}</td>
                <td>{administracionAnterior.rladm || "sin datos"}</td>

                <td>sin datos</td>
                <td>sin datos</td>
                <td>sin datos</td>

              </tr>
            );
          });
        }

        return null; // Skip this entry if "accionista_actual_en" doesn't exist
      })
      }

{Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];
        const accionista_en_las_siguientes_sociedades_extranjeras = userData?.["0"]?.["accionista_en_las_siguientes_sociedades_extranjeras"];

        if (accionista_en_las_siguientes_sociedades_extranjeras) {
          return Object.keys(accionista_en_las_siguientes_sociedades_extranjeras).map((key) => {
            const accionistaSociedadExtranjera = accionista_en_las_siguientes_sociedades_extranjeras[0] || {}; // Get "accionista_anterior_en" data
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

                <td>{accionistaSociedadExtranjera.expediente || "sin datos"}</td>
                <td>{accionistaSociedadExtranjera.nombre || "sin datos"}</td>
                <td>{accionistaSociedadExtranjera.nacionalidad || "sin datos"}</td>

              </tr>
            );
          });
        }

        return null; // Skip this entry if "accionista_actual_en" doesn't exist
      })
      }
    </tbody>
  </table>
);

export default Accionistastable;
