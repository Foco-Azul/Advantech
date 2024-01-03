import React, { useEffect, useState } from 'react';
import "./TablaBusqueda.css"

interface Accionista {
  expediente: string;
  nombre: string;
  ruc: string;
  capital_invertido: string;
  capital_total_cia: string;
  valor_nominal: string;
  situacionlegal: string;
  posesion_efectiva: string;
}

interface AccionistasData {
  type: string;
  administracion_actual_en: any;
  accionista_actual_en: { [key: string]: Accionista };
  administradores_anterior_en: any;
  accionista_anterior_en: { [key: string]: Accionista };
  accionista_en_las_siguientes_sociedades_extranjeras: any;
}

interface AccionistasData {
  [key: string]: any;
}

interface TablaBusquedaProps {
  data: { [key: string]: AccionistasData } | null;
  onSelectedItems: (selectedItems: string[]) => void;
}

const ITEMS_PER_PAGE = 25;

const TablaBusquedaAccionistas: React.FC<TablaBusquedaProps> = ({ data, onSelectedItems }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (data) {
      // Calcular el número total de páginas en función de la cantidad de datos
      const totalDataCount = Object.keys(data).length;
      const totalPages = Math.ceil(totalDataCount / ITEMS_PER_PAGE);
      setTotalPages(totalPages);
    }
    
  }, [data]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };


  useEffect(() => {
    onSelectedItems(selectedItems);

  }, [selectedItems]);


  const toggleSelectItem = (itemKey: string) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemKey)) {
        return prevSelectedItems.filter(item => item !== itemKey);
      } else {
        return [...prevSelectedItems, itemKey];
      }
    });
  };

  const selectAllItems = () => {
    if (data && selectedItems.length === Object.keys(data).length) {
      // Si todos los elementos ya están seleccionados, deseleccionar todo
      setSelectedItems([]);
    } else {
      // Si no todos los elementos están seleccionados, seleccionar todo
      if (data)
        setSelectedItems(Object.keys(data));
    }
  };

  const renderTableHeader = () => (
    <tr>
      <th className='tablabusqueda-esquinaizquierda' onClick={selectAllItems}>Seleccionar todo</th>
      <th>Sujeto</th>
      <th>Administración Actual</th>
      <th>Accionista Actual</th>
      <th>Administradores Anteriores</th>
      <th>Accionistas Anteriores</th>
      <th>Accionistas en Sociedades Extranjeras</th>
    </tr>
  );

  const countSubColumnOccurrences = (sujeto: string, subColumn: keyof AccionistasData) => {
    if (data) {
      const firstPropertySubject = Object.keys(data[sujeto])[0];
      if (data[sujeto] &&  data[sujeto][firstPropertySubject] && data[sujeto][firstPropertySubject][subColumn]) {
        const subColumnData = data[sujeto][firstPropertySubject][subColumn];
        if (typeof subColumnData === 'object') {
          const count = Object.keys(subColumnData).length;
          return count;
        }
      }
      return 0;
    }
  };

  const renderTableData = () => {
    if (!data) {
      return null;
    }
  
    return Object.keys(data).map((sujeto, index) => {
      return Object.keys(data[sujeto]).map((propertyIndex) => {
        const isSelected = selectedItems.includes(propertyIndex);
  
        const rowStyle = isSelected
          ? { boxShadow: 'inset 0px 0px 10px rgba(0, 0, 0, 0.38)' }
          : {};
  
        return (
          <tr
            key={sujeto + propertyIndex} // Use a unique key for each row
            onClick={() => toggleSelectItem(propertyIndex)}
            style={rowStyle}
          >
            <td>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelectItem(propertyIndex)}
                onClick={(e) => e.stopPropagation()}
                className="styled-checkbox"
              />
            </td>
            <td>{sujeto}</td>
            <td>{countSubColumnOccurrences(sujeto, 'administracion_actual_en')} registros</td>
            <td>{countSubColumnOccurrences(sujeto, 'accionista_actual_en')} registros</td>
            <td>{countSubColumnOccurrences(sujeto, 'administradores_anterior_en')} registros</td>
            <td>{countSubColumnOccurrences(sujeto, 'accionista_anterior_en')} registros</td>
            <td>
              {countSubColumnOccurrences(sujeto, 'accionista_en_las_siguientes_sociedades_extranjeras')} registros
            </td>
          </tr>
        );
      });
    });
  };
  


  return (
    <div>
      {data != null && Object.keys(data).length === 0 && (
        <p>No se encontraron coincidencias</p>
      )}
      {data && Object.keys(data).length > 0 && (
        <div className='container-tablabusqueda'>
          <div className='buscador-tabla-container'>
            <table className='tablabusqueda-tabla'>
              <thead className='tablabusqueda-head'>{renderTableHeader()}</thead>
              <tbody>{renderTableData()}</tbody>
            </table>
            <div className='tablabusqueda-container-button'>
              {currentPage !== 1 && (
                <button className='tablabusqueda-button' onClick={handlePrevPage} disabled={currentPage === 1}>
                  ANTERIOR
                </button>
              )}
              {totalPages > 1 && (
                <span className='tablabusqueda-page-number'>
                  Página {currentPage} de {totalPages}
                </span>
              )}
              {currentPage !== totalPages && (
                <button className='tablabusqueda-button' onClick={handleNextPage} disabled={currentPage === totalPages}>
                  SIGUIENTE
                </button>
              )}
            </div>
          </div>
        </div>
      )}


    </div >
  );
};

export default TablaBusquedaAccionistas;