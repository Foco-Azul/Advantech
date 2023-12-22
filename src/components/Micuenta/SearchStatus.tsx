import React, { useState, useEffect } from 'react';
import "./SearchStatus.css"

interface SearchStatusProps {
    queryId: string; // Cambia el tipo según el tipo real de queryId
    status: string; // Cambia el tipo según el tipo real de status
    translation: string; // Cambia el tipo según el tipo real de translation
    getColor: (status: string) => string; // Cambia el tipo según el tipo real de getColor
    isUnderline: (status: string) => boolean; // Cambia el tipo según el tipo real de isUnderline
    onStatusChange: (queryId: string, newStatus: string) => void; // Nueva propiedad de devolución de llamada
    createdAt: string;
    selectedFuenteEspera: any;
}

const SearchStatus: React.FC<SearchStatusProps> = ({ queryId, status, translation, getColor, isUnderline, onStatusChange, createdAt, selectedFuenteEspera }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            let currentStatus = 'IN PROGRESS';
            // Obtén la fecha de inicio en segundos

            const fechaInicio = new Date(createdAt as string); // Asumiendo que createdAt es de tipo string
            const tiempoInicioEnSegundos = Math.floor(fechaInicio.getTime() / 1000);

            while (currentStatus === 'IN PROGRESS') {
                const response = await fetch(process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_URL + '/data/status', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        query_id: queryId,
                        key: process.env.NEXT_PUBLIC_ADVANTECH_PRIVATE_KEY
                    }),
                });

                console.log("selectedFuenteEspera", selectedFuenteEspera)

                const statusData = await response.json();
                currentStatus = statusData.status;

                if (currentStatus === 'IN PROGRESS') {

                    // Calcula el tiempo transcurrido en segundos
                    const tiempoActualEnSegundos = Math.floor(new Date().getTime() / 1000);
                    const tiempoTranscurrido = tiempoActualEnSegundos - tiempoInicioEnSegundos;

                    // Calcula y actualiza el progreso
                    if (statusData.total > 0 && Math.min((tiempoTranscurrido / (statusData.total * selectedFuenteEspera)) * 100, 100) > 0) {
                        setProgress(Math.min((tiempoTranscurrido / (statusData.total * selectedFuenteEspera)) * 100, 100));
                    }
                    await new Promise(resolve => setTimeout(resolve, 3000));
                } else if (currentStatus === 'READY') {
                    console.log('La API está lista.');
                    onStatusChange(queryId, currentStatus);
                    setProgress(100)
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
                {progress < 100 && translation}
                {status === 'IN PROGRESS' && progress == 100 && "Finalizando"}
                {status === 'READY' && progress == 100 && "Completada"}
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
