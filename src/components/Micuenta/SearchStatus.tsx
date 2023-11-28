import React, { useState, useEffect } from 'react';
import "./SearchStatus.css"

interface SearchStatusProps {
    queryId: string; // Cambia el tipo según el tipo real de queryId
    status: string; // Cambia el tipo según el tipo real de status
    translation: string; // Cambia el tipo según el tipo real de translation
    getColor: (status: string) => string; // Cambia el tipo según el tipo real de getColor
    isUnderline: (status: string) => boolean; // Cambia el tipo según el tipo real de isUnderline
    onStatusChange: (queryId: string, newStatus: string) => void; // Nueva propiedad de devolución de llamada
}

const SearchStatus: React.FC<SearchStatusProps> = ({ queryId, status, translation, getColor, isUnderline, onStatusChange  }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let currentStatus = 'IN PROGRESS';

            while (currentStatus === 'IN PROGRESS') {
                const response = await fetch('https://splunk.hctint.com:9876/data/status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query_id: queryId,
                        key: 'focoazul_TPKBAnVd3a6_KGnLvuzmfHFbEhh7GsdLyJGceXaoWFq2P'
                    }),
                });


                const statusData = await response.json();
                currentStatus = statusData.status;


                if (currentStatus === 'IN PROGRESS') {
                    setProgress((statusData.count / statusData.total) * 100);
                } else if (currentStatus === 'READY') {
                    console.log('La API está lista.');
                    onStatusChange(queryId, currentStatus);
                } else {
                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            }
        };

        if (status === 'IN PROGRESS') {
            fetchData();
        }
    }, [queryId, status]);

    return (
        <>
            <div style={{ color: getColor(status) }}>
                {translation}
                {status === 'IN PROGRESS' && (
                    <div className="progress-bar-container">
                        <p>{Math.round(progress)}%</p>
                        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchStatus;
