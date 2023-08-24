import React, { useState, useEffect } from 'react';
import "./TablaBusqueda.css"

interface Data {
  lugar: string;
  estado: string;
  delito: string;
  unidad: string;
  fecha: string;
}

interface SortedData extends Data {
  key: string;
}

interface TablaBusquedaProps {
  data: { [key: string]: { [key: string]: Data } } | null;
  onSelectedItems: (selectedItems: string[]) => void;
}

const ITEMS_PER_PAGE = 25;

const TablaBusqueda: React.FC<TablaBusquedaProps> = ({ data, onSelectedItems }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedData, setPaginatedData] = useState<SortedData[] | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Data>("fecha");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data) {
      const totalItems = Object.keys(data).reduce((count, propertyKey) => count + Object.keys(data[propertyKey]).length, 0);
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      setTotalPages(totalPages);

      setCurrentPage(prevPage => Math.min(prevPage, totalPages));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const dataArray: SortedData[] = Object.entries(data).flatMap(([propertyKey, items]) =>
        Object.entries(items).map(([itemKey, item]) => ({ key: itemKey, ...item }))
      );
  
      dataArray.sort((a, b) => {
        if (sortColumn === "fecha") {
          const dateA = new Date(a.fecha).getTime();
          const dateB = new Date(b.fecha).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        } else {
          const valueA = a[sortColumn];
          const valueB = b[sortColumn];
          return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
        }
      });
  
      // Filtrar los datos según el término de búsqueda
      let filteredData = dataArray.filter(item => {
        const searchTerms = searchTerm.toLowerCase().split(' ');
        return searchTerms.every(term =>
          [
            item.lugar.toLowerCase(),
            item.estado.toLowerCase(),
            item.delito.toLowerCase(),
            item.unidad.toLowerCase(),
            item.fecha.toLowerCase()
          ].some(field => field.includes(term))
        );
      });
  
      // Si no hay coincidencias exactas, realizar búsqueda por aproximación retrocediendo letra por letra
      if (filteredData.length === 0) {
        const newFilteredData = [];
        for (let i = searchTerm.length - 1; i >= 1; i--) {
          const truncatedSearchTerm = searchTerm.substring(0, i);
          const approximateFilteredData = dataArray.filter(item =>
            [
              item.lugar.toLowerCase(),
              item.estado.toLowerCase(),
              item.delito.toLowerCase(),
              item.unidad.toLowerCase(),
              item.fecha.toLowerCase()
            ].some(field => field.includes(truncatedSearchTerm))
          );
          if (approximateFilteredData.length > 0) {
            newFilteredData.push(...approximateFilteredData);
            break;
          }
        }
        filteredData = newFilteredData;
      }
  
      // Calcular el número total de páginas basado en los datos filtrados
      const totalFilteredItems = filteredData.length;
      const totalPages = Math.ceil(totalFilteredItems / ITEMS_PER_PAGE);
      setTotalPages(totalPages);
  
      // Actualizar el estado de currentPage si excede el nuevo totalPages después del cambio de datos
      setCurrentPage(prevPage => Math.min(prevPage, totalPages));
  
      // Realizar la paginación en los datos filtrados
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedFilteredData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      setPaginatedData(paginatedFilteredData);
    }
  }, [data, currentPage, sortColumn, sortOrder, searchTerm]);
  
  useEffect(() => {
    onSelectedItems(selectedItems);
  }, [selectedItems, onSelectedItems]);

  const toggleSelectItem = (itemKey: string) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemKey)) {
        return prevSelectedItems.filter(item => item !== itemKey);
      } else {
        return [...prevSelectedItems, itemKey];
      }
    });
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleSort = (column: keyof Data) => {
    if (sortColumn === column) {
      setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData?.length) {
      setSelectedItems([]);
    } else {
      const allKeys = paginatedData?.map(item => item.key) || [];
      setSelectedItems(allKeys);
    }
  };

  const renderTableHeader = () => {
    const isSortingColumn = (column: keyof Data) => sortColumn === column;
    const isAscending = sortOrder === "asc";

    return (
      <tr>
        <th className='tablabusqueda-esquinaizquierda' onClick={handleSelectAll}>Seleccionar todo</th>
        <th onClick={() => handleSort("lugar")}>
          LUGAR {isSortingColumn("lugar") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("delito")}>
          DELITO {isSortingColumn("delito") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("unidad")}>
          UNIDAD {isSortingColumn("unidad") && (isAscending ? "▲" : "▼")}
        </th>
        <th className='tablabusqueda-esquinaderecha' onClick={() => handleSort("fecha")}>
          FECHA {isSortingColumn("fecha") && (isAscending ? "▲" : "▼")}
        </th>
      </tr>
    );
  };

  const renderTableData = () => {
    if (!paginatedData) {
      return null;
    }

    const searchTerms = searchTerm.toLowerCase().split(' ');

    let filteredData = paginatedData.filter(item => {
      return searchTerms.every(term =>
        [
          item.lugar.toLowerCase(),
          item.estado.toLowerCase(),
          item.delito.toLowerCase(),
          item.unidad.toLowerCase(),
          item.fecha.toLowerCase()
        ].some(field => field.includes(term))
      );
    });

    // Si no hay coincidencias exactas, realizar búsqueda por aproximación retrocediendo letra por letra
    if (filteredData.length === 0) {
      const newFilteredData = [];
      for (let i = searchTerm.length - 1; i >= 1; i--) {
        const truncatedSearchTerm = searchTerm.substring(0, i);
        const approximateFilteredData = paginatedData.filter(item =>
          [
            item.lugar.toLowerCase(),
            item.estado.toLowerCase(),
            item.delito.toLowerCase(),
            item.unidad.toLowerCase(),
            item.fecha.toLowerCase()
          ].some(field => field.includes(truncatedSearchTerm))
        );
        if (approximateFilteredData.length > 0) {
          newFilteredData.push(...approximateFilteredData);
          break;
        }
      }
      filteredData = newFilteredData;
    }



    return filteredData.map(item => {
      const isSelected = selectedItems.includes(item.key);

      const rowStyle = isSelected ? { boxShadow: 'inset 0px 0px 10px rgba(0 0 0 / 38%)' } : {};

      return (
        <tr
          key={item.key}
          className={`table-row${isSelected ? ' selected' : ''}`}
          onClick={() => toggleSelectItem(item.key)}
          style={rowStyle}
        >
          <td>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelectItem(item.key)}
              onClick={e => e.stopPropagation()}
              className="styled-checkbox"
            />
          </td>
          <td>{item.lugar}</td>
          <td>{item.delito}</td>
          <td>{item.unidad}</td>
          <td>{item.fecha}</td>
        </tr>
      );
    });
  };


  return (
    <div >
      <p className='buscador-label'>Puedes filtrar especificamente tu consulta</p>
      <input
        className='search-input-table'
        type="text"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        placeholder="ej: Quito robo"
      />
      <table className='tablabusqueda-tabla'>
        <thead className='tablabusqueda-head'>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div className='tablabusqueda-container-button'>
        {currentPage !== 1 && <button className='tablabusqueda-button' onClick={handlePrevPage} disabled={currentPage === 1}>ANTERIOR</button>}
        {totalPages > 1 && <span className='tablabusqueda-page-number'>Página {currentPage} de {totalPages}</span>}
        {currentPage !== totalPages && <button className='tablabusqueda-button' onClick={handleNextPage} disabled={currentPage === totalPages}>SIGUIENTE</button>}
      </div>
    </div>
  );
};

export default TablaBusqueda;