import './Tabla.css';

function Tabla() {

  return (
    <div className="tabla-container">
      <h3 className="tabla-title-h3">Rangos de precio</h3>
      <table className="tabla-card">
        <tr>
          <th className="tabla-title-i">Rango de créditos</th>
          <th className="tabla-title-d">Costo por crédito</th>
        </tr>
        <tr >
          <td className="tabla-text">0 - 4999</td>
          <td className="tabla-text">$0.11</td>
        </tr>
        <tr className="tabla-tr">
          <td className="tabla-text">5000 - 9999</td>
          <td className="tabla-text">$0.10</td>
        </tr>
        <tr>
          <td className="tabla-text">10000 - 14999</td>
          <td className="tabla-text">$0.09</td>
        </tr>
        <tr className="tabla-tr">
          <td className="tabla-text">15000 - 19999</td>
          <td className="tabla-text">$0.08</td>
        </tr>
      </table>
    </div>
  );
}

export default Tabla;
