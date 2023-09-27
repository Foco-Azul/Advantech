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
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [cityCounts, setCityCounts] = useState<{ [city: string]: number }>({});
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [yearCounts, setYearCounts] = useState<{ [city: string]: number }>({});
  const [openRegion, setOpenRegion] = useState<string | null>(null);


  useEffect(() => {
    if (data) {
      const counts: { [city: string]: number } = {};
      const yearCounts: { [year: string]: number } = {};

      // Contar ocurrencias por ciudad y año
      Object.entries(data).forEach(([propertyKey, items]) =>
        Object.entries(items).forEach(([itemKey, item]) => {
          const city = item.lugar.toLowerCase();
          const year = item.fecha.split('-')[0];
          counts[city] = (counts[city] || 0) + 1;
          yearCounts[year] = (yearCounts[year] || 0) + 1;
        })
      );

      setCityCounts(counts);
      setYearCounts(yearCounts);


      // Filtrar datos por ciudades seleccionadas
      const filteredByCities = Object.entries(data).flatMap(([propertyKey, items]) =>
        Object.entries(items).map(([itemKey, item]) => ({ key: itemKey, ...item }))
      ).filter(item => (selectedCities.length === 0 && selectedYears.length === 0 || selectedCities.includes(item.lugar.toLowerCase())) ||
        (selectedYears.includes(item.fecha.split('-')[0])));


      // Función para realizar búsqueda por aproximación retrocediendo letra por letra
      const searchApproximately = (term: string, data: any[]) => {
        if (term.trim() === '') {
          return data; // Si el término de búsqueda está vacío, mostrar todos los datos
        }

        for (let i = term.length; i >= 1; i--) {
          const truncatedSearchTerm = term.toLowerCase().substring(0, i);
          const approximateFilteredData = data.filter(item =>
            [
              item.lugar.toLowerCase(),
              item.estado.toLowerCase(),
              item.delito.toLowerCase(),
              item.unidad.toLowerCase(),
              item.fecha.toLowerCase()
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
    console.log("data", data)
  }, [data, currentPage, sortColumn, sortOrder, searchTerm, selectedCities, selectedYears]);


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
      return (
        (selectedCities.length === 0 && selectedYears.length === 0 || selectedCities.includes(item.lugar.toLowerCase())) ||
        (selectedYears.includes(item.fecha.split('-')[0])) &&
        searchTerms.every(term =>
          [
            item.lugar.toLowerCase(),
            item.estado.toLowerCase(),
            item.delito.toLowerCase(),
            item.unidad.toLowerCase(),
            item.fecha.toLowerCase()
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

  const handleCityToggle = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(prevSelectedCities =>
        prevSelectedCities.filter(c => c !== city)
      );
    } else {
      setSelectedCities(prevSelectedCities => [...prevSelectedCities, city]);
    }
  };

  const generateYearList = () => {
    const yearsSet = new Set<string>();
    if (data) {
      Object.entries(data).forEach(([propertyKey, items]) =>
        Object.entries(items).forEach(([itemKey, item]) => {
          const year = item.fecha.split('-')[0];
          yearsSet.add(year);
        })
      );
    }
    return Array.from(yearsSet);
  };

  const handleYearToggle = (year: string) => {
    if (selectedYears.includes(year)) {
      setSelectedYears(prevSelectedYears =>
        prevSelectedYears.filter(y => y !== year)
      );
    } else {
      setSelectedYears(prevSelectedYears => [...prevSelectedYears, year]);
    }
  };

  const renderYearList = () => {
    return (
      <div >
        <h4 className='buscador-filtros-h4 '>Filtrar por años</h4>
        <ul className="year-list">
          {Object.entries(yearCounts).map(([year, count]) => (
            <li key={year} className="year">
              <label className="year-list-label">
                <input
                  type="checkbox"
                  checked={selectedYears.includes(year)}
                  onChange={() => handleYearToggle(year)}
                  className="year-list-input"
                />
                {year} <span className="count">({count})</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    );
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
              <button
                className={`region-toggle-button ${openRegion === region ? "open" : ""
                  }`}
                onClick={() => toggleRegionDropdown(region)}
              >
                {region.charAt(0).toUpperCase() + region.slice(1)} <span className="count">({count})</span>
              </button>
              {openRegion === region && (
                <ul className="city-dropdown-content">
                  {Object.keys(cityCounts).map(city => {
                    const [cityRegion, cityName] = city.split(" - ");
                    if (cityRegion === region) {
                      return (
                        <li key={city}>
                          <label className="city-list-label">
                            <input
                              type="checkbox"
                              checked={selectedCities.includes(city)}
                              onChange={() => handleCityToggle(city)}
                              className="city-list-input"
                            />
                            {cityName.charAt(0).toUpperCase() + cityName.slice(1)}  <span className="count">({cityCounts[city]}) </span>
                          </label>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div >
      {data != null && Object.keys(data[Object.keys(data)[0]]).length === 0 && (
        <p>No se encontraron coincidencias</p>
      )}
      {data && Object.keys(data[Object.keys(data)[0]]).length > 0 && (
        <>
          {/* <p>Selecciona los datos que quieres traer en detalle</p> */}
          <div className='container-tablabusqueda'>
            <div className='buscador-filtros'>
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
              {renderYearList()}
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