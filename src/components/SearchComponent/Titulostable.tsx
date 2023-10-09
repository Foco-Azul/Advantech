import React from 'react';

const Titulostable:React.FC<{ dataToDownload: any }> = ({ dataToDownload }) => (
  <table>
    <thead>
      <tr>
        <th className="header">Ruc</th>
        <th className="header">Nombre</th>
        <th className="header">Genero</th>
        <th className="header">Nacionalidad</th>
        <th className="header">Nivel de Titulo</th>
        <th className="header">Titulo</th>
        <th className="header">Institucion</th>
        <th className="header">Tipo</th>
        <th className="header">Numero de Registro</th>
        <th className="header">Desde</th>
        <th className="header">Observacion</th>
      </tr>
    </thead>
    <tbody>
      {Object.keys(dataToDownload).map((ruc) => {
        const userData = dataToDownload[ruc];

        return Object.keys(userData).map((index) => {
          const user = userData[index];
          const titulos = user.titulos || {};

          return Object.keys(titulos).map((tituloIndex) => {
            const titulo = titulos[tituloIndex];

            return (
              <tr key={tituloIndex}>
                <td>{ruc}</td>
                <td>{user.nombre || "sin datos"}</td>
                <td>{user.genero || "sin datos"}</td>
                <td>{user.nacionalidad || "sin datos"}</td>
                <td>{titulo.nivel || "sin datos"}</td>
                <td>{titulo.titulo || "sin datos"}</td>
                <td>{titulo.institucion || "sin datos"}</td>
                <td>{titulo.tipo || "sin datos"}</td>
                <td>{titulo.numero_de_registro || "sin datos"}</td>
                <td>{titulo.desde || "sin datos"}</td>
                <td>{titulo.observacion || "sin datos"}</td>
              </tr>
            );
          });
        });
      })}
    </tbody>
  </table>
);

export default Titulostable;
