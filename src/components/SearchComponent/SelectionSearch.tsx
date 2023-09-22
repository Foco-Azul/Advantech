import React, { useState } from 'react';
import './SelectionSearch.css';
import Multisearch from './Multisearch';
import SearchComponent from './SearchComponent';

function SelectionSearch() {
    const [isSimpleSearch, setIsSimpleSearch] = useState(true);
    const [isBatchSearch, setIsBatchSearch] = useState(false);

    const handleSimpleSearchClick = () => {
        setIsSimpleSearch(true);
        setIsBatchSearch(false);
    };

    const handleBatchSearchClick = () => {
        setIsSimpleSearch(false);
        setIsBatchSearch(true);
    };

    return (
        <div className="switch-container">
            <div>
                <button
                    className={`search-button ${isSimpleSearch ? 'active' : ''}`}
                    onClick={handleSimpleSearchClick}
                >
                    Búsqueda Simple
                </button>
                <button
                    className={`search-button ${isBatchSearch ? 'active' : ''}`}
                    onClick={handleBatchSearchClick}
                >
                    Búsqueda por Lote
                </button>
            </div>
            <div className="content">
                <br />
                {isSimpleSearch ? <SearchComponent /> : null}
                {isBatchSearch ? <Multisearch /> : null}
            </div>
            <br></br>
        </div>
    );
}

export default SelectionSearch;
