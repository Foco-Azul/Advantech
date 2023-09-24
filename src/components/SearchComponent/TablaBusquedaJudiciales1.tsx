import React, { useState, useEffect } from 'react';
import "./TablaBusqueda.css";

interface Data {
  cedula: string;
  id_canton: string;
  nombre: string;
  provincia: string;
  id_juicio: string;
}

interface SortedData extends Data {
  key: string;
}

interface TablaBusquedaJudicialesProps {
  data: { [key: string]: { [key: string]: Data } } | null;
  onSelectedItems: (selectedItems: string[]) => void;
}

const ITEMS_PER_PAGE = 25;

const TablaBusquedaJudiciales: React.FC<TablaBusquedaJudicialesProps> = ({ data, onSelectedItems }) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [paginatedData, setPaginatedData] = useState<SortedData[] | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Data>("nombre");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (data) {
      const firstPropertyName = Object.keys(data)[0];
      const records = Object.values(data[firstPropertyName]);
      const totalRecords = records.length;
      const totalPages = Math.ceil(totalRecords / ITEMS_PER_PAGE);
      setTotalPages(totalPages);
  
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const recordsForPage = records.slice(startIndex, endIndex);
  
      recordsForPage.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
  
      const paginatedFilteredData = recordsForPage.map(item => ({ key: item.id_juicio, ...item }));
      setPaginatedData(paginatedFilteredData);
    }
  }, [data, currentPage, sortColumn, sortOrder]);
  
  
  

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

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleSort = (column: keyof Data) => {
    setSortColumn(column);
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };
  
  

  const handleSelectAll = () => {
    if (selectedItems.length === paginatedData?.length) {
      setSelectedItems([]);
    } else {
      const allKeys = paginatedData?.map(item => item.key) || [];
      setSelectedItems(allKeys);
    }
  };

  const handleClearFilters = () => {
    setSearchTerm('');
  };

  const renderTableHeader = () => {
    const isSortingColumn = (column: keyof Data) => sortColumn === column;
    const isAscending = sortOrder === "asc";

    return (
      <tr>
        <th className='tablabusqueda-esquinaizquierda' onClick={handleSelectAll}>Seleccionar todo</th>
        <th onClick={() => handleSort("id_juicio")}>
          JUICIO {isSortingColumn("id_juicio") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("cedula")}>
          CEDULA {isSortingColumn("cedula") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("id_canton")}>
          CANTON {isSortingColumn("id_canton") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("nombre")}>
          NOMBRE {isSortingColumn("nombre") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("provincia")}>
          PROVINCIA {isSortingColumn("provincia") && (isAscending ? "▲" : "▼")}
        </th>
      </tr>
    );
  };

  const renderTableData = () => {
    if (!data) {
      return null;
    }
  
    // Extract the data from the first property name dynamically
    const firstPropertyName = Object.keys(data)[0];
    const records = Object.values(data[firstPropertyName]);
  
    // Calculate the start and end index for the current page
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
  
    // Get the records for the current page
    const recordsForPage = records.slice(startIndex, endIndex);
  
    return recordsForPage.map((item, index) => {
      const isSelected = selectedItems.includes(index.toString());
  
      const rowStyle = isSelected ? { boxShadow: 'inset 0px 0px 10px rgba(0 0 0 / 38%)' } : {};
  
      return (
        <tr
          key={index}
          className={`table-row${isSelected ? ' selected' : ''}`}
          onClick={() => toggleSelectItem(index.toString())}
          style={rowStyle}
        >
          <td>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelectItem(index.toString())}
              onClick={e => e.stopPropagation()}
              className="styled-checkbox"
            />
          </td>
          <td>{item.id_juicio || 'sin datos'}</td>
          <td>{item.cedula || 'sin datos'}</td>
          <td>{item.id_canton || 'sin datos'}</td>
          <td>{item.nombre || 'sin datos'}</td>
          <td>{item.provincia || 'sin datos'}</td>
        </tr>
      );
    });
  };
  
  return (
    <div>
      {data != null && Object.keys(data[Object.keys(data)[0]]).length === 0 && (
        <p>No se encontraron coincidencias</p>
      )}
      {data && Object.keys(data[Object.keys(data)[0]]).length > 0 && (
        <>
          <p>Selecciona los datos que quieres traer en detalle</p>

          <div className='container-tablabusqueda'>
            <div className='buscador-filtros'>
              <h3 className='buscador-filtros-h3'>FILTROS</h3>
              <h4 className="buscador-filtros-h4">Filtrar por buscador</h4>
              <input
                className='search-filter-table'
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="ej: Nombre"
              />
              <button className="clear-filters-button" onClick={handleClearFilters}>
                Limpiar filtros
              </button>
            </div>
            <div className='buscador-tabla-container'>
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
          </div>
        </>
      )}
    </div>
  );
};

export default TablaBusquedaJudiciales;
