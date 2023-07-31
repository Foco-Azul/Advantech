import React, { useState, useEffect } from 'react';
import "./TablaBusqueda.css"

interface Data {
  lugar: string;
  estado: string;
  delito: string;
  unidad: string;
  fecha: string;
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
  const [paginatedData, setPaginatedData] = useState<{ [key: string]: { [key: string]: Data } } | null>(null);

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
      // Paginate the data based on the currentPage
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const propertyKeys = Object.keys(data);
      let itemCount = 0;

      const paginatedData: { [key: string]: { [key: string]: Data } } = {};
      for (let i = 0; i < propertyKeys.length && itemCount < startIndex + ITEMS_PER_PAGE; i++) {
        const propertyKey = propertyKeys[i];
        const items = data[propertyKey];
        const itemKeys = Object.keys(items);

        for (let j = 0; j < itemKeys.length && itemCount < startIndex + ITEMS_PER_PAGE; j++) {
          const itemKey = itemKeys[j];
          if (itemCount >= startIndex) {
            paginatedData[propertyKey] = paginatedData[propertyKey] || {};
            paginatedData[propertyKey][itemKey] = items[itemKey];
          }
          itemCount++;
        }
      }

      setPaginatedData(paginatedData);
    }
  }, [data, currentPage]);

  const toggleSelectItem = (propertyKey: string, itemKey: string) => {
    const selectedItem = `${itemKey}`;
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(selectedItem)) {
        return prevSelectedItems.filter(item => item !== selectedItem);
      } else {
        return [...prevSelectedItems, selectedItem];
      }
    });
  };

  const renderTableHeader = () => {
    return (
      <tr>
        <th className='tablabusqueda-esquinaizquierda'>SELECCIÓN</th>
        <th>LUGAR</th>
        <th>ESTADO</th>
        <th>DELITO</th>
        <th>UNIDAD</th>
        <th className='tablabusqueda-esquinaderecha'>FECHA</th>
      </tr>
    );
  };

  const renderTableData = () => {
    if (!paginatedData) {
      return null;
    }

    return Object.keys(paginatedData).map(propertyKey => {
      const items = paginatedData[propertyKey];

      return Object.keys(items).map(itemKey => {
        const item = items[itemKey];
        const isSelected = selectedItems.includes(`${itemKey}`);

        return (
          <tr key={`${itemKey}`}>
            <td>
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => toggleSelectItem(propertyKey, itemKey)}
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
    });
  };

  // Call the onSelectedItems prop whenever the selection changes
  useEffect(() => {
    onSelectedItems(selectedItems);
  }, [selectedItems, onSelectedItems]);

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <table className='tablabusqueda-tabla'>
        <thead className='tablabusqueda-head'>{renderTableHeader()}</thead>
        <tbody>{renderTableData()}</tbody>
      </table>
      <div className='tablabusqueda-container-button'>
        {currentPage != 1 && <button className='tablabusqueda-button' onClick={handlePrevPage} disabled={currentPage === 1}>ANTERIOR</button>}
        {totalPages > 1 && <span className='tablabusqueda-page-number'>Página {currentPage} de {totalPages}</span>}
        {currentPage != totalPages && <button className='tablabusqueda-button' onClick={handleNextPage} disabled={currentPage === totalPages}>SIGUIENTE</button>}
      </div>
    </div>
  );
};

export default TablaBusqueda;
