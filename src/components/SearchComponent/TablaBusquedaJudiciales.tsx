import React, { useState, useEffect } from 'react';
import "./TablaBusqueda.css"

interface Data {
  cedula: string;
  id_canton: string;
  condicion: string;
  nombre: string;
  provincia: string;
  ciudad: string;
  materia: string;
  id_juicio: string;
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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Data>("ciudad");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [cityCounts, setCityCounts] = useState<{ [city: string]: number }>({});
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [yearCounts, setYearCounts] = useState<{ [city: string]: number }>({});
  const [openRegion, setOpenRegion] = useState<string | null>(null);


  useEffect(() => {
    if (data) {
      console.log(data)
      const counts: { [city: string]: number } = {};
      const yearCounts: { [year: string]: number } = {};

      // Contar ocurrencias por ciudad y año
      Object.entries(data).forEach(([propertyKey, items]) =>
        Object.entries(items).forEach(([itemKey, item]) => {
          const city = (item.ciudad || "Ciudad Desconocida").toLowerCase();
          counts[city] = (counts[city] || 0) + 1;
        })
      );


      setCityCounts(counts);
      setYearCounts(yearCounts);


      // Filtrar datos por ciudades seleccionadas
      const filteredByCities = Object.entries(data).flatMap(([propertyKey, items]) =>
        Object.entries(items).map(([itemKey, item]) => ({ key: itemKey, ...item }))
      ).filter(item => (selectedCities.length === 0 && selectedYears.length === 0 || selectedCities.includes(item.ciudad.toLowerCase())) ||
        (selectedYears.includes(item.ciudad.split('-')[0])));


      // Función para realizar búsqueda por aproximación retrocediendo letra por letra
      const searchApproximately = (term: string, data: any[]) => {
        if (term.trim() === '') {
          return data; // Si el término de búsqueda está vacío, mostrar todos los datos
        }

        for (let i = term.length; i >= 1; i--) {
          const truncatedSearchTerm = term.toLowerCase().substring(0, i);
          const approximateFilteredData = data.filter(item =>
            [
              (item.ciudad || "Ciudad Desconocida").toLowerCase(),
              item.id_juicio.toLowerCase(),
              (item.materia || "Materia Desconocida").toLowerCase(),
              (item.condicion || "Condicion Desconocida").toLowerCase(),

            ].some(field => field.includes(truncatedSearchTerm))
          );
          if (approximateFilteredData.length > 0) {
            return approximateFilteredData;
          }
        }
        return [];
      };

      // Filtrar los datos según el término de búsqueda
      let filteredData = searchApproximately(searchTerm, filteredByCities);

      // Sort filtered data based on sortColumn and sortOrder
      filteredData.sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (aValue > bValue) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });

      // Calcular el número total de páginas basado en los datos filtrados
      const totalFilteredItems = filteredData.length;
      const totalPages = Math.ceil(totalFilteredItems / ITEMS_PER_PAGE);
      setTotalPages(totalPages);

      // Actualizar el estado de currentPage si excede el nuevo totalPages después del cambio de datos
      setCurrentPage(prevPage => Math.max(1, Math.min(prevPage, totalPages)));

      // Realizar la paginación en los datos filtrados
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const paginatedFilteredData = filteredData.slice(startIndex, endIndex);
      setPaginatedData(paginatedFilteredData);

    }

  }, [data, currentPage, sortColumn, sortOrder, searchTerm, selectedCities, selectedYears]);


  useEffect(() => {
    onSelectedItems(selectedItems);
  });


  const toggleSelectItem = (itemKey: string) => {
    setSelectedItems(prevSelectedItems => {
      if (prevSelectedItems.includes(itemKey)) {
        return prevSelectedItems.filter(item => item !== itemKey);
      } else {
        return [...prevSelectedItems, itemKey];
      }
    });
    console.log(data)
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
    const allKeys = paginatedData?.map(item => item.key) || [];
    
    // Verificar si todos los elementos de la página actual están seleccionados
    const allSelected = allKeys.every(key => selectedItems.includes(key));
    
    if (allSelected) {
      // Deseleccionar todos los elementos de la página actual
      const newSelectedItems = selectedItems.filter(key => !allKeys.includes(key));
      setSelectedItems(newSelectedItems);
    } else {
      // Seleccionar todos los elementos de la página actual manteniendo el estado anterior
      const uniqueNewSelectedItems = Array.from(new Set([...selectedItems, ...allKeys]));
      setSelectedItems(uniqueNewSelectedItems);
    }
  };
  

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCities([]);
    setSelectedYears([]);
  };

  const renderTableHeader = () => {
    const isSortingColumn = (column: keyof Data) => sortColumn === column;
    const isAscending = sortOrder === "asc";

    return (
      <tr>
        <th className='tablabusqueda-esquinaizquierda' onClick={handleSelectAll}>Seleccionar página</th>
        <th onClick={() => handleSort("condicion")}>
        condicion {isSortingColumn("condicion") && (isAscending ? "▲" : "▼")}
        </th>
        <th className='tablabusqueda-esquinaderecha' onClick={() => handleSort("id_juicio")}>
          id_juicio {isSortingColumn("id_juicio") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("materia")}>
        materia {isSortingColumn("materia") && (isAscending ? "▲" : "▼")}
        </th>
        <th onClick={() => handleSort("ciudad")}>
        ciudad {isSortingColumn("ciudad") && (isAscending ? "▲" : "▼")}
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
      return (
        (selectedCities.length === 0 && selectedYears.length === 0 || selectedCities.includes(item.ciudad.toLowerCase()))
        &&
        searchTerms.every(term =>
          [
            (item.ciudad || "Ciudad Desconocida").toLowerCase(),
            item.id_juicio.toLowerCase(),
            (item.materia || "Materia Desconocida").toLowerCase(),
            (item.condicion || "Condicion Desconocida").toLowerCase(),
          ].some(field => field.includes(term))
        )
      );
    });

    // Si no hay coincidencias exactas, realizar búsqueda por aproximación retrocediendo letra por letra
    if (filteredData.length === 0) {
      const newFilteredData = [];
      for (let i = searchTerm.length - 1; i >= 1; i--) {
        const truncatedSearchTerm = searchTerm.toLowerCase().substring(0, i);
        const approximateFilteredData = paginatedData.filter(item =>
          [
            (item.ciudad || "Ciudad Desconocida").toLowerCase(),
            item.id_juicio.toLowerCase(),
            (item.materia || "Materia Desconocida").toLowerCase(),
            (item.condicion || "Condicion Desconocida").toLowerCase(),
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
          <td>{item.condicion}</td>
          <td>{item.id_juicio}</td>
          <td>{item.materia}</td>
          <td>{item.ciudad}</td>
        </tr>
      );
    });
  };

  const handleCityToggle = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(prevSelectedCities =>
        prevSelectedCities.filter(c => c !== city)
      );
    } else {
      setSelectedCities(prevSelectedCities => [...prevSelectedCities, city]);
    }
  };




  const renderCityList = () => {


    const toggleRegionDropdown = (region: string) => {
      setOpenRegion(prevOpenRegion =>
        prevOpenRegion === region ? null : region
      );
    };

    const regionCityCounts: { [region: string]: number } = {};

    Object.keys(cityCounts).forEach(city => {
      const [region] = city.split(" - ");
      if (region) {
        regionCityCounts[region] = (regionCityCounts[region] || 0) + cityCounts[city];
      }
    });

    return (
      <div className="city-list">
        <h4 className="buscador-filtros-h4">Filtrar por ciudades</h4>
        <ul>
          {Object.entries(regionCityCounts).map(([region, count]) => (
            <li key={region}>

             
                <ul className="city-dropdown-content">
                  {Object.keys(cityCounts).map(city => {
                    const cityName = city;
                    if (city.startsWith(region)) {
                      return (
                        <li key={city}>
                          <label className="city-list-label">
                            <input
                              type="checkbox"
                              checked={selectedCities.includes(city)}
                              onChange={() => handleCityToggle(city)}
                              className="city-list-input"
                            />
                            {cityName.charAt(0).toUpperCase() + cityName.slice(1)}{" "}
                            <span className="count">({cityCounts[city]})</span>
                          </label>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              
            </li>
          ))}
        </ul>
      </div>
    );
    
  };


  const SelectAllRegisters = () => {
    // Obtener todas las claves de datos paginados y no solo de la página actual
    const allKeys = data
      ? Object.entries(data).flatMap(([propertyKey, items]) =>
          Object.keys(items).map(itemKey => itemKey)
        )
      : [];
  
    // Verificar si todos los elementos están seleccionados
    const allSelected = allKeys.every(key => selectedItems.includes(key));
  
    if (allSelected) {
      // Deseleccionar todos los elementos
      setSelectedItems([]);
    } else {
      // Seleccionar todos los elementos manteniendo el estado anterior
      const uniqueNewSelectedItems = Array.from(new Set([...selectedItems, ...allKeys]));
      setSelectedItems(uniqueNewSelectedItems);
    }
  };
  
  const selectAllButtonText = () => {
    const allKeys = data
      ? Object.entries(data).flatMap(([propertyKey, items]) =>
          Object.keys(items).map(itemKey => itemKey)
        )
      : [];

    // Verificar si todos los elementos están seleccionados
    const allSelected = allKeys.every(key => selectedItems.includes(key));

    return allSelected ? "Deseleccionar todo" : "Seleccionar todo";
  };


  return (
    <div >
      {data != null && Object.keys(data[Object.keys(data)[0]]).length === 0 && (
        <p>No se encontraron coincidencias</p>
      )}
      {data && Object.keys(data[Object.keys(data)[0]]).length > 0 && (
        <>
          <p>Selecciona los datos que quieres traer en detalle</p>

          <div className='container-tablabusqueda'>
            <div className='buscador-filtros'>
            <button className='busqueda-menu-button todo' onClick={SelectAllRegisters}>
                {selectAllButtonText()}
              </button>
              <h3 className='buscador-filtros-h3'>FILTROS</h3>
              <h4 className="buscador-filtros-h4">Filtrar por buscador</h4>
              <input
                className='search-filter-table'
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="ej: Robo"
              />
              {renderCityList()}
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

export default TablaBusqueda;