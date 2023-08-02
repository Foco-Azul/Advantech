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

  useEffect(() => {
    if (data) {
      const totalItems = Object.keys(data).reduce((count, propertyKey) => count + Object.keys(data[propertyKey]).length, 0);
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      setTotalPages(totalPages);

      // Update currentPage if it exceeds the new totalPages after changing data
      setCurrentPage(prevPage => Math.min(prevPage, totalPages));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      // Convertimos los datos en un array de objetos para poder ordenarlos
      const dataArray: SortedData[] = Object.entries(data).flatMap(([propertyKey, items]) =>
        Object.entries(items).map(([itemKey, item]) => ({ key: itemKey, ...item }))
      );

      // Ordenamos los datos según la columna y el orden seleccionados
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

      // Paginamos los datos ordenados según la página actual
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const paginatedData = dataArray.slice(startIndex, startIndex + ITEMS_PER_PAGE);
      setPaginatedData(paginatedData);
    }
  }, [data, currentPage, sortColumn, sortOrder]);

  useEffect(() => {
    // Call the onSelectedItems prop whenever the selection changes
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

  const renderTableHeader = () => {
    const isSortingColumn = (column: keyof Data) => sortColumn === column;
    const isAscending = sortOrder === "asc";

    return (
      <tr>
        <th className='tablabusqueda-esquinaizquierda'>SELECCIÓN</th>
        <th onClick={() => handleSort("lugar")}>
          LUGAR {isSortingColumn("lugar") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("estado")}>
          ESTADO {isSortingColumn("estado") && (isAscending ? "▲" : "▼")}
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

    return paginatedData.map(item => {
      const isSelected = selectedItems.includes(item.key);

      return (
        <tr key={item.key}>
          <td>
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleSelectItem(item.key)}
            />
          </td>
          <td>{item.lugar}</td>
          <td>{item.estado}</td>
          <td>{item.delito}</td>
          <td>{item.unidad}</td>
          <td>{item.fecha}</td>
        </tr>
      );
    });
  };

  return (
    <div>
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
